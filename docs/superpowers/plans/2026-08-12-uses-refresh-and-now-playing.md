# `/uses` Refresh and Now Playing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/uses` as a data-driven page governed by a required-rationale rule, and add a Now Playing widget fed by ListenBrainz.

**Architecture:** `/uses` moves from 233 lines of hand-written HTML to `src/_data/uses.json` rendered through a Liquid include, mirroring the existing `talks.json` → `talks-list.liquid` → `talk-card.liquid` pattern. Now Playing is two ES modules: a pure data layer with unit tests, and a DOM layer that fetches ListenBrainz on load and injects a widget only on success. No runtime dependencies, no secrets, no server.

**Tech Stack:** Eleventy 3.1.6, LiquidJS, LightningCSS, markuplint, linkinator, vitest 4.

**Spec:** `docs/superpowers/specs/2026-08-12-uses-refresh-and-now-playing-design.md`

## Global Constraints

- **Package manager is pnpm.** Never `npm` or `yarn`, including read-only queries. `pnpm view`, not `npm view`.
- **Never invoke devDependency binaries via `npx`** in scripts or hooks — reference the binary name directly.
- **Validate `src/`, never `_site/`.**
- **No new runtime dependencies.** Nothing new may be shipped to the browser. vitest is a devDependency and ships nothing.
- **Palette is strictly black/white plus one accent,** TC39 Orange `#fc7c00`, exposed as `var(--accent)`.
- **Brutalist geometry:** sharp corners (`--radius: 0`), 2–4px solid borders, no rounded corners anywhere.
- **Single typeface:** JetBrains Mono via `var(--font-mono)`.
- **Light and dark mode must both be correct.** Use existing tokens (`--bg`, `--text`, `--text-secondary`, `--border`, `--accent`); never hardcode a colour.
- **Must work at all widths.** Existing breakpoints use CSS range syntax: `@media (width >= 640px)`.
- **`note` is a required field on every `uses.json` item.** No rationale, no card. This is the editorial rule; it is not optional.
- **Link liveness is linkinator's job.** Do not curl or fetch URLs by hand to check whether they resolve.
- **Existing `package.json` uses caret ranges.** Match that convention for the one new devDependency rather than introducing a lone exact pin.
- Commit after every task.

---

### Task 1: Convert `/uses` to a data-driven page

**Files:**
- Create: `src/_data/uses.json`
- Create: `src/_includes/uses-section.liquid`
- Modify: `src/uses.md` (full rewrite, 233 lines → ~30)

**Interfaces:**
- Consumes: nothing.
- Produces: the global `uses` data object with shape `{ sections: Section[], retired: RetiredItem[] }`, where `Section = { title: string, blurb?: string, items: Item[] }` and `Item = { name: string, note: string, url?: string, since?: string }`. Task 2 consumes `uses.retired`. Task 3 consumes `Item.since`.

Eleventy exposes any file in `src/_data/` as a global variable named after the file, so `src/_data/uses.json` is available as `uses` in every template. This is the same mechanism `talks.json` already uses.

- [ ] **Step 1: Create the data file**

Create `src/_data/uses.json`. The `retired` key is present but empty; Task 2 fills it.

