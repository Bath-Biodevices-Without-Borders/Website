// Labels each milestone as past / current / upcoming from today's date,
// and fills the timeline line up to today when it scrolls into view.
export function initTimeline() {
  const list = document.querySelector('[data-timeline]');
  if (!list) return;
  const items = [...list.querySelectorAll('.milestone')];
  const day = (s) => new Date(s + 'T00:00:00').getTime();
  const now = Date.now();
  const first = day(items[0].dataset.start);
  const last = day(items[items.length - 1].dataset.end);

  items.forEach((li) => {
    const start = day(li.dataset.start), end = day(li.dataset.end) + 86399999;
    const status = li.querySelector('[data-status]');
    if (now > end) { li.classList.add('is-past'); status.textContent = 'Past milestone'; }
    else if (now >= start) { li.classList.add('is-current'); status.textContent = 'Current milestone'; }
    else { status.textContent = 'Upcoming'; }
  });

  const progress = Math.max(0, Math.min(1, (now - first) / (last - first)));
  const fill = document.createElement('span');
  fill.className = 'timeline__fill';
  fill.setAttribute('aria-hidden', 'true');
  list.prepend(fill);

  if (progress > 0 && progress < 1) {
    // Place a "Today" marker at the right point along the line (by position of the current milestone).
    const current = list.querySelector('.is-current');
    if (current) {
      const s = day(current.dataset.start), e = day(current.dataset.end);
      const within = (now - s) / (e - s);
      const place = () => {
        const top = current.offsetTop, next = current.nextElementSibling;
        const span = next ? next.offsetTop - top : current.offsetHeight;
        const y = (top + span * within) / list.offsetHeight;
        list.style.setProperty('--today', y.toFixed(4));
        list.dataset.todayY = y;
      };
      const marker = document.createElement('span');
      marker.className = 'timeline__today';
      marker.setAttribute('aria-hidden', 'true');
      marker.innerHTML = '<span>Today</span>';
      list.append(marker);
      place();
      window.addEventListener('resize', place);
    }
  }

  new IntersectionObserver(([e], io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const target = progress >= 1 ? 1 : Number(list.dataset.todayY || 0);
    list.style.setProperty('--progress', target);
  }, { threshold: 0.25 }).observe(list);
}
