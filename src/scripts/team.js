import data from '../content/team.json';

// Builds the team section from src/content/team.json.
// Empty fields are simply left out, so nothing shows as "TBC" or links nowhere.

const safeUrl = (u) => (/^https:\/\/[^\s"'<>]+$/i.test(u || '') ? u : '');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

function person(m, i) {
  const photo = m.photo && /^[\w.-]+$/.test(m.photo)
    ? `<img src="/team/${esc(m.photo)}" alt="" width="136" height="136" loading="lazy" />`
    : `<span aria-hidden="true">${esc(initials(m.name))}</span>`;
  const meta = [m.course, m.year].filter(Boolean).map(esc).join(', ');
  const links = [
    safeUrl(m.linkedin) && `<a href="${esc(m.linkedin)}" rel="noopener noreferrer" aria-label="${esc(m.name)} on LinkedIn">LinkedIn</a>`,
    safeUrl(m.indeed) && `<a href="${esc(m.indeed)}" rel="noopener noreferrer" aria-label="${esc(m.name)} on Indeed">Indeed</a>`,
  ].filter(Boolean).join('');
  return `<li class="person" data-i="${i}">
    <span class="person__avatar" data-subteam="${esc(m.subteam)}">${photo}</span>
    <span class="person__name">${esc(m.name)}</span>
    ${meta ? `<span class="person__meta">${meta}</span>` : ''}
    ${links ? `<span class="person__links">${links}</span>` : ''}
  </li>`;
}

export function initTeam() {
  const root = document.querySelector('[data-team]');
  const filter = document.querySelector('[data-team-filter]');
  if (!root || !filter) return;

  const status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  filter.after(status);
  root.removeAttribute('aria-live');

  const options = ['Everyone', ...data.subteams];
  filter.innerHTML = options
    .map((o, i) => `<button type="button" data-filter="${esc(o)}" aria-pressed="${i === 0}">${esc(o)}</button>`)
    .join('');

  const render = (which) => {
    const groups = which === 'Everyone' ? data.subteams : [which];
    root.innerHTML = groups.map((g) => {
      const people = data.members.filter((m) => m.subteam === g);
      return `<div class="team-group">
        <h3>${esc(g)}</h3>
        <ul class="team-grid" role="list">${people.map((m, i) => person(m, i)).join('')}</ul>
      </div>`;
    }).join('');
    root.querySelectorAll('.person').forEach((el) => el.style.setProperty('--i', el.dataset.i));
    const n = data.members.filter((m) => groups.includes(m.subteam)).length;
    return `Showing ${n} people${which === 'Everyone' ? '' : ' in ' + which}`;
  };

  filter.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    filter.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    status.textContent = render(btn.dataset.filter);
  });

  render('Everyone');
}
