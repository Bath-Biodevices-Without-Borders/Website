// Team dashboard: signs in to Supabase, reads rig data and draws charts.
// READ-ONLY: this page must never insert, update or delete rows.
import '@fontsource-variable/archivo/wdth.css';
import './styles/base.css';
import './styles/legal.css';
import './styles/dashboard.css';

import { createClient } from '@supabase/supabase-js';
import Chart from 'chart.js/auto';
import { initNav } from './scripts/nav.js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './scripts/supabase-config.js';

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
initNav();

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const statusEl = $('[data-status]');
const setStatus = (msg = '', isError = false) => {
  statusEl.textContent = msg;
  statusEl.classList.toggle('is-error', isError);
};
const fail = (context, error) => {
  console.error(context, error);
  setStatus(`${context}: ${error.message || error}`, true);
};

const fmtTime = (iso, withDate = true) =>
  new Date(iso).toLocaleString('en-GB', {
    ...(withDate ? { day: 'numeric', month: 'short' } : {}),
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
const fmtNum = (n, digits = 3) => (n == null ? '–' : Number(n).toPrecision(digits).replace(/\.?0+(e|$)/, '$1'));

function fillSelect(select, items, { keep = true, placeholder } = {}) {
  const previous = select.value;
  select.replaceChildren();
  if (placeholder && !items.length) {
    select.append(new Option(placeholder, ''));
    select.disabled = true;
    return;
  }
  select.disabled = false;
  items.forEach(({ value, label }) => select.append(new Option(label, String(value))));
  if (keep && items.some((i) => String(i.value) === previous)) select.value = previous;
}
const unique = (arr) => [...new Set(arr.filter((v) => v != null && v !== ''))].sort();

// ---------- Chart styling (site tokens) ----------
const css = getComputedStyle(document.documentElement);
const token = (name) => css.getPropertyValue(name).trim();
const SERIES = token('--silt') || '#1f51ff';
const INK_SOFT = token('--ink-soft') || '#3a5565';
const GRID = 'rgb(11 34 51 / 0.08)';
Chart.defaults.font.family = token('--font');
Chart.defaults.color = INK_SOFT;
Chart.defaults.borderColor = GRID;
Chart.defaults.plugins.legend.display = false; // every chart is one series; the heading names it
Chart.defaults.animation = matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 300 };

const charts = {};
function drawChart(key, canvas, config) {
  charts[key]?.destroy();
  charts[key] = new Chart(canvas, config);
}
function destroyCharts() {
  Object.keys(charts).forEach((k) => { charts[k].destroy(); delete charts[k]; });
}
const axisTitle = (text) => ({ display: true, text, color: INK_SOFT });

// ---------- State ----------
let samples = [];             // newest first
let channel = null;
let started = false;

// =====================================================================
// 1. Voltammetry curve
// =====================================================================
const curveSample = $('[data-curve-sample]');
const curveMeasurement = $('[data-curve-measurement]');
const curveMeta = $('[data-curve-meta]');
const follow = $('[data-follow]');

const sampleLabel = (s) =>
  `#${s.id} · ${s.run_label || 'no label'} · pot ${s.pot ?? '?'} · ${fmtTime(s.created_at)}`;

async function loadSamples() {
  const { data, error } = await db
    .from('samples')
    .select('id, created_at, pot, run_label, rig_pressure_bar, rig_temperature_c, rig_flow_lpm')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) return fail('Could not load samples', error);
  samples = data;
  fillSelect(curveSample, samples.map((s) => ({ value: s.id, label: sampleLabel(s) })), { placeholder: 'No samples yet' });
  fillSelect(potsRun, unique(samples.map((s) => s.run_label)).map((r) => ({ value: r, label: r })), { placeholder: 'No runs yet' });
}

