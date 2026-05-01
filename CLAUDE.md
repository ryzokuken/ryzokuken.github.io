# ryzokuken.github.io

Personal website for Ujjwal Sharma (ryzokuken), built with [Eleventy](https://www.11ty.dev/) 3.x and LiquidJS templates. Deployed to GitHub Pages via GitHub Actions.

**Stack:** Eleventy · LiquidJS · LightningCSS · markuplint · linkinator · Husky + lint-staged · Mermaid

## Dev commands

This project uses **pnpm** (see `packageManager` in `package.json` and `pnpm-lock.yaml`). Never use npm or yarn — they will produce a stale `package-lock.json` and drift the dependency tree.

- `pnpm dev` — Eleventy dev server with live reload
- `pnpm build` — build site (Eleventy + LightningCSS minification)
- `pnpm lint` — markuplint
- `pnpm test:links` — linkinator on built `_site/`
- `pnpm test` — full build + lint + link check

## Development rules

- Always use `pnpm add <package>` (or `-D` for dev deps) — never `npx` for installing, never `npm install`.
- Validate source files in `src/`, not the generated output in `_site/`.
- Don't invoke devDependency binaries via `npx` in `package.json` scripts or hooks — reference the binary name directly (`pnpm run` resolves `.bin` executables automatically).
- Always check official docs before using a package command for the first time.
- Don't over-engineer build steps: lint/format inputs; bundle/optimize outputs only when strictly necessary.
- Never commit agent-specific artifact files (e.g. `walkthrough.md`, `implementation_plan.md`) to the repo.
- When verifying speaker/event data, cross-reference multiple authoritative sources (conference sites, FOSDEM archives, YouTube, sessionize, conffab, Igalia speaker pages) before making changes.

## Data conventions

### `src/_data/talks.json`

- **date**: `"Mon YYYY"` format with 3-letter month abbreviations (`Jan`, `Feb`, …, `Dec`). Never full month names or year-only.
- **location**: `"City, CC"` using ISO 3166-1 alpha-2 country codes. Use `"Online"` for virtual events.
- **flag**: Emoji flag matching the country code. Use `🌐` only for events with no geographic association.
- **links**: Include `conf`, `video`, `slides`, `meetup`, or `event` as applicable. Add `video` whenever recordings exist.
- **title**: Exact talk title. Append `\*` for cancelled/undelivered talks.
- **Sorting**: Talks within a year are ordered chronologically (earliest first).

### `src/_data/podcasts.json`

- **date**: Same `"Mon YYYY"` format. Always include the month when known.
- **url**: Direct link to the episode page (not just the show's homepage).
- **Sorting**: Entries are ordered chronologically across the entire array (earliest first).

## Website design guidelines

### Aesthetic

Simple, clean, consistent — "nerdy and professional". Single monospace typeface (JetBrains Mono). Strict black-and-white palette with one accent color: TC39 Orange (`#FC7C00`). Brutalist geometry: sharp angles, thick borders (2–4px solid), no rounded corners.

### Emoji

The site uses country flags and icons throughout. Windows lacks native support for emoji flags; Twemoji is loaded via CDN in `src/_includes/layout.liquid` as the cross-platform fallback.

### Responsive

Must work on all popular screen sizes. Test that layout doesn't break on desktop or mobile at any time.

### Dark mode

Light and dark modes are supported via `prefers-color-scheme`. Every feature must look correct in both modes.