```json
{
  "sections": [
    {
      "title": "Desk",
      "items": [
        {
          "name": "Framework 13",
          "url": "https://frame.work/laptop13",
          "note": "Repairability as a purchasing decision. I have swapped ports on a train platform and replaced a part without an appointment or a proprietary screwdriver; on every other laptop I have owned, both would have been a support ticket.",
          "since": "2024-06"
        },
        {
          "name": "ASUS TUF Gaming VG27AQ",
          "url": "https://www.asus.com/displays-desktops/monitors/tuf-gaming/tuf-gaming-vg27aq/",
          "note": "1440p at 165Hz. The high refresh rate turned out to matter far more for dragging windows and scrolling diffs than it ever did for games."
        },
        {
          "name": "Drop Ctrl",
          "url": "https://drop.com/buy/drop-ctrl-mechanical-keyboard",
          "note": "Tactile Halo True switches, hot-swappable, in a case heavy enough that it does not slide when I type angrily. Years of daily use and it still sounds new."
        },
        {
          "name": "Blue Yeti",
          "note": "The obvious pick, which is precisely the point. On calls from hotel rooms, conference corridors and airports, nobody has ever once asked me to repeat myself. Boring hardware that has never been the problem."
        },
        {
          "name": "Sennheiser HD 4.50 BTNC",
          "note": "Wireless with active noise cancelling, and old enough now that the battery has outlived two phones. I wear them for eight hours at a stretch without remembering they are there."
        }
      ]
    },
    {
      "title": "Dev environment",
      "blurb": "My choice of browser leans hard into free software and the open web: Gecko is the last major engine not owned by an advertising company, and keeping it alive is part of the job. The rest of the stack follows the same instinct from a different angle — bleeding-edge Arch, a native editor, a native terminal. Lean, fast, and stripped of the bloat that Electron made normal.",
      "items": [
        {
          "name": "Zen",
          "url": "https://zen-browser.app/",
          "note": "Firefox underneath, which is the entire point: Gecko is the last major engine not owned by an advertising company. Zen just makes it a nicer place to spend ten hours a day.",
          "since": "2025-09"
        },
        {
          "name": "Arch Linux",
          "url": "https://archlinux.org/",
          "note": "Arch for control over every layer of the system, with the <a href=\"https://cachyos.org/\">CachyOS</a> repos for compiler-optimised builds I do not have to maintain myself. Bleeding edge on borrowed maintenance."
        },
        {
          "name": "Ghostty",
          "url": "https://ghostty.org/",
          "note": "Native, GPU-accelerated, and configured with a plain text file rather than a JavaScript bundle. A terminal emulator should not ship a browser runtime."
        },
        {
          "name": "Zsh",
          "url": "https://www.zsh.org/",
          "note": "Paired with <a href=\"https://ohmyz.sh/\">oh-my-zsh</a> for the plumbing and <a href=\"https://starship.rs/\">Starship</a> for the prompt. I have carried this configuration across four machines and three jobs."
        },
        {
          "name": "Zed",
          "url": "https://zed.dev/",
          "note": "Fast enough that the editor is never the thing I am waiting on, which sounds like a small claim until you have used something that isn't."
        },
        {
          "name": "Claude Code",
          "url": "https://claude.com/claude-code",
          "note": "Lives in the terminal instead of holding an editor hostage, which means it composes with everything else here. Most of what I hand it is the work I would otherwise put off.",
          "since": "2025-11"
        },
        {
          "name": "Claude Cowork",
          "url": "https://claude.com/",
          "note": "For the longer-running work that does not fit in a single sitting. Different shape of problem from Claude Code, same reason for reaching for it.",
          "since": "2026-04"
        }
      ]
    },
    {
      "title": "Gaming rig",
      "blurb": "I split my computing life to keep both halves clean. Windows lives at home purely to play games on a humble rig without fighting compatibility layers, which keeps the work laptop focused and free of things it does not need.",
      "items": [
        {
          "name": "Desktop PC",
          "note": "Ryzen 5 2600, GTX 1660 Ti, 32GB. Deliberately humble and deliberately unchanged: it still runs everything I want at a resolution I am happy with, and upgrading it would be a hobby rather than a need."
        },
        {
          "name": "Keychron V3 Max",
          "url": "https://www.keychron.com/products/keychron-v3-max-qmk-via-wireless-custom-mechanical-keyboard",
          "note": "Linear Gateron Reds, because games reward travel that does not fight back where writing rewards tactility. That difference is the whole reason I do not use one keyboard for both."
        },
        {
          "name": "Razer Deathadder V3",
          "url": "https://www.razer.com/gaming-mice/razer-deathadder-v3",
          "note": "Wired, on purpose. I would rather never think about a battery than save a cable, and this is the only shape that has never given me wrist ache."
        },
        {
          "name": "HyperX Cloud II",
          "url": "https://hyperx.com/products/hyperx-cloud-ii-gaming-headset",
          "note": "Bought years ago on the strength of the padding rather than the drivers, and that turned out to be the right thing to optimise for."
        },
        {
          "name": "Windows Terminal",
          "url": "https://aka.ms/windowsterminal",
          "note": "The one piece of default Windows software I would install deliberately. It made the platform's shell story tolerable, and it is open source."
        },
        {
          "name": "PowerShell 7",
          "url": "https://github.com/PowerShell/PowerShell",
          "note": "Objects down the pipe instead of text, which is a genuinely better idea than the Unix version even when the syntax is not. The cross-platform rewrite is the part that made me stop avoiding it."
        }
      ]
    },
    {
      "title": "Phone",
      "items": [
        {
          "name": "Moto g73 5G",
          "note": "Stock Android, mid-range, replaceable without grief. I stopped buying flagships when I noticed the only phone property I actually care about is that losing it should be annoying rather than catastrophic."
        },
        {
          "name": "Samsung Galaxy Buds+",
          "note": "The pair I actually reach for, because they live in a pocket rather than a bag. Everything I want from earbuds is that they are already with me."
        },
        {
          "name": "Kvaesitso",
          "url": "https://kvaesitso.mm20.de/",
          "note": "A search-first launcher: I open it and type instead of hunting through a grid of icons. It replaced Lawnchair once I realised I had not deliberately looked at a home screen in months.",
          "since": "2026-02"
        },
        {
          "name": "FUTO Keyboard",
          "url": "https://keyboard.futo.org/",
          "note": "Swipe typing and voice input that run entirely on-device. Every other keyboard with gesture input wanted a network connection to do the same job."
        },
        {
          "name": "Obtainium",
          "url": "https://github.com/ImranR98/Obtainium",
          "note": "Installs and updates apps straight from their release pages. No store, no intermediary, no waiting for somebody to repackage a build that already exists."
        },
        {
          "name": "Aurora Store",
          "url": "https://auroraoss.com/",
          "note": "For the handful of apps that exist nowhere but Play. Anonymous sessions mean I can install them without a Google account attached to the device."
        },
        {
          "name": "Sunup",
          "url": "https://codeberg.org/Sunup/android",
          "note": "Push notifications with no Google Play Services anywhere in the chain. UnifiedPush is the rare open protocol that ends up simpler than the closed one it replaces: one distributor, every app that supports it, no Firebase."
        }
      ]
    },
    {
      "title": "Sync, security &amp; self-hosted",
      "blurb": "Moving to Matrix, Nextcloud and Bitwarden was an aggressive push for control, federation and the ability to audit what happens to my own data. The common thread is not ideology so much as an exit path: every one of these lets me leave with everything, which is most of why I trust them enough to stay.",
      "items": [
        {
          "name": "Nextcloud",
          "url": "https://nextcloud.com/",
          "note": "Files, calendars and contacts on hardware I control. The sync is measurably worse than the commercial options; owning the data is worth the difference to me."
        },
        {
          "name": "Syncthing",
          "url": "https://syncthing.net/",
          "note": "Device-to-device sync with no server in the middle. It is the software on this page I think about least, which is the highest praise I have for a sync tool."
        },
        {
          "name": "DAVx5",
          "url": "https://www.davx5.com/",
          "note": "The bridge that makes Nextcloud's calendars and contacts native on Android. CalDAV and CardDAV are decades-old standards that still quietly beat every proprietary equivalent."
        },
        {
          "name": "NextDNS",
          "url": "https://nextdns.io/",
          "note": "Blocking at the DNS layer covers every device and every app, not just the browser. Hosted rather than self-hosted specifically so that it follows me onto mobile data.",
          "since": "2025-07"
        },
        {
          "name": "Bitwarden",
          "url": "https://bitwarden.com/",
          "note": "Open source, auditable, and documented well enough that I could export everything and leave tomorrow. That exit path is most of the reason I have not needed to."
        },
        {
          "name": "YubiKey",
          "url": "https://www.yubico.com/",
          "note": "A second factor that cannot be phished or SIM-swapped, because it is a physical object that has to be touched. The list of services supporting it is finally long enough to matter.",
          "since": "2025-10"
        },
        {
          "name": "Aegis",
          "url": "https://getaegis.app/",
          "note": "Open source, encrypted, local-first TOTP. It replaces Authy, whose deliberate export restrictions are precisely the kind of lock-in this page exists to argue against.",
          "since": "2026-08"
        }
      ]
    },
    {
      "title": "Notes &amp; comms",
      "blurb": "Everything here stores its data locally first and syncs second, so my notes and my message history stay mine even when a service, a company or my own enthusiasm for a tool goes away.",
      "items": [
        {
          "name": "Logseq",
          "url": "https://logseq.com/",
          "note": "Local-first, plain Markdown files on disk, outliner-shaped. The files stay readable in any editor, so the worst case if the app disappears is that I lose the interface rather than the notes."
        },
        {
          "name": "Matrix &amp; Element",
          "url": "https://matrix.org/",
          "note": "An open federated protocol with a client I can swap out, which is the arrangement email got right and every proprietary messenger since has got wrong on purpose."
        },
        {
          "name": "Thunderbird",
          "url": "https://www.thunderbird.net/",
          "note": "A local mail client speaking IMAP to servers I chose, on desktop and phone alike. Mail I have downloaded is mail I still have when I am on a plane or between providers."
        }
      ]
    },
    {
      "title": "Reading &amp; listening",
      "blurb": "The one section where I have not managed to be consistent. Reading runs entirely on open standards and software I host; listening runs on Spotify, and I have made my peace with the trade by making sure the record of what I listen to is not Spotify's to keep.",
      "items": [
        {
          "name": "Miniflux",
          "url": "https://miniflux.app/",
          "note": "A minimal self-hosted RSS reader that does one job and has no opinions about what I should read next. RSS survived the death of Google Reader and every algorithmic feed built since."
        },
        {
          "name": "Readeck",
          "url": "https://readeck.org/",
          "note": "Self-hosted read-later that keeps the full article rather than a link. Roughly a third of what I save has since gone offline, which is the entire argument for it.",
          "since": "2026-01"
        },
        {
          "name": "Spotify",
          "url": "https://www.spotify.com/",
          "note": "The one walled garden I have not escaped. Everything else on this page I chose; this one chose me, through everybody I share music with."
        },
        {
          "name": "ListenBrainz",
          "url": "https://listenbrainz.org/",
          "note": "The compromise that makes Spotify tolerable: Spotify plays the music, an open archive owns the record of it. It is also what feeds the now playing widget on this site.",
          "since": "2026-08"
        }
      ]
    },
    {
      "title": "Coffee",
      "blurb": "Pulling a shot on the Bambino, or hand-grinding when there is time to spare, is a deliberately analog counterweight to everything else on this page. It is the only part of my day that cannot be automated and I would like to keep it that way.",
      "items": [
        {
          "name": "Sage Bambino",
          "url": "https://www.sageappliances.com/eu/en/products/espresso/bes450.html",
          "note": "Heats in three seconds and pulls a shot good enough that I stopped visiting the cafe downstairs on work mornings. It paid for itself in about four months."
        },
        {
          "name": "Cecotec Stellmill",
          "note": "Cheap, conical, and does most of what a grinder four times the price does. The Skerton is for when I want the ritual; this is for when I want the coffee."
        },
        {
          "name": "Hario Skerton",
          "url": "https://www.hario-usa.com/products/skerton-pro-ceramic-coffee-mill",
          "note": "A hand grinder for weekends, when the two minutes of cranking is the point rather than the cost."
        }
      ]
    }
  ],
  "retired": []
}
```

