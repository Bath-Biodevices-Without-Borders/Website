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
  setStatus(`${context}: ${error?.message || error}`, true);
};
// Show any unexpected error on the page rather than failing silently.
window.addEventListener('error', (e) => fail('Page error', e.error || e.message));
window.addEventListener('unhandledrejection', (e) => fail('Page error', e.reason));

// Timestamps arrive as ISO from the REST API ("2026-11-21T14:04:02.123+00:00") but can
// arrive Postgres-style from Realtime ("2026-11-21 14:04:02.123456+00"), which browsers
// don't all parse. Normalise to milliseconds; NaN if it really can't be read.
function toMs(t) {
  if (t == null || t === '') return NaN;
  if (typeof t === 'number') return t;
  if (t instanceof Date) return t.getTime();
  const m = String(t).trim().match(
    /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}(?::\d{2})?)(?:\.(\d+))?\s*(Z|[+-]\d{2}(?::?\d{2})?)?$/i
  );
  if (!m) return Date.parse(t);
  const [, date, time, frac = '', zone = 'Z'] = m;
  let tz = zone.toUpperCase();
  if (tz !== 'Z') tz = tz.length === 3 ? `${tz}:00` : tz.replace(/^([+-]\d{2}):?(\d{2})$/, '$1:$2');
  const ms = frac ? `.${(frac + '000').slice(0, 3)}` : '';
  return Date.parse(`${date}T${time.length === 5 ? `${time}:00` : time}${ms}${tz}`);
}
const toNum = (v) => (v == null || v === '' ? NaN : Number(v));

function fmtTime(t, withDate = true) {
  const ms = toMs(t);
  if (!Number.isFinite(ms)) return '–';
  return new Date(ms).toLocaleString('en-GB', {
    ...(withDate ? { day: 'numeric', month: 'short' } : {}),
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}
// 3 significant figures; scientific notation for very small/large values (e.g. currents in A).
function fmtNum(v, digits = 3) {
  const x = toNum(v);
  if (!Number.isFinite(x)) return '–';
  const a = Math.abs(x);
  if (a !== 0 && (a < 1e-3 || a >= 1e6)) return x.toExponential(digits - 1).replace(/\.?0+e/, 'e');
  return String(Number(x.toPrecision(digits)));
}

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
const hasOption = (select, value) => [...select.options].some((o) => o.value === String(value));

// Live events can arrive faster than we can query. Run refreshes one at a time,
// and collapse repeated requests for the same refresh into one.
let queue = Promise.resolve();
const pending = new Set();
function enqueue(key, fn) {
  if (pending.has(key)) return;
  pending.add(key);
  queue = queue
    .then(() => { pending.delete(key); return fn(); })
    .catch((e) => fail('Live update failed', e));
}

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
// No animation: charts update many times a second during a test, and re-animating
// each time leaves them looking blank.
Chart.defaults.animation = false;

// Each chart is created once and then updated in place.
const charts = {};
function upsertChart(key, canvas, makeConfig, apply) {
  if (!charts[key]) charts[key] = new Chart(canvas, makeConfig());
  apply(charts[key]);
  charts[key].update('none');
}
function clearChart(key) { charts[key]?.destroy(); delete charts[key]; }
function destroyCharts() { Object.keys(charts).forEach(clearChart); }
const axisTitle = (text) => ({ display: true, text, color: INK_SOFT });
const lineDataset = () => ({
  data: [], borderColor: SERIES, backgroundColor: SERIES, borderWidth: 2,
  pointRadius: 0, pointHoverRadius: 5, tension: 0, spanGaps: true,
});

// ---------- State ----------
let samples = [];             // newest first
let channel = null;
let started = false;
const NO_LABEL = '__none__';  // select value for samples with no run_label

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
    .select('id, created_at, pot, run_label')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) return fail('Could not load samples', error);
  samples = data;
  fillSelect(curveSample, samples.map((s) => ({ value: s.id, label: sampleLabel(s) })), { placeholder: 'No samples yet' });
  const runs = unique(samples.map((s) => s.run_label)).map((r) => ({ value: r, label: r }));
  if (samples.some((s) => !s.run_label)) runs.push({ value: NO_LABEL, label: '(no run label)' });
  fillSelect(potsRun, runs, { placeholder: 'No runs yet' });
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
    data.map((m) => ({ value: m.id, label: `Electrode ${m.electrode ?? '?'} · ${m.analyte ?? '?'} · ${m.technique ?? '?'} · ${fmtTime(m.created_at, false)}` })),
    { placeholder: 'No measurements for this sample' }
  );
  if (selectId && hasOption(curveMeasurement, selectId)) curveMeasurement.value = String(selectId);
}

