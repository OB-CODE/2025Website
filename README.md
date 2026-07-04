# mitch-obrien.com

Personal portfolio site for Mitch O'Brien — Software Engineer. A space-themed
single page covering skills, projects, and contact details.

**Live site:** [www.mitch-obrien.com](https://www.mitch-obrien.com/)

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev/build tooling
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) for tests
- Deployed on [AWS Amplify](https://aws.amazon.com/amplify/) (see `amplify.yml`)

## Getting started

```bash
nvm use        # Node version pinned in .nvmrc
npm ci
npm run dev    # start the dev server
```

### Environment variables

The contact form posts through [HeroTofu](https://herotofu.com/). Create a
`.env` file (not committed) with:

```
VITE_HEROTOFU_API_KEY=<your-herotofu-form-id>
```

For deployed builds, set the same variable in the Amplify console under
**App settings → Environment variables**.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Type-check and build to `dist/`    |
| `npm run preview` | Preview the production build       |
| `npm test`        | Run the Jest test suite            |
| `npm run lint`    | Run ESLint                         |

## Project structure

```
public/           Static assets (images, favicon, og-image, robots.txt)
src/
  components/     Feature components (header, projects, about, contact, ...)
    magicui/      Canvas/visual effect components
    ui/           Reusable UI primitives (buttons, cards, headings)
  lib/            Shared utilities
```

## Accessibility

Ambient animation is kept intentionally light, and the remaining effects
(cosmic background, terminal typing) respect `prefers-reduced-motion`.