- [ ] **Step 2: Create the section include**

Create `src/_includes/uses-section.liquid`. It receives a `section` object. `note` is rendered unescaped because several notes contain inline links, exactly as `talk-card.liquid` renders trusted data from `talks.json`.

```liquid
<h3 id="{{ section.title | slugify }}">{{ section.title }}</h3>
{%- if section.blurb %}
<blockquote>
  <p>{{ section.blurb }}</p>
</blockquote>
{%- endif %}
<div class="card-grid">
  {%- for item in section.items %}
  <div class="card{% unless item.url %} card--plain{% endunless %}">
    <strong>
      {%- if item.url %}<a href="{{ item.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif -%}
    </strong>
    <p>{{ item.note }}</p>
  </div>
  {%- endfor %}
</div>
```

- [ ] **Step 3: Rewrite the page**

Replace the entire body of `src/uses.md` below the front matter. Keep `layout` and `title` untouched.

```markdown
---
layout: layout.liquid
title: Ryzokuken Uses
---

# Stuff I Use

Welcome to my `/uses` page. Inspired by folks like [Wes Bos](https://wesbos.com/uses/) and [Kent C. Dodds](https://kentcdodds.com/uses/), it is a living document of what I actually reach for. Over the years I have moved steadily toward open-source, open-protocol and privacy-respecting tools wherever they exist, and made my peace with the handful of places where they do not.

One rule governs this page: something is listed only if I use it, use it in preference to the alternatives, and can say why in a sentence or two. Anything I cannot defend that way has been cut, however popular it is.

Am I missing something you wanted to know? [Hit me up on Bluesky](https://bsky.app/profile/ryzokuken.dev). And do check out [uses.tech](https://uses.tech) for everyone else's `/uses` pages.

{% for section in uses.sections %}
{% include "uses-section.liquid", section: section %}
{% endfor %}
```

