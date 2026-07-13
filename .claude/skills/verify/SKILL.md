---
name: verify
description: Build, launch, and drive this Vite portfolio site to verify changes at the rendered surface.
---

# Verifying changes to this site

Single-package Vite + React 19 + Tailwind v4 site. No backend.

## Launch

```powershell
npm run dev   # Vite dev server on http://localhost:5173/ (ready in ~1s)
```

Run in background; check output file for the "Local:" line before driving.

## Drive

No Playwright in this repo. Use `puppeteer-core` (install in scratchpad, not here)
pointed at the system Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`.

Useful hooks in the DOM:
- Project cards: `[data-testid="projectContainer"]` (header), sibling structure gives the whole card via `.parentElement`.
- Card sections: `data-testid="projectBody"` / `projectFooter"`.
- Carousel arrows: `button[aria-label="Next image"]` / `"Previous image"` (only rendered when a project has >1 image).
- Link badges: `a[aria-label="Project website"]` / `a[aria-label="Project github"]`; disabled badges have no `href` and carry `data-tooltip-content`.

## Gotchas

- Puppeteer `page.screenshot({ clip })` uses **document** coordinates, not viewport; `boundingBox()` returns viewport coordinates — add `scrollY` when clipping after a scroll.
- react-tooltip hover bubbles open (assert via `[role="tooltip"]` innerText while the mouse is over the badge) but are unreliable to catch in headless still frames — assert the DOM, don't rely on the pixel.
- Two `ProjectCards` instances each render `<Tooltip id="my-tooltip" />`, so an open tooltip's text appears twice in the DOM.
- Tests are jest (`npm test`), but verification here means driving the rendered page, not the test suite.