// The curve should be {"v":[...], "i":[...]}. Also cope with it being stored as a
// JSON string, or as a list of [v, i] pairs / {v, i} points.
function curvePoints(curve) {
  let c = curve;
  if (typeof c === 'string') { try { c = JSON.parse(c); } catch { return []; } }
  if (!c) return [];
  let pts = [];
  if (Array.isArray(c)) {
    pts = c.map((p) => (Array.isArray(p) ? { x: toNum(p[0]), y: toNum(p[1]) } : { x: toNum(p?.v), y: toNum(p?.i) }));
  } else {
    const v = c.v ?? c.V ?? [];
    const i = c.i ?? c.I ?? [];
    pts = (Array.isArray(v) ? v : []).map((x, k) => ({ x: toNum(x), y: toNum(i[k]) }));
  }
  return pts.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

let shownMeasurementId = null;
async function loadCurve(measurementId) {
  shownMeasurementId = measurementId ? String(measurementId) : null;
  if (!measurementId) {
    clearChart('curve');
    curveMeta.textContent = 'No measurements yet.';
    return;
  }
  const { data, error } = await db
    .from('measurements')
    .select('id, created_at, sample_id, electrode, analyte, technique, result, unit, temperature_c, curve')
    .eq('id', measurementId)
    .single();
  if (error) return fail('Could not load curve', error);
  if (String(data.id) !== shownMeasurementId) return; // a newer request has taken over
  const m = data;
  const pts = curvePoints(m.curve);
  curveMeta.textContent =
    `${m.analyte ?? '?'} · ${m.technique ?? '?'} · electrode ${m.electrode ?? '?'} · result ${fmtNum(m.result)} ${m.unit ?? ''} · ` +
    `${fmtNum(m.temperature_c)} °C · ${fmtTime(m.created_at)}` +
    (pts.length ? ` · ${pts.length} points` : ' · no curve data yet');
  upsertChart('curve', $('[data-curve-chart]'), () => ({
    type: 'line',
    data: { datasets: [{ ...lineDataset(), label: 'Current (A)' }] },
    options: {
      maintainAspectRatio: false,
      parsing: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: { tooltip: { callbacks: { label: (c) => `${fmtNum(c.parsed.y)} A at ${fmtNum(c.parsed.x)} V` } } },
      scales: {
        x: { type: 'linear', title: axisTitle('Potential (V)'), grid: { display: false }, ticks: { callback: (v) => fmtNum(v) } },
        y: { type: 'linear', title: axisTitle('Current (A)'), ticks: { callback: (v) => fmtNum(v, 2) } },
      },
    },
  }), (chart) => { chart.data.datasets[0].data = pts; });
}

// Show a particular measurement (or the newest one if no id is given).
async function showMeasurement(measurementId) {
  const query = db.from('measurements').select('id, sample_id');
  const { data, error } = measurementId
    ? await query.eq('id', measurementId).limit(1)
    : await query.order('created_at', { ascending: false }).limit(1);
  if (error) return fail('Could not load measurements', error);
  const [m] = data;
  if (!m) { await loadCurve(null); return; }
  if (m.sample_id != null && !hasOption(curveSample, m.sample_id)) await loadSamples();
  if (m.sample_id != null) curveSample.value = String(m.sample_id);
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
  let q = db
    .from('measurements')
    .select('result, unit, analyte, technique, samples!inner(pot, run_label)')
    .not('result', 'is', null)
    .limit(5000);
  q = run === NO_LABEL ? q.is('samples.run_label', null) : q.eq('samples.run_label', run);
  const { data, error } = await q;
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
    const vals = rows.filter((r) => Number(r.samples?.pot) === pot).map((r) => toNum(r.result)).filter(Number.isFinite);
    return { pot, n: vals.length, mean: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null };
  });

  potsTableBody.replaceChildren(...pots.map(({ pot, n, mean }) => {
    const tr = document.createElement('tr');
    [`Pot ${pot}`, mean == null ? '–' : `${fmtNum(mean)} ${unit}`, String(n)].forEach((text) => {
      const td = document.createElement('td'); td.textContent = text; tr.append(td);
    });
    return tr;
  }));

  upsertChart('pots', $('[data-pots-chart]'), () => ({
    type: 'bar',
    data: {
      labels: ['Pot 1', 'Pot 2', 'Pot 3', 'Pot 4'],
      datasets: [{
        data: [], backgroundColor: SERIES,
        borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom', maxBarThickness: 64,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: { callbacks: { label: (c) => `${fmtNum(c.parsed.y)} ${charts.pots.$unit} (mean of ${charts.pots.$n[c.dataIndex]})` } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, title: axisTitle('Result'), ticks: { callback: (v) => fmtNum(v) } },
      },
    },
  }), (chart) => {
    chart.data.datasets[0].data = pots.map((p) => p.mean);
    chart.data.datasets[0].label = potsAnalyte.value;
    chart.options.scales.y.title.text = unit ? `Result (${unit})` : 'Result';
    chart.$unit = unit;
    chart.$n = pots.map((p) => p.n);
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
const MAX_SENSOR_POINTS = 5000;
let sensorPoints = [];   // [{x: ms, y: value}], oldest first
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
  if (!sensor) { sensorPoints = []; renderSensor(); return; }
  let q = db.from('sensor_readings').select('created_at, value, unit').eq('sensor', sensor);
  const hours = Number(sensorRange.value);
  if (hours) q = q.gte('created_at', new Date(Date.now() - hours * 3600e3).toISOString());
  // Newest rows, flipped to time order for the chart.
  const { data, error } = await q.order('created_at', { ascending: false }).limit(MAX_SENSOR_POINTS);
  if (error) return fail('Could not load sensor readings', error);
  if (sensor !== sensorSelect.value) return; // selection changed while loading
  data.reverse();
  sensorUnit = unique(data.map((r) => r.unit)).join(' / ');
  sensorPoints = data.map((r) => ({ x: toMs(r.created_at), y: toNum(r.value) }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  renderSensor();
}

function addSensorPoint(row) {
  const p = { x: toMs(row.created_at), y: toNum(row.value) };
  if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
    console.warn('Skipped sensor reading that could not be read', row);
    return;
  }
  if (!sensorUnit && row.unit) sensorUnit = row.unit;
  // Keep time order even if rows arrive slightly out of order.
  let k = sensorPoints.length;
  while (k > 0 && sensorPoints[k - 1].x > p.x) k--;
  sensorPoints.splice(k, 0, p);
  // Slide the window for the chosen period, and cap the number of points.
  const hours = Number(sensorRange.value);
  if (hours) {
    const cutoff = sensorPoints.at(-1).x - hours * 3600e3;
    while (sensorPoints.length && sensorPoints[0].x < cutoff) sensorPoints.shift();
  }
  if (sensorPoints.length > MAX_SENSOR_POINTS) sensorPoints.splice(0, sensorPoints.length - MAX_SENSOR_POINTS);
  renderSensor();
}

function renderSensor() {
  const last = sensorPoints.at(-1);
  sensorMeta.textContent = last
    ? `Latest: ${fmtNum(last.y)} ${sensorUnit} at ${fmtTime(last.x)} · ${sensorPoints.length} readings`
    : (sensorSelect.value ? 'No readings in this period yet.' : '');
  const showDate = Number(sensorRange.value) !== 1;
  upsertChart('sensor', $('[data-sensor-chart]'), () => ({
    type: 'line',
    data: { datasets: [{ ...lineDataset() }] },
    options: {
      maintainAspectRatio: false,
      parsing: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            title: (items) => fmtTime(items[0].parsed.x),
            label: (c) => `${fmtNum(c.parsed.y)} ${sensorUnit}`,
          },
        },
      },
      scales: {
        x: { type: 'linear', grid: { display: false }, ticks: { maxTicksLimit: 6, callback: (v) => fmtTime(v, charts.sensor?.$showDate ?? true) } },
        y: { type: 'linear', title: axisTitle(''), ticks: { callback: (v) => fmtNum(v) } },
      },
    },
  }), (chart) => {
    const ds = chart.data.datasets[0];
    ds.data = sensorPoints;
    ds.label = sensorSelect.value;
    ds.pointRadius = sensorPoints.length > 60 ? 0 : 3;
    chart.$showDate = showDate;
    chart.options.scales.y.title.text = sensorUnit ? `${sensorSelect.value} (${sensorUnit})` : sensorSelect.value;
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
// Log the first live row from each table, to help check its format.
const logged = new Set();
const logFirst = (table, row) => {
  if (logged.has(table)) return;
  logged.add(table);
  console.info(`First live row from ${table}:`, row);
};

function onMeasurement({ eventType, new: m }) {
  logFirst('measurements', m);
  if (eventType === 'INSERT') {
    setStatus(`New measurement: ${m.analyte ?? '?'} ${m.technique ?? ''}, electrode ${m.electrode ?? '?'}.`);
    if (follow.checked) enqueue('show', () => showMeasurement(m.id));
    else if (String(m.sample_id) === curveSample.value) {
      enqueue('list', () => loadMeasurementList(m.sample_id, curveMeasurement.value));
    }
  } else if (eventType === 'UPDATE' && String(m.id) === shownMeasurementId) {
    // e.g. the rig adds the curve or result after creating the row
    enqueue('curve', () => loadCurve(m.id));
  }
  enqueue('pots', loadPotsData);
}

function onSensorReading({ new: r }) {
  logFirst('sensor_readings', r);
  if (!hasOption(sensorSelect, r.sensor)) {
    // First reading from a new sensor: refresh the list (and the chart if it was empty).
    enqueue('sensors', async () => {
      const before = sensorSelect.value;
      await loadSensorList();
      if (sensorSelect.value !== before) await loadSensorData();
    });
    return;
  }
  if (r.sensor === sensorSelect.value) addSensorPoint(r);
}

function subscribeLive() {
  channel = db
    .channel('dashboard-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'samples' }, ({ new: s }) => {
      logFirst('samples', s);
      enqueue('samples', loadSamples);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'measurements' }, onMeasurement)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'measurements' }, onMeasurement)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_readings' }, onSensorReading)
    .subscribe((status, err) => {
      setLive(status === 'SUBSCRIBED');
      if (err) fail('Live updates', err);
    });
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
  showSignedIn(true); // show the cards before drawing, so charts get their real size
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
  samples = []; potsRows = []; sensorPoints = []; sensorUnit = ''; shownMeasurementId = null;
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
