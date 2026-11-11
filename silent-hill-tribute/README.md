# Silent Hill fan tribute (non-commercial, unaffiliated)

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in dist/

Stack: Vite, React 18, Tailwind v4 (`@tailwindcss/vite`, config lives in `src/index.css`), GSAP + ScrollTrigger + ScrollToPlugin, Framer Motion.

Notes
- `--p` on `<html>` (0 Fog, 1 Otherworld) is driven by one scrubbed GSAP timeline in `Transition.jsx`.
- GSAP animates wrapper elements; Framer animates inner elements. They never share a transform.
- Pages (hash routes): landing `#/`, `#/login`, `#/register`, `#/dashboard`. Auth is a localStorage demo with no backend, not real security.
- Pinned and horizontal sections only pin at 768px and wider.
