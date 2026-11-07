import data from '../content/gallery.json';

// Fills each gallery section from src/content/gallery.json.
// Sections with no photos yet show a short "coming soon" note.
// An entry whose file is .mp4 or .webm is shown as a video (add a "poster" image for its still frame).

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const okFile = (f) => /^[\w.-]+\.(webp|jpe?g|png|avif|mp4|webm)$/i.test(f || '');
const isVideo = (f) => /\.(mp4|webm)$/i.test(f);

function photo(p) {
  const src = `/gallery/${esc(p.file)}`;
  if (isVideo(p.file)) {
    const poster = okFile(p.poster) && !isVideo(p.poster) ? ` poster="/gallery/${esc(p.poster)}"` : '';
    return `<li class="gallery__item gallery__item--video"><figure>
      <video src="${src}"${poster} controls playsinline preload="none" aria-label="${esc(p.alt || 'Video')}"></video>
      ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}
    </figure></li>`;
  }
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