async function loadMeasurementList(sampleId, selectId) {
  if (!sampleId) {
    fillSelect(curveMeasurement, [], { placeholder: 'No measurements' });
    return;
  }
  const { data, error } = await db
    .from('measurements')
    .select('id, created_at, electrode, analyte, technique')
    .eq('sample_id', sampleId)
    .order('created_at', { ascending: false });
  if (error) return fail('Could not load measurements', error);
  fillSelect(
    curveMeasurement,
    data.map((m) => ({ value: m.id, label: `Electrode ${m.electrode} · ${m.analyte} · ${m.technique} · ${fmtTime(m.created_at, false)}` })),
    { placeholder: 'No measurements for this sample' }
  );
  if (selectId) curveMeasurement.value = String(selectId);
}

async function loadCurve(measurementId) {
  if (!measurementId) {
    charts.curve?.destroy(); delete charts.curve;
    curveMeta.textContent = 'No measurements yet.';
    return;
  }
  const { data, error } = await db
    .from('measurements')
    .select('id, created_at, sample_id, electrode, analyte, technique, result, unit, temperature_c, curve')
    .eq('id', measurementId)
    .single();
  if (error) return fail('Could not load curve', error);
  const m = data;
  const v = m.curve?.v ?? [];
  const i = m.curve?.i ?? [];
  curveMeta.textContent =
    `${m.analyte} · ${m.technique} · electrode ${m.electrode} · result ${fmtNum(m.result)} ${m.unit ?? ''} · ` +
    `${fmtNum(m.temperature_c)} °C · ${fmtTime(m.created_at)}` + (v.length ? '' : ' · no curve data');
  drawChart('curve', $('[data-curve-chart]'), {
    type: 'line',
    data: {
      datasets: [{
        label: 'Current (A)',
        data: v.map((x, k) => ({ x, y: i[k] })),
        borderColor: SERIES, backgroundColor: SERIES, borderWidth: 2,
        pointRadius: 0, pointHoverRadius: 5, tension: 0,
      }],
    },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        tooltip: { callbacks: { label: (c) => `${fmtNum(c.parsed.y)} A at ${fmtNum(c.parsed.x)} V` } },
      },
      scales: {
        x: { type: 'linear', title: axisTitle('Potential (V)'), grid: { display: false } },
        y: { title: axisTitle('Current (A)'), ticks: { callback: (val) => fmtNum(val, 2) } },
      },
    },
  });
}

// Show a particular measurement (or the newest one if no id is given).
async function showMeasurement(measurementId) {
  let m;
  const query = db.from('measurements').select('id, sample_id');
  const { data, error } = measurementId
    ? await query.eq('id', measurementId).limit(1)
    : await query.order('created_at', { ascending: false }).limit(1);
  if (error) return fail('Could not load measurements', error);
  [m] = data;
  if (!m) { await loadCurve(null); return; }
  if (m.sample_id && ![...curveSample.options].some((o) => o.value === String(m.sample_id))) await loadSamples();
  curveSample.value = String(m.sample_id ?? '');
  await loadMeasurementList(m.sample_id, m.id);
  await loadCurve(m.id);
}

curveSample.addEventListener('change', async () => {
  await loadMeasurementList(curveSample.value);
  await loadCurve(curveMeasurement.value);
});
curveMeasurement.addEventListener('change', () => loadCurve(curveMeasurement.value));

// =====================================================================
// 2. Results across pots 1-4
// =====================================================================
const potsRun = $('[data-pots-run]');
const potsAnalyte = $('[data-pots-analyte]');
const potsTechnique = $('[data-pots-technique]');
const potsTableBody = $('[data-pots-table] tbody');
let potsRows = [];

async function loadPotsData() {
  const run = potsRun.value;
  if (!run) { potsRows = []; renderPots(); return; }
  const { data, error } = await db
    .from('measurements')
    .select('result, unit, analyte, technique, samples!inner(pot, run_label)')
    .eq('samples.run_label', run)
    .not('result', 'is', null)
    .limit(5000);
  if (error) return fail('Could not load pot results', error);
  potsRows = data;
  fillSelect(potsAnalyte, unique(data.map((r) => r.analyte)).map((a) => ({ value: a, label: a })), { placeholder: 'No results' });
  fillSelect(potsTechnique, unique(data.map((r) => r.technique)).map((t) => ({ value: t, label: t })), { placeholder: 'No results' });
  renderPots();
}