- [ ] **Step 4: Build and lint**

```bash
pnpm run build && pnpm run lint
```

Expected: build succeeds, markuplint reports no problems. If markuplint complains about `character-reference`, an ampersand in a section title or note needs to be `&amp;` — the JSON above already does this for the three affected strings.

- [ ] **Step 5: Verify in the browser**

Start the dev server with the preview tooling (`preview_start` with a `.claude/launch.json` entry running `pnpm dev` on port 8080 — create the file if absent) and open `/uses/`.

Confirm: eight `<h3>` sections in the order Desk, Dev environment, Gaming rig, Phone, Sync & security & self-hosted, Notes & comms, Reading & listening, Coffee; 42 cards total; five blockquotes; cards with no URL render without a border (`card--plain`); the inline links inside the Arch, Zsh and Matrix notes are clickable. Check light and dark mode, and 375px, 768px and 1280px widths.

- [ ] **Step 6: Commit**

```bash
git add src/_data/uses.json src/_includes/uses-section.liquid src/uses.md
git commit -m "Rebuild /uses from a data file with a rationale per entry"
```

---

### Task 2: Add the Retired section

**Files:**
- Modify: `src/_data/uses.json` (populate the `retired` array)
- Modify: `src/uses.md` (append the retired block)

**Interfaces:**
- Consumes: `uses.retired` from Task 1.
- Produces: nothing consumed by later tasks.

`.past-projects` already exists in `src/css/main.css:777` — grayscale with dashed borders, restored to colour and solid borders on `:hover` or `:focus-within`. Reuse it verbatim. Do not add CSS.

Retired means genuinely stopped using. Moshidon, Droidify and Shizuku are still installed and are simply omitted from the page; they must not appear here.

- [ ] **Step 1: Populate `retired`**

Replace `"retired": []` in `src/_data/uses.json` with:

```json
  "retired": [
    {
      "name": "Google Antigravity",
      "note": "Tried it for side projects and never formed the habit.",
      "replacedBy": "Claude Code"
    },
    {
      "name": "Super Productivity",
      "note": "Good software that lost an argument with how I actually plan my week."
    },
    {
      "name": "Bookmory",
      "note": "Logging what I read turned out to be effort I would rather spend reading."
    },
    {
      "name": "Reef",
      "note": "Blocking distractions works right up until the blocker becomes the distraction."
    },
    {
      "name": "Lawnchair",
      "note": "Served me well for years, but I stopped looking at home screens on purpose.",
      "replacedBy": "Kvaesitso"
    },
    {
      "name": "Smartspacer",
      "note": "Clever, endlessly configurable, and I configured it exactly once."
    },
    {
      "name": "Bromite",
      "note": "Abandoned upstream since December 2022 and many security releases behind. Recommending it on a page about privacy had become actively irresponsible."
    }
  ]
```

- [ ] **Step 2: Render it**

Append to `src/uses.md`, after the section loop:

```liquid
## Retired

Things that used to be on this page. Keeping them here felt more honest than quietly deleting them.

<div class="card-grid past-projects">
  {%- for item in uses.retired %}
  <div class="card">
    <strong>{{ item.name }}</strong>
    <p>{{ item.note }}{% if item.replacedBy %} Replaced by {{ item.replacedBy }}.{% endif %}</p>
  </div>
  {%- endfor %}
</div>
```

- [ ] **Step 3: Build and lint**

```bash
pnpm run build && pnpm run lint
```

Expected: both succeed.

- [ ] **Step 4: Verify in the browser**

Reload `/uses/`. Confirm seven retired cards render grayscale with dashed borders, and that hovering anywhere over the grid restores colour and solid borders across the whole group. Confirm the same in dark mode — grayscale over a dark background is the easier case to get wrong.

- [ ] **Step 5: Commit**

```bash
git add src/_data/uses.json src/uses.md
git commit -m "Add retired tools section to /uses"
```

---

### Task 3: Add the "new" badge

**Files:**
- Modify: `eleventy.config.js` (add filter)
- Modify: `src/_includes/uses-section.liquid`
- Modify: `src/css/main.css`

**Interfaces:**
- Consumes: `Item.since` (`"YYYY-MM"`) from Task 1.
- Produces: Eleventy filter `isRecent(since: string) => boolean`, true when `since` is within six months of the build date.

Computed at build time, so the badge decays automatically as the site is rebuilt. Entries with no `since`, or older than six months, render nothing.

- [ ] **Step 1: Add the filter**

