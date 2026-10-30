# bathbiodevices.com

Website for Bath Biodevices, a vertically integrated project at the University of Bath.

## How it's published
Anything pushed to the `main` branch is built and published automatically by GitHub Pages (see `.github/workflows/deploy.yml`). It goes live at bathbiodevices.com a few minutes later.

## Common edits
| To change… | Edit this file |
|---|---|
| Team members (course, year, LinkedIn, Indeed, photo) | `src/content/team.json` (photos go in `public/team/`) |
| Homepage text | `index.html` |
| Legal pages | `privacy.html`, `cookies.html`, `terms.html`, `accessibility.html` |
| Header and footer (all pages) | `src/partials/header.html`, `src/partials/footer.html` |
| Colours and fonts | `src/styles/base.css` |

Only publish photos and profile links that each person has agreed to.

## Running it on your own computer
1. Install Node.js 22.
2. In this folder: `npm install`, then `npm run dev`, and open the address it prints.
3. `npm run build` makes the finished site in `build/`.

Built with Vite and plain JavaScript. No trackers, cookies or third-party scripts — please keep it that way, or update the privacy and cookie pages (and add a consent banner) if that changes.
