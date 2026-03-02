# Agent Rules and Learnings

- When installing a package via the command-line, ALWAYS execute the command `npm install <package-name>` (or `npm install -D` for devDependencies).
- When configuring linters, validate the source files (the uncompiled templates, Markdown files, or scripts, usually located in `src/`) instead of the built, generated output (like `_site/` or `dist/`).
- Avoid over-engineering build steps; keep it simple. Only format and lint inputs; only bundle and optimize the output if strictly necessary.
- Never manually invoke `npx` repeatedly inside the `package.json` scripts if the binary is provided by a devDependency. Instead, simply refer to the binary by name (e.g. `markuplint`, `linkinator`, `lightningcss`), as `npm run` processes automatically resolve the `.bin` executables properly.
- For tool validations, always check official docs (e.g. through internet searches) before performing an action instead of blindly using package commands.
- Never commit agent-specific artifact files (e.g. `walkthrough.md`, `implementation_plan.md`, `task.md`) to the actual source code repository's history - they belong exclusively in the Antigravity configuration or workspace specifics.
- When verifying speaker/event data, always cross-reference multiple authoritative sources (conference sites, FOSDEM archives, YouTube channels, sessionize, conffab, Igalia speaker pages) before making changes.

## Data Conventions: `talks.json`

- **date**: Always use `"Mon YYYY"` format with 3-letter month abbreviations (`Jan`, `Feb`, …, `Dec`). Never use full month names or year-only values.
- **location**: Use `"City, CC"` with ISO 3166-1 alpha-2 country codes (`RS` for Serbia, `IN` for India, etc.). Use `"Online"` for virtual events.
- **flag**: Use emoji flags matching the country code. Use `🌐` only for events with no geographic association.
- **links**: Include `conf` (conference schedule page), `video` (YouTube/recording), `slides`, `meetup`, or `event` as applicable. Add video links whenever recordings exist.
- **title**: Use the exact talk title. Append `\\*` for cancelled/undelivered talks.
- **Sorting**: Talks within a year are ordered chronologically (earliest first).

## Data Conventions: `podcasts.json`

- **date**: Same `"Mon YYYY"` format as talks. Always include the month when known.
- **url**: Direct link to the episode page (not just the show's homepage).
- **Sorting**: Entries are ordered chronologically across the entire array (earliest first).
