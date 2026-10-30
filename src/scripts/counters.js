import { reducedMotion } from './motion.js';

// Numbers in the water section count up when they scroll into view.
// The real value is already in the HTML, so screen readers and no-JS visitors get it directly.
export function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || reducedMotion()) return;

  const format = (el, v) => {
    const decimals = Number(el.dataset.decimals || 0);
    return el.hasAttribute('data-separator')
      ? Math.round(v).toLocaleString('en-GB')
      : v.toFixed(decimals);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target: el }) => {
      if (!isIntersecting) return;
      io.unobserve(el);
      const end = Number(el.dataset.count);
      const final = el.textContent;
      const t0 = performance.now(), dur = 1500;
      el.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'sr-only';
      label.textContent = final;
      el.after(label);
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = p < 1 ? format(el, end * eased) : final;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}
