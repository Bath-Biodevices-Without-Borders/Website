import '@fontsource-variable/archivo/wdth.css';
import './styles/base.css';
import './styles/home.css';
import './styles/legal.css';

import { initNav } from './scripts/nav.js';
import { initParticles } from './scripts/particles.js';
import { initCounters } from './scripts/counters.js';
import { initRig } from './scripts/rig.js';
import { initTimeline } from './scripts/timeline.js';
import { initTeam } from './scripts/team.js';
import { initScroll } from './scripts/scroll.js';

// Links from the old site used "#/about"-style addresses. Send them somewhere sensible.
const oldRoutes = { '#/about': '#team', '#/work': '#rig', '#/contact': '#team', '#/join-us': '#team' };
if (location.hash.startsWith('#/')) {
  const target = oldRoutes[location.hash] || '';
  history.replaceState(null, '', location.pathname + target);
  if (target) requestAnimationFrame(() => document.querySelector(target)?.scrollIntoView());
}

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

initNav();
initParticles();
initCounters();
initRig();
initTimeline();
initTeam();
initScroll();
