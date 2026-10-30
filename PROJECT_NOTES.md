# Project notes (for whoever works on the site next, human or Claude)

## Status (28 Oct 2026)
- v2 rebuild done on branch `redesign`; not yet merged to `main` (needs a team member with write access).
- Text approved by Danila Lutsenko (logistics) in the shared doc "Bath Biodevices website: draft site text".

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
