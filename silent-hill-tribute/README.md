# Silent Hill Tribute Website

A non-commercial, fan-made interactive tribute website built with **React**, **Vite**, **Tailwind CSS v4**, **GSAP**, and **Framer Motion**.

## Page Flow
- **New users:** Landing (`index.html`) -> Register (`register.html`) -> Dashboard (`dashboard.html`)
- **Returning users:** Landing (`index.html`) -> Login (`login.html`) -> Dashboard (`dashboard.html`)
- If a signed-in user opens Login or Register, they are redirected to the Dashboard.
- **Navigation:** signed out shows `Sign in / Create account`; signed in shows `Journal / Sign out`.

## Main Pages (separate files)
- `index.html` — Landing/interactive archive page (scroll-driven sections, animations, radio, echoes, flashlight reveal, lore galleries)
- `login.html` — Login page
- `register.html` — Register (create account) page
- `dashboard.html` — Dashboard/Journal (progress depth, radio signal status, echoes/badges, journal)

Authentication/progress is a browser-local demo using `localStorage` (no backend server). Use `http://localhost`/HTTPS context for Web Crypto password hashing.

## Folder Structure
- `index.html`, `login.html`, `register.html`, `dashboard.html` — page entry files
- `src/main.jsx` — React entry point
- `src/App.jsx` — page routing, guards, and app composition
- `src/index.css` — global styles/Tailwind theme and visual effects
- `src/lib.js` — shared state/utilities/storage helpers
- `src/components/` — React UI components (Header, Hero, Portal, Lore, Auth, Dashboard, Sigil/glyph, overlays, etc.)
- `src/assets/` — organized assets
  - `images/` — all image assets (characters, monsters, chapter/location images)
  - `fonts/` — Silent Hill font files
  - `audio/` — audio assets
- `dist/` — production build output (generated)

## Visual Elements
Includes original/styled visual elements such as the animated canvas **sigil/glyph**, `S·H` emblem, archive stamps/badges, dossier UI marks, fog/overlay/cursor effects, and interactive iconography throughout the site.

## Run / Access
From the `silent-hill-tribute` folder:

```bash
npm install
npm run dev
```
Open the dev URL shown by Vite (typically `http://localhost:5173/index.html`). Navigate via the header or open directly:
- `/index.html` (Landing)
- `/register.html` (Create account)
- `/login.html` (Sign in)
- `/dashboard.html` (Journal/Dashboard)

### Production build
```bash
npm run build
npm run preview
```
`npm run build` outputs static files to `dist/`. Serve `dist/` with any static web server (or copy to your XAMPP/Apache web root) and open `index.html`.

## Notes
- Stack: React 18, Vite, Tailwind v4 (`@tailwindcss/vite`), GSAP + ScrollTrigger + ScrollToPlugin, Framer Motion.
- GSAP animates wrapper/scroll effects; Framer Motion handles component/UI animations.
- Demo auth only: credentials/progress stored in this browser, not real security.
- Fan-made, non-commercial tribute. Not affiliated with or endorsed by Konami.
