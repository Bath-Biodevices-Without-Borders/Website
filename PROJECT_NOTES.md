# Project notes (for whoever works on the site next, human or Claude)

## Status (28 Oct 2026)
- v2 rebuild done on branch `redesign`; not yet merged to `main` (needs a team member with write access).
- Text approved by Danila Lutsenko (logistics) in the shared doc "Bath Biodevices website: draft site text".

## Update (7 Nov 2026)
- Added a "Team Lead" group at the top of the team list (Sascha Lopes, with photo in `public/team/`).
- New Gallery page (`gallery.html`), linked in the header. Sections and photos are listed in `src/content/gallery.json`; photos go in `public/gallery/`. Sections: Oasis, Saline Supernova, Microfluidics, Membrane Test Rig, Nitrate Sensing, Biohackathon.
- Top of the homepage changed from brown to neon blue (#1F51FF); accent and small-print colours there were lightened to keep WCAG AA contrast. Footer is now dark navy.

## Update (19 Nov 2026)
- New team-only dashboard at `dashboard.html` (branch `dashboard`), following the handover doc "Dashboard handover: GitHub site to Supabase" from Lala. It signs in to Supabase and shows: a voltammetry curve (choose sample and measurement), mean result per pot 1–4 for a run/analyte/technique, sensor trends over time, and live updates.
- Changed from the handover doc: supabase-js and Chart.js are installed with npm and bundled by Vite, not loaded from a CDN. This site has a build step, and its CSP and "no third-party scripts" rule would block CDN scripts.
- The dashboard has its own CSP (`src/partials/head_dashboard.html`) that also allows the Supabase project. It is `noindex` and not in the sitemap. It is linked from the footer ("Team dashboard").
- Privacy and cookie pages updated for the dashboard: Supabase handles team logins, and a sign-in token is kept in local storage while signed in (strictly necessary, no consent needed). Still to be reviewed with the legal pages.
- Live updates need the three tables added to the `supabase_realtime` publication (Lala's side).
- Table names are version 1 and may change. Lala will warn before they do. Queries are all in `src/dashboard.js`.

## Decisions
- One scrolling homepage + privacy, cookies, terms, accessibility, 404. Old About/Work/Contact/Join Us pages removed; old `#/about`-style links redirect to the homepage.
- No cookies, analytics, embeds or third-party requests (fonts self-hosted), so no cookie banner is needed under PECR. A Content-Security-Policy meta tag enforces this.
- Team renamed "Bath Biodevices" (was Bath Biodevices Without Borders) on 28 Oct 2026; the old logo image still says "Without Borders", so the site uses the drop/gear mark plus the name set in type.
- No contact form (EmailJS removed). Contacts: Sascha (shl200@bath.ac.uk) and Sofiia (sb3889@bath.ac.uk).
- Competitions section intentionally hidden until entries are confirmed.
- "Our story" (old trips, previous device) dropped.
- BOM costs and any implied partnerships (Wessex Water, Environment Agency) kept off the site.
- Wording "all of which survive conventional treatment" kept at the team's request (source says many can).
- Name spellings not yet verified: Ryan Ranjput, Louis Beltcher, Laura Tyrell, Polina Kryschenko.

## Security
- The old repo contained a malicious workflow `.github/workflows/github_actions_security.yml` (added Sept 2025 from the "Harry"/Skylordgadget account) that sent EmailJS secrets to 170.39.218.2. It is deleted on this branch. Still to do by an org admin: rotate the EmailJS keys, secure Harry's account (password, 2FA, tokens), review org members, delete the old EmailJS repo secrets.

## To do
- Collect each member's photo, course, year, LinkedIn and Indeed (with consent) into `src/content/team.json`.
- Merge `redesign` into `main` to publish.
- Review legal pages with the SU/supervisor.
