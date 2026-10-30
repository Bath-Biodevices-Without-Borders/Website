// Mobile menu, header colour per section, and highlighting the current section in the nav.
export function initNav() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });

  // Header tone follows the section underneath it.
  const tones = [
    ['.hero, .s-water', 'silt'],
    ['.s-gap, .s-rig', 'deep'],
    ['.s-light, .s-contact', 'light'],
  ];
  const toneOf = new Map();
  tones.forEach(([sel, tone]) => document.querySelectorAll(sel).forEach((el) => toneOf.set(el, tone)));
  if (toneOf.size) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) header.dataset.tone = toneOf.get(e.target); });
    }, { rootMargin: '-64px 0px -90% 0px' });
    toneOf.forEach((_, el) => io.observe(el));
  }

  // Mark the nav link for the section in view.
  const links = [...nav.querySelectorAll('a[href^="/#"]')];
  const sections = links.map((a) => document.querySelector(a.hash)).filter(Boolean);
  if (sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => {
          if (a.hash === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }
}
