# bathbiodevices.com

Website for Bath Biodevices, a vertically integrated project at the University of Bath.

## How it's published
Anything pushed to the `main` branch is built and published automatically by GitHub Pages (see `.github/workflows/deploy.yml`). It goes live at bathbiodevices.com a few minutes later.

## Common edits
| To change… | Edit this file |
|---|---|
| Team members (course, year, LinkedIn, Indeed, photo) | `src/content/team.json` (photos go in `public/team/`) |
| Homepage text | `index.html` |
| Gallery photos (Oasis, Saline Supernova, Microfluidics, Membrane Test Rig, Nitrate Sensing, Biohackathon) | `src/content/gallery.json` (photos go in `public/gallery/`) |
| Legal pages | `privacy.html`, `cookies.html`, `terms.html`, `accessibility.html` |
| Header and footer (all pages) | `src/partials/header.html`, `src/partials/footer.html` |
| Colours and fonts | `src/styles/base.css` |
| Team dashboard (rig data) | `dashboard.html`, `src/dashboard.js`, `src/styles/dashboard.css` |

Only publish photos and profile links that each person has agreed to.

## Running it on your own computer
1. Install Node.js 22.
2. In this folder: `npm install`, then `npm run dev`, and open the address it prints.
3. `npm run build` makes the finished site in `build/`.

## Team dashboard
`/dashboard.html` is a team-only page. Team members sign in with an email and password, and the page reads membrane test rig data from Supabase (tables `samples`, `measurements` and `sensor_readings`) and draws charts with Chart.js. It updates live while a test runs.
- Both libraries are installed with npm and bundled by Vite, so no third-party scripts are loaded.
- Connection details are in `src/scripts/supabase-config.js`. The URL and publishable key are meant to be public. **Never commit the secret (service-role) key.**
- Security lives in the database: Row Level Security lets signed-in team members read, and only the rig (ESP32) write. Visitors who aren't signed in get no data.
- The dashboard is **read-only**. It must not insert, update or delete rows. Rig control will come later through its own table, with limits checked on the rig.
- The page has its own head partial (`src/partials/head_dashboard.html`). Its Content-Security-Policy also allows the Supabase project. If the Supabase project changes, update it there too.
- Logins are created by the hardware lead in Supabase Auth.

Built with Vite and plain JavaScript. No trackers, cookies or third-party scripts. The team dashboard talks to Supabase only after a team member signs in. Please keep it that way, or update the privacy and cookie pages (and add a consent banner) if that changes.