function renderPots() {
  const rows = potsRows.filter((r) => r.analyte === potsAnalyte.value && r.technique === potsTechnique.value);
  const unit = unique(rows.map((r) => r.unit)).join(' / ');
  const pots = [1, 2, 3, 4].map((pot) => {
    const vals = rows.filter((r) => r.samples?.pot === pot).map((r) => Number(r.result));
    return { pot, n: vals.length, mean: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null };
  });

  potsTableBody.replaceChildren(...pots.map(({ pot, n, mean }) => {
    const tr = document.createElement('tr');
    [`Pot ${pot}`, mean == null ? '–' : `${fmtNum(mean)} ${unit}`, String(n)].forEach((text) => {
      const td = document.createElement('td'); td.textContent = text; tr.append(td);
    });
    return tr;
  }));

  drawChart('pots', $('[data-pots-chart]'), {
    type: 'bar',
    data: {
      labels: pots.map((p) => `Pot ${p.pot}`),
      datasets: [{
        label: `${potsAnalyte.value} (${unit})`,
        data: pots.map((p) => p.mean),
        backgroundColor: SERIES,
        borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom',
        maxBarThickness: 64,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: { label: (c) => `${fmtNum(c.parsed.y)} ${unit} (mean of ${pots[c.dataIndex].n})` },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, title: axisTitle(unit ? `Result (${unit})` : 'Result') },
      },
    },
  });
}

potsRun.addEventListener('change', loadPotsData);
potsAnalyte.addEventListener('change', renderPots);
potsTechnique.addEventListener('change', renderPots);

// =====================================================================
// 3. Sensor trends
// =====================================================================
const sensorSelect = $('[data-sensor]');
const sensorRange = $('[data-sensor-range]');
const sensorMeta = $('[data-sensor-meta]');
let sensorPoints = [];
let sensorUnit = '';

async function loadSensorList() {
  // No DISTINCT in the REST API: read recent rows and de-duplicate here.
  const { data, error } = await db
    .from('sensor_readings')
    .select('sensor')
    .order('created_at', { ascending: false })
    .limit(2000);
  if (error) return fail('Could not load sensors', error);
  fillSelect(sensorSelect, unique(data.map((r) => r.sensor)).map((s) => ({ value: s, label: s })), { placeholder: 'No sensor readings yet' });
}

async function loadSensorData() {
  const sensor = sensorSelect.value;
  if (!sensor) { sensorPoints = []; sensorMeta.textContent = ''; renderSensor(); return; }
  let q = db.from('sensor_readings').select('created_at, value, unit').eq('sensor', sensor);
  const hours = Number(sensorRange.value);
  if (hours) q = q.gte('created_at', new Date(Date.now() - hours * 3600e3).toISOString());
  // Newest 5000 rows, flipped to time order for the chart.
  const { data, error } = await q.order('created_at', { ascending: false }).limit(5000);
  if (error) return fail('Could not load sensor readings', error);
  data.reverse();
  sensorUnit = unique(data.map((r) => r.unit)).join(' / ');
  sensorPoints = data.map((r) => ({ x: Date.parse(r.created_at), y: Number(r.value) }));
  renderSensor();
}

function renderSensor() {
  const last = sensorPoints.at(-1);
  sensorMeta.textContent = last
    ? `Latest: ${fmtNum(last.y)} ${sensorUnit} at ${fmtTime(new Date(last.x).toISOString())} · ${sensorPoints.length} readings`
    : (sensorSelect.value ? 'No readings in this period.' : '');
  drawChart('sensor', $('[data-sensor-chart]'), {
    type: 'line',
    data: {
      datasets: [{
        label: sensorSelect.value,
        data: sensorPoints,
        borderColor: SERIES, backgroundColor: SERIES, borderWidth: 2,
        pointRadius: sensorPoints.length > 60 ? 0 : 3, pointHoverRadius: 5,
      }],
    },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            title: (items) => fmtTime(new Date(items[0].parsed.x).toISOString()),
            label: (c) => `${fmtNum(c.parsed.y)} ${sensorUnit}`,
          },
        },
      },
      scales: {
        x: {
          type: 'linear', grid: { display: false },
          ticks: { maxTicksLimit: 6, callback: (v) => fmtTime(new Date(v).toISOString(), Number(sensorRange.value) !== 1) },
        },
        y: { title: axisTitle(sensorUnit ? `${sensorSelect.value} (${sensorUnit})` : sensorSelect.value) },
      },
    },
  });
}