In `eleventy.config.js`, after the `setTemplateFormats` call:

```js
  eleventyConfig.addFilter("isRecent", (since) => {
    const match = (since ?? "").match(/^(\d{4})-(\d{2})$/);
    if (!match) return false;
    const then = new Date(Number(match[1]), Number(match[2]) - 1, 1);
    const now = new Date();
    const months =
      (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
    return months >= 0 && months < 6;
  });
```

- [ ] **Step 2: Render the badge**

In `src/_includes/uses-section.liquid`, replace the `<strong>` block with:

```liquid
    <strong>
      {%- if item.url %}<a href="{{ item.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif -%}
      {%- assign recent = item.since | isRecent %}
      {%- if recent %} <span class="uses-badge">new</span>{% endif -%}
    </strong>
```

LiquidJS does not reliably accept a filter inside an `if` condition, which is why this assigns first.

- [ ] **Step 3: Style it**

Append to `src/css/main.css`, after the Cards block that ends at line 486:

```css
/* ========================================
   Uses Badge
   ======================================== */

.uses-badge {
  display: inline-block;
  vertical-align: middle;
  margin-left: var(--space-xs);
  padding: 0 var(--space-xs);
  border: 2px solid var(--accent);
  color: var(--accent);
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

- [ ] **Step 4: Build, lint and verify**

```bash
pnpm run build && pnpm run lint
```

Reload `/uses/`. For a build in **2026-08**, badges must appear on exactly three:

| Item | `since` | Months elapsed | Badge |
|------|---------|----------------|-------|
| Claude Cowork | `2026-04` | 4 | yes |
| Aegis | `2026-08` | 0 | yes |
| ListenBrainz | `2026-08` | 0 | yes |
| Kvaesitso | `2026-02` | 6 | **no** — boundary, `months < 6` excludes exactly six |
| Readeck | `2026-01` | 7 | no |
| YubiKey | `2025-10` | 10 | no |
| Zen | `2025-09` | 11 | no |
| NextDNS | `2025-07` | 13 | no |
| Claude Code | `2025-11` | 9 | no |
| Framework 13 | `2024-06` | 26 | no |

Kvaesitso is the case worth checking deliberately: it sits exactly on the boundary, so it proves the comparison is exclusive rather than inclusive. If a badge appears on it, the filter is using `<=` somewhere.

If the build month is not 2026-08, recompute rather than trusting this table. Confirm the accent border is legible in both themes.

- [ ] **Step 5: Commit**

```bash
git add eleventy.config.js src/_includes/uses-section.liquid src/css/main.css
git commit -m "Badge recently added tools on /uses"
```

---

### Task 4: Now Playing data layer

**Files:**
- Create: `src/js/listenbrainz.js`
- Create: `test/listenbrainz.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing.
- Produces, all exported from `src/js/listenbrainz.js`:
  - `API_BASE: string`
  - `selectListen(playingNow: object, listens: object) => { listen: object, isPlaying: boolean } | null`
  - `toTrack(listen: object) => { title: string, artist: string, release: string, listenedAt: number | null } | null`
  - `coverArtUrl(listen: object, size?: number) => string | null`
  - `streamingLinks(listen: object) => Array<{ label: string, url: string }>`
  - `relativeTime(listenedAtSeconds: number, nowMs: number) => string`

Task 5 imports all of these.

Tests live in `test/`, not colocated beside the source. `eleventy.config.js:41` passthrough-copies `src/**/*.js`, so a colocated `src/js/listenbrainz.test.js` would be published to the live site.

Two known facts about the API, both verified against `api.listenbrainz.org` on 2026-08-12:
- `playing-now` responses **never** include `listened_at`. The docs state this explicitly.
- Whether `playing-now` includes `mbid_mapping` is **undocumented and unverified**. Every function below must therefore treat cover art and streaming links as optional in both payloads. Step 7 verifies the real behaviour once live data exists.

- [ ] **Step 1: Add vitest**

```bash
pnpm add -D vitest@^4.1.10
```

Then in `package.json`, add a `test:unit` script and put it first in `test` so the fastest check fails first:

```json
    "test:unit": "vitest run",
    "test": "pnpm run test:unit && pnpm run build && pnpm run lint && pnpm run test:links",
```

- [ ] **Step 2: Write the failing tests**

Create `test/listenbrainz.test.js`:

