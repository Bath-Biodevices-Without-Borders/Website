import { reducedMotion, onMotionChange } from './motion.js';

// "How it works": as each step scrolls to the middle of the screen,
// the matching part of the diagram lights up.
export function initRig() {
  const rig = document.querySelector('[data-rig]');
  if (!rig) return;
  const steps = [...rig.querySelectorAll('[data-step]')];
  const parts = [...rig.querySelectorAll('[data-part]')];
  rig.classList.add('is-enhanced');

  const activate = (n) => {
    rig.dataset.activeStep = n;
    steps.forEach((s) => s.classList.toggle('is-active', s.dataset.step === n));
    parts.forEach((p) => p.classList.toggle('is-active', p.dataset.part === n));
  };
  activate('1');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) activate(e.target.dataset.step); });
  }, { rootMargin: window.matchMedia('(max-width: 52rem)').matches ? '-46% 0px -50% 0px' : '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));

  // Only run the looping flow animation while the rig is on screen.
  let inView = false;
  const setRunning = () => rig.classList.toggle('is-running', inView && !reducedMotion());
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; setRunning(); }).observe(rig);
  onMotionChange(setRunning);
}
