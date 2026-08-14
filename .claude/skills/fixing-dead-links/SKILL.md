---
name: fixing-dead-links
description: Use when `pnpm run test:links` reports broken URLs (404s or connection failures), typically in src/_data/talks.json — finds live replacements and verifies them before editing.
---

# Fixing Dead Links

## Overview

`pnpm run test:links` runs linkinator with `--recurse` over the built site, so it
catches dead links buried in data files, not just templates. Content rot in
`src/_data/talks.json` (old conference/event URLs) is the most common source.
Never trust a search result's URL as live — curl it. Never trust a WebFetch
summary of a status API as ground truth — curl it too.

## When to Use

- `pnpm run test:links` (or `pnpm test`) fails with `[404]` or `[0]` entries
- You're asked to clean up stale links in `talks.json` or similar data files

## Process

1. **Get the exact failing list.** `pnpm run test:links` output is long; filter it:
   ```bash
   pnpm run test:links 2>&1 | grep -E "^\s*\[[0-9x]" | grep -v "\[200\]"
   ```
2. **Classify each failure:**
   | Status | Meaning | Approach |
   |---|---|---|
   | `[404]` | Host alive, page gone | Find the current canonical URL first |
   | `[0]` | Connection failure, host likely dead | Wayback Machine snapshot |
3. **Find the entry.** Grep the bare domain/slug against `src/_data/talks.json` to
   get full context (title, event, date) — you need this to search accurately.
4. **Research a replacement**, cross-referencing multiple sources before touching
   data (conference sites, YouTube, Sessionize, Conffab, devconf.net, GitHub
   archives of the event). Special case: **FOSDEM** moves past years to
   `archive.fosdem.org/<year>/schedule/event/<slug>/`, and the numeric event ID
   in the slug can differ from the live-schedule ID that's currently in the
   data — search by talk title, don't assume the old ID carries over. Add a
   `video` link if recordings now exist that didn't before.
5. **Verify every candidate URL with curl before writing it** — a 200 from curl,
   not a claim from a search snippet or a WebFetch summary:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -L "https://candidate-url"
   ```
6. **If nothing live exists**, fall back to a Wayback Machine snapshot. Query the
   API, then confirm the *snapshot itself* loads (the API can report `available`
   for a snapshot that's since been evicted):
   ```bash
   curl -s "http://archive.org/wayback/available?url=<bare-domain-or-path>"
   curl -s -o /dev/null -w "%{http_code}\n" "https://web.archive.org/web/<timestamp>/<original-url>"
   ```
   Use the `https://web.archive.org/...` form (not `http://`) in the committed data.
   If that snapshot 404s, the API's `available: true` was stale — retry the
   query with an explicit `&timestamp=` a few years earlier/later, or open
   `https://web.archive.org/web/*/<url>` in a browser to pick a working
   capture by hand. If no capture ever loads, treat it as unreplaceable (step 7).
7. **Keep the talk entry** even if a link can't be replaced — remove only the
   dead `links` key, never the talk itself.
8. **`meetup.com` links are skipped by the checker** (bot-blocks CI) — if you
   touch one, check it by hand in a browser.
9. Validate and verify: `node -e "JSON.parse(require('fs').readFileSync('src/_data/talks.json','utf8'))"`,
   then `pnpm test` (unit + build + lint + link check) must exit 0.
10. Follow the data conventions in `CLAUDE.md` (date format, location codes,
    `links` keys) for anything you edit.

## Common Mistakes

- Trusting a search-result URL without curling it — snippets are often stale,
  paraphrased, or point at a redirect target that itself 404s.
- Assuming a platform's "permanent" archive URL scheme never changes IDs
  (FOSDEM does, between the live schedule and `archive.fosdem.org`).
- Deleting the whole talk entry instead of leaving it with a reduced `links`
  object when no live replacement exists.
- Skipping the final `pnpm test` run and declaring victory on the edit alone.