```js
import { describe, expect, it } from "vitest";

import {
  coverArtUrl,
  relativeTime,
  selectListen,
  streamingLinks,
  toTrack,
} from "../src/js/listenbrainz.js";

const EMPTY = { payload: { count: 0, listens: [], playing_now: true } };

const NOW_PLAYING = {
  payload: {
    count: 1,
    playing_now: true,
    listens: [
      {
        playing_now: true,
        track_metadata: { artist_name: "Röyksopp", track_name: "Some Resolve" },
      },
    ],
  },
};

const RECENT = {
  payload: {
    count: 1,
    listens: [
      {
        listened_at: 1_771_414_109,
        track_metadata: {
          artist_name: "Röyksopp",
          track_name: "Some Resolve",
          release_name: "Profound Mysteries II",
          mbid_mapping: {
            caa_id: 32_916_450_708,
            caa_release_mbid: "f1418001-7f1e-46af-bfdb-95faeded8841",
            url_rels: [
              { type: "free streaming", url: "https://www.deezer.com/track/1787299817" },
              { type: "free streaming", url: "https://royksopp.bandcamp.com/track/some-resolve" },
              { type: "free streaming", url: "https://open.spotify.com/track/7H7RaiZoTNPwjNLygV4fXQ" },
            ],
          },
        },
      },
    ],
  },
};

describe("selectListen", () => {
  it("prefers a currently playing track", () => {
    expect(selectListen(NOW_PLAYING, RECENT)).toEqual({
      listen: NOW_PLAYING.payload.listens[0],
      isPlaying: true,
    });
  });

  it("falls back to the most recent listen", () => {
    expect(selectListen(EMPTY, RECENT)).toEqual({
      listen: RECENT.payload.listens[0],
      isPlaying: false,
    });
  });

  it("returns null when both payloads are empty", () => {
    expect(selectListen(EMPTY, EMPTY)).toBeNull();
  });

  it("survives malformed payloads", () => {
    expect(selectListen(undefined, undefined)).toBeNull();
    expect(selectListen({}, {})).toBeNull();
    expect(selectListen({ payload: {} }, { payload: {} })).toBeNull();
  });
});

describe("toTrack", () => {
  it("flattens a full listen", () => {
    expect(toTrack(RECENT.payload.listens[0])).toEqual({
      title: "Some Resolve",
      artist: "Röyksopp",
      release: "Profound Mysteries II",
      listenedAt: 1_771_414_109,
    });
  });

  it("reports no timestamp for a now-playing listen", () => {
    expect(toTrack(NOW_PLAYING.payload.listens[0]).listenedAt).toBeNull();
  });

  it("returns null without a track name", () => {
    expect(toTrack({ track_metadata: { artist_name: "Nobody" } })).toBeNull();
    expect(toTrack({})).toBeNull();
  });
});

describe("coverArtUrl", () => {
  it("builds a Cover Art Archive URL", () => {
    expect(coverArtUrl(RECENT.payload.listens[0])).toBe(
      "https://coverartarchive.org/release/f1418001-7f1e-46af-bfdb-95faeded8841/32916450708-250.jpg",
    );
  });

  it("returns null when the listen has no MusicBrainz mapping", () => {
    expect(coverArtUrl(NOW_PLAYING.payload.listens[0])).toBeNull();
    expect(coverArtUrl({})).toBeNull();
  });
});

describe("streamingLinks", () => {
  it("returns Spotify first, then Bandcamp", () => {
    expect(streamingLinks(RECENT.payload.listens[0])).toEqual([
      { label: "Spotify", url: "https://open.spotify.com/track/7H7RaiZoTNPwjNLygV4fXQ" },
      { label: "Bandcamp", url: "https://royksopp.bandcamp.com/track/some-resolve" },
    ]);
  });

  it("ignores services it does not know about", () => {
    const links = streamingLinks(RECENT.payload.listens[0]);
    expect(links.some((link) => link.url.includes("deezer"))).toBe(false);
  });

  it("returns an empty array when there are no relations", () => {
    expect(streamingLinks(NOW_PLAYING.payload.listens[0])).toEqual([]);
    expect(streamingLinks({})).toEqual([]);
  });
});

describe("relativeTime", () => {
  const at = 1_000_000_000;
  const after = (seconds) => relativeTime(at, (at + seconds) * 1000);

  it("collapses anything under a minute", () => {
    expect(after(0)).toBe("now");
    expect(after(59)).toBe("now");
  });

  it("steps through minutes, hours, days and weeks", () => {
    expect(after(60)).toBe("1m ago");
    expect(after(59 * 60)).toBe("59m ago");
    expect(after(60 * 60)).toBe("1h ago");
    expect(after(23 * 3600)).toBe("23h ago");
    expect(after(24 * 3600)).toBe("1d ago");
    expect(after(6 * 86_400)).toBe("6d ago");
    expect(after(7 * 86_400)).toBe("1w ago");
    expect(after(63 * 86_400)).toBe("9w ago");
  });

  it("never reports a future time", () => {
    expect(relativeTime(at, (at - 500) * 1000)).toBe("now");
  });
});
```

- [ ] **Step 3: Run the tests and watch them fail**

```bash
pnpm run test:unit
```

Expected: FAIL — cannot resolve `../src/js/listenbrainz.js`.

- [ ] **Step 4: Implement the module**

Create `src/js/listenbrainz.js`:

```js
export const API_BASE = "https://api.listenbrainz.org/1";

const LINK_PREFERENCES = [
  { label: "Spotify", host: "open.spotify.com" },
  { label: "Bandcamp", host: "bandcamp.com" },
];

const UNITS = [
  { unit: "week", seconds: 604_800 },
  { unit: "day", seconds: 86_400 },
  { unit: "hour", seconds: 3_600 },
  { unit: "minute", seconds: 60 },
];

// Pinned to "en" to match <html lang="en">; a localised timestamp inside an
// English page would be worse than a consistent one.
const RELATIVE = new Intl.RelativeTimeFormat("en", {
  numeric: "always",
  style: "narrow",
});

export function selectListen(playingNow, listens) {
  const playing = playingNow?.payload?.listens?.[0];
  if (playing) return { listen: playing, isPlaying: true };

  const previous = listens?.payload?.listens?.[0];
  if (previous) return { listen: previous, isPlaying: false };

  return null;
}

export function toTrack(listen) {
  const metadata = listen?.track_metadata;
  if (!metadata?.track_name) return null;

  return {
    title: metadata.track_name,
    artist: metadata.artist_name ?? "",
    release: metadata.release_name ?? "",
    listenedAt: listen.listened_at ?? null,
  };
}

export function coverArtUrl(listen, size = 250) {
  const mapping = listen?.track_metadata?.mbid_mapping;
  if (!mapping?.caa_release_mbid || !mapping?.caa_id) return null;

  return `https://coverartarchive.org/release/${mapping.caa_release_mbid}/${mapping.caa_id}-${size}.jpg`;
}

