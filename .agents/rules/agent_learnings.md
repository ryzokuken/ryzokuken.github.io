# Agent Rules and Learnings

- When installing a package via the command-line, ALWAYS execute the command `npm install <package-name>` (or `npm install -D` for devDependencies).
- When configuring linters, validate the source files (the uncompiled templates, Markdown files, or scripts, usually located in `src/`) instead of the built, generated output (like `_site/` or `dist/`).
- Avoid over-engineering build steps; keep it simple. Only format and lint inputs; only bundle and optimize the output if strictly necessary.
- Never manually invoke `npx` repeatedly inside the `package.json` scripts if the binary is provided by a devDependency. Instead, simply refer to the binary by name (e.g. `markuplint`, `linkinator`, `lightningcss`), as `npm run` processes automatically resolve the `.bin` executables properly.
- For tool validations, always check official docs (e.g. through internet searches) before performing an action instead of blindly using package commands.
- Never commit agent-specific artifact files (e.g. `walkthrough.md`, `implementation_plan.md`, `task.md`) to the actual source code repository's history - they belong exclusively in the Antigravity configuration or workspace specifics.
