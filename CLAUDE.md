# ryzokuken.github.io

Personal website for Ujjwal Sharma (ryzokuken), built with [Eleventy](https://www.11ty.dev/) 3.x and LiquidJS templates. Deployed to GitHub Pages via GitHub Actions.

Product context (audience, purpose, constraints) lives in `PRODUCT.md`.

## Workflow

This repo commits to `main`; `pnpm validate` gates the deploy. Hooks come from `pnpm install`. `pnpm lint:actions` (also run on push) needs `actionlint` and `zizmor` installed on the machine. The link crawl, `pnpm test:links`, is not part of `validate`; a weekly workflow runs it.

## Development rules

- Validate source files in `src/`, not the generated output in `_site/`.
- Agent working files (walkthroughs, plans, `.impeccable/critique/`, `.claude/settings.local.json`) stay out of the repo; the last two are gitignored.
- To verify speaker or event data, use the source list in the `fixing-dead-links` skill before making changes.

## Data conventions

### `src/_data/talks.json`

- **date**: `"Mon YYYY"` format with 3-letter month abbreviations (`Jan`, `Feb`, …, `Dec`). Never full month names or year-only.
- **location**: `"City, CC"` using ISO 3166-1 alpha-2 country codes. Use `"Online"` for virtual events.
- **flag**: Emoji flag matching the country code. Use `🌐` only for events with no geographic association.
- **links**: Include `conf`, `video`, `slides`, `meetup`, or `event` as applicable. Add `video` whenever recordings exist.
- **title**: Exact talk title. Append `\*` for undelivered talks (accepted but not given).
- **upcoming**: Set `"upcoming": true` on talks that haven't happened yet. They render in a separate "Upcoming" section instead of "Past talks", and surface on the home page as "next talk". Remove the field once the talk has taken place; if it falls through, remove it and mark the talk undelivered.
- **Sorting**: Talks within a year are ordered chronologically (earliest first).

### `src/_data/podcasts.json`

- **date**: Same `"Mon YYYY"` format. Always include the month when known.
- **url**: Direct link to the episode page (not just the show's homepage).
- **Sorting**: Entries are ordered chronologically across the entire array (earliest first).

## Website design guidelines

`DESIGN.md` is the authority for visual decisions, including responsive behavior and dark mode. Mind its Understatement Rule: the site never names or labels itself as a spec. Domain terms live in `CONTEXT.md`.

### Emoji

The site uses country flags and icons throughout. Windows lacks native support for emoji flags; Twemoji is loaded from a CDN in `src/_includes/layout.liquid` on pages that set `flags: true` in front matter.

## Agent skills

### Issue tracker

Issues live as GitHub Issues in `ryzokuken/ryzokuken.github.io`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