export function streamingLinks(listen) {
  const relations = listen?.track_metadata?.mbid_mapping?.url_rels ?? [];
  const links = [];

  for (const preference of LINK_PREFERENCES) {
    const match = relations.find(
      (relation) => typeof relation?.url === "string" && relation.url.includes(preference.host),
    );
    if (match) links.push({ label: preference.label, url: match.url });
  }

  return links;
}

export function relativeTime(listenedAtSeconds, nowMs) {
  const elapsed = Math.max(0, Math.floor(nowMs / 1000) - listenedAtSeconds);

  for (const { unit, seconds } of UNITS) {
    if (elapsed >= seconds) return RELATIVE.format(-Math.floor(elapsed / seconds), unit);
  }

  return "now";
}
```

- [ ] **Step 5: Run the tests and watch them pass**

```bash
pnpm run test:unit
```

Expected: PASS, 15 tests.

- [ ] **Step 6: Confirm the test file is not published**

```bash
pnpm run build && ls _site/js/
```

Expected: `listenbrainz.js` only. If any `.test.js` appears in `_site/`, stop and fix the passthrough configuration before continuing.

- [ ] **Step 7: Record the `mbid_mapping` question**

Once the ListenBrainz account is live and playing something, run:

```bash
curl -s "https://api.listenbrainz.org/1/user/ryzokuken/playing-now"
```

If the response contains `mbid_mapping`, now-playing tracks will show cover art and streaming links. If it does not, they will show the placeholder until the listen lands in history — which is correct behaviour either way, since every function above guards for it. No code change is required; note the finding in the commit message.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml src/js/listenbrainz.js test/listenbrainz.test.js
git commit -m "Add ListenBrainz response parsing with unit tests"
```

---

### Task 5: Now Playing widget

**Files:**
- Create: `src/js/now-playing.js`
- Modify: `src/_includes/layout.liquid`
- Modify: `src/css/main.css`

**Interfaces:**
- Consumes: every export of `src/js/listenbrainz.js` from Task 4.
- Produces: nothing consumed by later tasks.

The script picks its own mount point and density. `.recent` exists only on the home page, so finding it means "render the full variant into the strip"; not finding it means "render the compact variant into the footer". That single check implements the spec's "compact in the footer sitewide, suppressed on home" without any per-page configuration.

Nothing is inserted until data arrives, so the page is complete and correct with JavaScript disabled, and no empty space is reserved that would later collapse.

- [ ] **Step 1: Write the widget**

Create `src/js/now-playing.js`:

```js
import {
  API_BASE,
  coverArtUrl,
  relativeTime,
  selectListen,
  streamingLinks,
  toTrack,
} from "./listenbrainz.js";

const USER = "ryzokuken";
const MIN_REFETCH_MS = 30_000;

let lastFetch = 0;

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) throw new Error(`ListenBrainz returned ${response.status}`);
  return response.json();
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function artwork(listen) {
  const url = coverArtUrl(listen);
  if (!url) {
    const placeholder = element("span", "now-playing-art now-playing-art--empty", "♪");
    placeholder.setAttribute("aria-hidden", "true");
    return placeholder;
  }

  const image = element("img", "now-playing-art");
  image.src = url;
  image.alt = "";
  image.width = 64;
  image.height = 64;
  image.loading = "lazy";
  image.decoding = "async";
  // A missing or slow Cover Art Archive entry must not leave a broken image.
  image.addEventListener("error", () => image.remove());
  return image;
}

function bars() {
  const wrapper = element("span", "now-playing-bars");
  wrapper.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 3; i += 1) wrapper.append(element("i"));
  return wrapper;
}

function heading(isPlaying, track) {
  const suffix = isPlaying
    ? ""
    : ` ${track.listenedAt ? relativeTime(track.listenedAt, Date.now()) : ""}`;
  const label = element("p", "flags-label", `// ${isPlaying ? "now playing" : "last played"}${suffix}`);
  if (isPlaying) label.prepend(bars(), " ");
  return label;
}

function titleNode(track, listen) {
  const [primary] = streamingLinks(listen);
  const text = `${track.title} — ${track.artist}`;
  if (!primary) return element("span", "now-playing-title", text);

  const link = element("a", "now-playing-title", text);
  link.href = primary.url;
  link.rel = "noopener";
  return link;
}

function render(mount, variant, listen, isPlaying) {
  const track = toTrack(listen);
  if (!track) return;

  const widget = element("div", `now-playing now-playing--${variant}`);
  if (variant === "full") widget.classList.add("recent-item");

  widget.append(heading(isPlaying, track));

  const body = element("div", "now-playing-body");
  if (variant === "full") body.append(artwork(listen));

  const text = element("div", "now-playing-text");
  text.append(titleNode(track, listen));
  if (variant === "full" && track.release) {
    text.append(element("p", "now-playing-release", track.release));
  }
  body.append(text);
  widget.append(body);

  const existing = mount.querySelector(".now-playing");
  if (existing) existing.replaceWith(widget);
  else mount.append(widget);
}

