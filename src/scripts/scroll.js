import { reducedMotion } from './motion.js';

// Gives each [data-scroll] element a --p value between 0 and 1 showing how far
// it has travelled through the screen, which the CSS uses for scroll-linked motion.
// data-scroll="exit" measures only how far it has scrolled off the top.
export function initScroll() {
  const els = [...document.querySelectorAll('[data-scroll]')];
  if (!els.length) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    if (reducedMotion()) return;
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const p = el.dataset.scroll === 'exit'
        ? -r.top / Math.max(r.bottom - r.top + vh * 0.4, 1)
        : (vh - r.top) / (vh + r.height);
      el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // Goal markers fill in as each goal passes the middle of the screen.
  const goals = document.querySelectorAll('[data-goals] li');
  if (goals.length) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) e.target.classList.add('is-on');
    }), { rootMargin: '0px 0px -45% 0px' });
    goals.forEach((g) => io.observe(g));
  }
}
