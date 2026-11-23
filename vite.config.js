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

// Dev server only: Vite injects CSS as inline <style> tags and talks to its
// HMR websocket, both of which the strict CSP blocks. Production keeps the CSP.
const devCsp = () => ({
  name: 'dev-csp',
  apply: 'serve',
  transformIndexHtml(html) {
    return html
      .replace("style-src 'self'", "style-src 'self' 'unsafe-inline'")
      .replace("connect-src 'self'", "connect-src 'self' ws://localhost:* ws://127.0.0.1:*");
  },
});

const pages = ['index', 'privacy', 'cookies', 'terms', 'accessibility', 'gallery', 'dashboard', '404'];

export default defineConfig({
  plugins: [partials(), devCsp()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(__dirname, `${p}.html`)])),
    },
  },
});