async function update() {
  const now = Date.now();
  if (now - lastFetch < MIN_REFETCH_MS) return;
  lastFetch = now;

  const home = document.querySelector(".recent");
  const mount = home ?? document.querySelector("#footer");
  if (!mount) return;

  try {
    const [playingNow, listens] = await Promise.all([
      getJson(`/user/${USER}/playing-now`),
      getJson(`/user/${USER}/listens?count=1`),
    ]);

    const selected = selectListen(playingNow, listens);
    if (selected) render(mount, home ? "full" : "compact", selected.listen, selected.isPlaying);
  } catch {
    // A silent widget is better than a broken one.
  }
}

update();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") update();
});
```

- [ ] **Step 2: Load it**

In `src/_includes/layout.liquid`, immediately before the closing `</body>` tag:

```html
  <script type="module" src="/js/now-playing.js"></script>
```

`type="module"` is deferred by default, so no `defer` attribute is needed. The module is loaded on every page; it decides for itself where to render.

- [ ] **Step 3: Style it**

Append to `src/css/main.css`:

```css
/* ========================================
   Now Playing
   ======================================== */

.now-playing-body {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
}

.now-playing-text {
  min-width: 0;
}

.now-playing-title {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: 700;
  overflow-wrap: break-word;
}

.now-playing-release {
  font-size: var(--font-size-sm);
  margin: 0;
}

.now-playing-art {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-width: 2px;
  object-fit: cover;
}

.now-playing-art--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
  color: var(--text-secondary);
  font-size: var(--font-size-xl);
}

.now-playing-bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 0.7em;
  vertical-align: baseline;
}

.now-playing-bars i {
  width: 3px;
  height: 100%;
  background: var(--accent);
  transform-origin: bottom;
  animation: now-playing-bar 900ms ease-in-out infinite;
}

.now-playing-bars i:nth-child(2) {
  animation-delay: 150ms;
}

.now-playing-bars i:nth-child(3) {
  animation-delay: 300ms;
}

@keyframes now-playing-bar {
  0%,
  100% {
    transform: scaleY(0.35);
  }
  50% {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .now-playing-bars i {
    animation: none;
    transform: scaleY(0.6);
  }
}

/* Footer variant: one line, inherits the footer's inverted palette. */
#footer .now-playing {
  margin-bottom: var(--space-md);

  & .flags-label {
    color: var(--accent);
    margin-bottom: var(--space-xs);
  }

  & .now-playing-title {
    font-size: var(--font-size-base);
    color: var(--bg);
  }
}
```

The `.recent` grid must absorb a third cell without orphaning it. Replace the `grid-template-columns` declarations in `.recent` (`src/css/main.css:379`) with a single auto-fitting rule that is correct for both two and three children:

```css
.recent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}
```

- [ ] **Step 4: Build, lint and unit test**

```bash
pnpm run test:unit && pnpm run build && pnpm run lint
```

Expected: all pass.

- [ ] **Step 5: Verify against live data**

This step requires the ListenBrainz account to exist and have at least one listen. With the dev server running:

1. Open the home page. Confirm the widget appears as a third cell in the recent strip with artwork or the `♪` placeholder, and that the strip still looks deliberate at 375px, 768px and 1280px.
2. Open `/uses/`. Confirm the compact variant appears in the footer above the credits line, and that the accent bars and title are legible against the footer's inverted background.
3. Confirm the widget does **not** appear twice on the home page.
4. Check `read_console_messages` for errors, and `read_network_requests` to confirm exactly two requests to `api.listenbrainz.org` per page load.
5. Check both themes and `prefers-reduced-motion` (via `resize_window` colour scheme and browser settings) — with reduced motion the bars must be visible and still, not collapsed or invisible.

- [ ] **Step 6: Verify the failure path**

In the browser console, block the API and reload:

```js
// Confirms a dead API degrades to nothing rather than a broken widget.
window.fetch = () => Promise.reject(new Error("offline"));
```

Expected: the page renders normally with no widget, no gap where one would go, and no uncaught error in the console.

- [ ] **Step 7: Run the full suite**

```bash
pnpm test
```

Expected: unit tests, build, markuplint and linkinator all pass. linkinator will also check every URL added to `uses.json` in Tasks 1 and 2 — fix any it reports as dead.

- [ ] **Step 8: Commit**

```bash
git add src/js/now-playing.js src/_includes/layout.liquid src/css/main.css
git commit -m "Add now playing widget fed by ListenBrainz"
```

---

## Self-review notes

**Spec coverage.** Every requirement maps to a task: data model and templates → Task 1; eight sections and 42 items → Task 1; blockquote rehoming, including the §2 merge and the new §7 blurb → Task 1; required `note` → Task 1 and the Global Constraints; retired seven via `.past-projects` → Task 2; `since` badge at six months → Task 3; ListenBrainz endpoints, guarded cover art, streaming links, relative time → Task 4; playing-now-then-fallback, silence on failure, no reserved space, `visibilitychange` refetch, two densities with home suppression, bars frozen under reduced motion, not a live region → Task 5.

**Deviation from the spec.** The spec says "zero new dependencies". Task 4 adds vitest as a **devDependency**. Nothing new reaches the browser, so the spec's intent holds, but the claim as written is now inexact. Flag on review if unwanted; the pure functions would then be verified only through the browser.

**Deviation from house style.** The user's global standards colocate `*.test.ts` beside source. Tests here live in `test/` because `eleventy.config.js:41` passthrough-copies `src/**/*.js` and would publish a colocated test file to the live site. Task 4 Step 6 asserts this cannot regress.

**Known unknown.** Whether `playing-now` includes `mbid_mapping` is undocumented. All code guards for its absence; Task 4 Step 7 records the answer once live data exists. No behaviour depends on resolving it first.
