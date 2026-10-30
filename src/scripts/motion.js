// One place to check whether the visitor has asked for reduced motion.
const query = window.matchMedia('(prefers-reduced-motion: reduce)');
export const reducedMotion = () => query.matches;
export const onMotionChange = (fn) => query.addEventListener('change', fn);