sensorSelect.addEventListener('change', loadSensorData);
sensorRange.addEventListener('change', loadSensorData);

// =====================================================================
// Live updates (Supabase Realtime). Needs the tables in the
// supabase_realtime publication on the database side.
// =====================================================================
const liveEl = $('[data-live]');
function setLive(on) {
  liveEl.dataset.state = on ? 'on' : 'off';
  liveEl.textContent = on ? 'Live' : 'Not live';
}

function subscribeLive() {
  channel = db
    .channel('dashboard-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'samples' }, async () => {
      await loadSamples();
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'measurements' }, async ({ new: m }) => {
      if (follow.checked) await showMeasurement(m.id);
      else if (String(m.sample_id) === curveSample.value) await loadMeasurementList(m.sample_id, curveMeasurement.value);
      await loadPotsData();
      setStatus(`New measurement: ${m.analyte} ${m.technique}, electrode ${m.electrode}.`);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_readings' }, async ({ new: r }) => {
      if (![...sensorSelect.options].some((o) => o.value === r.sensor)) {
        await loadSensorList();
        if (sensorSelect.value === r.sensor) await loadSensorData();
        return;
      }
      if (r.sensor !== sensorSelect.value) return;
      sensorPoints.push({ x: Date.parse(r.created_at), y: Number(r.value) });
      renderSensor();
    })
    .subscribe((status) => setLive(status === 'SUBSCRIBED'));
}

// =====================================================================
// Sign-in / sign-out
// =====================================================================
const showSignedIn = (on) => {
  document.querySelectorAll('[data-signed-in]').forEach((el) => (el.hidden = !on));
  document.querySelectorAll('[data-signed-out]').forEach((el) => (el.hidden = on));
};

async function start(session) {
  if (started) return;
  started = true;
  $('[data-user]').textContent = session.user.email;
  showSignedIn(true);
  setStatus('Loading…');
  await loadSamples();
  await Promise.all([showMeasurement(), loadPotsData(), loadSensorList().then(loadSensorData)]);
  if (!statusEl.classList.contains('is-error')) setStatus('');
  subscribeLive();
}

function stop() {
  started = false;
  if (channel) { db.removeChannel(channel); channel = null; }
  setLive(false);
  destroyCharts();
  samples = []; potsRows = []; sensorPoints = [];
  [curveSample, curveMeasurement, potsRun, potsAnalyte, potsTechnique, sensorSelect].forEach((s) => s.replaceChildren());
  [curveMeta, sensorMeta, $('[data-user]')].forEach((el) => (el.textContent = ''));
  potsTableBody.replaceChildren();
  showSignedIn(false);
}

$('[data-login]').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  button.disabled = true;
  setStatus('Signing in…');
  const { error } = await db.auth.signInWithPassword({ email: form.email.value.trim(), password: form.password.value });
  button.disabled = false;
  if (error) return setStatus(error.message, true);
  form.reset();
  setStatus('');
});

$('[data-signout]').addEventListener('click', async () => {
  const { error } = await db.auth.signOut();
  if (error) fail('Sign-out failed', error);
});

// Fires on page load (INITIAL_SESSION) and on every sign-in / sign-out.
// Supabase advises not awaiting its calls inside this callback, hence setTimeout.
db.auth.onAuthStateChange((_event, session) => {
  setTimeout(() => (session ? start(session) : stop()), 0);
});
