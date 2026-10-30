import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Shared header and footer live in src/partials/ and are inserted into every
// page at build time, so they only need editing in one place.
const partials = () => ({
  name: 'html-partials',
  transformIndexHtml(html) {
    return html.replace(/<!--\s*@(\w+)\s*-->/g, (_, name) =>
      readFileSync(resolve(__dirname, `src/partials/${name}.html`), 'utf8')
    );
  },
});

const pages = ['index', 'privacy', 'cookies', 'terms', 'accessibility', '404'];

export default defineConfig({
  plugins: [partials()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(__dirname, `${p}.html`)])),
    },
  },
});
