import data from '../content/gallery.json';

// Fills each gallery section from src/content/gallery.json.
// Sections with no photos yet show a short "coming soon" note.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const okFile = (f) => /^[\w.-]+\.(webp|jpe?g|png|avif)$/i.test(f || '');

function photo(p) {
  const src = `/gallery/${esc(p.file)}`;
  return `<li class="gallery__item"><figure>
    <a href="${src}"><img src="${src}" alt="${esc(p.alt || '')}" loading="lazy" decoding="async" /></a>
    ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}
  </figure></li>`;
}

export function initGallery() {
  data.sections.forEach((s) => {
    const el = document.querySelector(`[data-gallery="${s.id}"]`);
    if (!el) return;
    const photos = (s.photos || []).filter((p) => okFile(p.file));
    el.innerHTML =
      (s.description ? `<p class="gallery__desc">${esc(s.description)}</p>` : '') +
      (photos.length
        ? `<ul class="gallery__grid" role="list">${photos.map(photo).join('')}</ul>`
        : `<p class="gallery__empty">Photos coming soon.</p>`);
  });
}
