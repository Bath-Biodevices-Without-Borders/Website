import { reducedMotion, onMotionChange } from './motion.js';

// Suspended sediment drifting in the hero. Moving the pointer stirs it.
export function initParticles() {
  const canvas = document.querySelector('[data-particles]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let w = 0, h = 0, dpr = 1, motes = [], raf = 0, visible = true;
  const pointer = { x: -9999, y: -9999 };

  const make = () => {
    const count = Math.min(160, Math.round((w * h) / 9000));
    motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() ** 2 * 2.6,
      vy: 0.06 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      a: 0.14 + Math.random() * 0.42,
      dx: 0, dy: 0,
    }));
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    make();
    draw(0);
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    for (const m of motes) {
      ctx.globalAlpha = m.a;
      ctx.fillStyle = '#e0bd76';
      ctx.beginPath();
      ctx.arc(m.x + m.dx + Math.sin(t / 2400 + m.phase) * 6, m.y + m.dy, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const step = (t) => {
    for (const m of motes) {
      m.y += m.vy;
      if (m.y > h + 4) { m.y = -4; m.x = Math.random() * w; }
      const ex = m.x + m.dx - pointer.x, ey = m.y + m.dy - pointer.y;
      const d2 = ex * ex + ey * ey;
      if (d2 < 14400) { const f = (1 - Math.sqrt(d2) / 120) * 2.2; const d = Math.sqrt(d2) || 1; m.dx += (ex / d) * f; m.dy += (ey / d) * f; }
      m.dx *= 0.95; m.dy *= 0.95;
    }
    draw(t);
    raf = requestAnimationFrame(step);
  };

  const start = () => { cancelAnimationFrame(raf); if (!reducedMotion() && visible && !document.hidden) raf = requestAnimationFrame(step); };
  const stop = () => cancelAnimationFrame(raf);

  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  onMotionChange(() => { start(); if (reducedMotion()) draw(0); });
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); start(); }, 150); });

  resize();
  start();
}
