# ryzokuken.github.io

Personal website for Ujjwal Sharma (ryzokuken), built with [Eleventy](https://www.11ty.dev/) 3.x and LiquidJS templates. Deployed to GitHub Pages via GitHub Actions.

**Stack:** Eleventy · LiquidJS · LightningCSS · markuplint · linkinator · Vitest · Husky + lint-staged · Mermaid

Product context (audience, purpose, constraints) lives in `PRODUCT.md`.

## Dev commands

This project uses **pnpm** (see `packageManager` in `package.json` and `pnpm-lock.yaml`). Never use npm or yarn — they will produce a stale `package-lock.json` and drift the dependency tree.

- `pnpm dev` — Eleventy dev server with live reload
- `pnpm build` — build site (Eleventy + LightningCSS minification)
- `pnpm lint` — markuplint
- `pnpm test:unit` — Vitest unit tests in `test/`
- `pnpm test:links` — linkinator on built `_site/`
- `pnpm test` — unit tests + build + lint + link check

## Workflow

Commit straight to `main` and push it; this local machine is the work and testing surface. This overrides the global feature-branch-and-PR rule for this repo.

Every push to `main` deploys to GitHub Pages at once — CI runs beside the deploy, not before it — so the Husky hooks are the gate: pre-commit checks the staged files (`.lintstagedrc.json`), pre-push runs the full `pnpm test`. When a hook fails, fix the cause and retry. Check visual changes in `pnpm dev` before committing.

Make each commit atomic: one logical change that passes the pre-commit hook on its own.

`core.hooksPath` points every worktree at the main checkout's `.husky/_`, which runs the hook scripts from the main checkout's `.husky/`. A hook added or changed in a worktree takes effect once the main checkout pulls it.

From a `.claude/worktrees/` session, rebase onto `origin/main`, then `git push origin HEAD:main`.

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
- **title**: Exact talk title. Append `\*` for undelivered talks (accepted but not given).
- **upcoming**: Set `"upcoming": true` on talks that haven't happened yet. They render in a separate "Upcoming" section instead of "Past talks", and surface on the home page as "next talk". Remove the field once the talk has taken place; if it falls through, remove it and mark the talk undelivered. A unit test fails once an upcoming talk's month has passed.
- **Sorting**: Talks within a year are ordered chronologically (earliest first).

### `src/_data/podcasts.json`

- **date**: Same `"Mon YYYY"` format. Always include the month when known.
- **url**: Direct link to the episode page (not just the show's homepage).
- **Sorting**: Entries are ordered chronologically across the entire array (earliest first).

## Website design guidelines

### Aesthetic

`DESIGN.md` is the authority for visual decisions. The site borrows the look of a web specification: numbered sections, a sticky table of contents, captioned tables and note panels. It never names or labels itself as a spec (DESIGN.md's Understatement Rule): no "Living Standard", "Clause" or "Table N:" in visible text, and no numbering below h2. Headings use Public Sans, prose uses Source Serif 4, and code uses the system mono. The palette is a white sheet, near-black ink and one spec blue, with 1px rules and no cards, shadows or radius. `lib/clauses.js` numbers headings at build time for any page that sets `clause` in front matter. Domain terms live in `CONTEXT.md`.

### Emoji

The site uses country flags and icons throughout. Windows lacks native support for emoji flags; Twemoji is loaded from a CDN in `src/_includes/layout.liquid` on pages that set `flags: true` in front matter.

### Responsive

Must work on all popular screen sizes. Test that layout doesn't break on desktop or mobile at any time.

### Dark mode

Light and dark modes follow `prefers-color-scheme` by default. A switcher at the foot of the table-of-contents sidebar (auto/light/dark) overrides it by setting `data-theme` on `<html>` and storing the choice in `localStorage`. Every feature must look correct in both modes and under both mechanisms.

## Agent skills

### Issue tracker

Issues live as GitHub Issues in `ryzokuken/ryzokuken.github.io`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
