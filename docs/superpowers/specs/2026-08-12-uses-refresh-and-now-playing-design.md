# `/uses` refresh and Now Playing

**Date:** 2026-08-12
**Status:** Approved, not yet implemented

## Problem

Two problems, one theme.

`/uses` has gone stale. It recommends Bromite, abandoned since December 2022 and over a
hundred Chromium security fixes behind — on a page whose thesis is privacy. It lists tools
the author no longer runs (Antigravity, Super Productivity, Bookmory, Reef, Lawnchair,
Smartspacer) and omits ones he does (Claude Code, Kvaesitso, NextDNS, Aegis, Miniflux,
Readeck, his phone, his monitor, his headphones).

The cause is structural. `talks.md` is twenty lines of Liquid over `talks.json`; `uses.md`
is 233 lines of hand-written HTML. Adding an entry means hand-writing a `<div>`, so entries
don't get added. The page also reads as an app dump: fifteen Android utilities, each
described by what it *is* rather than why it was chosen.

Separately, the site is a static artifact. It says what its author did, never what he is
doing. Music is the first feed to change that.

## Editorial rule

An entry earns its place if the author uses it, uses it often or in preference to
alternatives, and can write a sentence or two of rationale for it.

Obscurity is not the test — a defensible rationale is. VLC was cut because "plays
everything" is a definition, not a reason. Blue Yeti and PowerShell 7 stay if a real
rationale exists for them.

This rule is enforced by the schema, not by discipline: `note` is a required field. No
rationale, no card. The page cannot rot back into a list of definitions without someone
deliberately writing an empty string.

---

## Part A — `/uses`

### Data model

New file `src/_data/uses.json`:

```json
{
  "sections": [
    {
      "title": "Desk",
      "blurb": "Optional section prose, rendered as a blockquote.",
      "items": [
        {
          "name": "Framework 13",
          "url": "https://frame.work/...",
          "note": "Required. First-person rationale, one or two sentences.",
          "since": "2024-06"
        }
      ]
    }
  ],
  "retired": [
    {
      "name": "Google Antigravity",
      "note": "Why it was dropped.",
      "replacedBy": "Claude Code"
    }
  ]
}
```

**Item fields:** `name` (required), `note` (required), `url` (optional), `since` (optional,
`"YYYY-MM"`).

`since` drives a small accent-coloured "new" badge on anything whose date is within six
months of the build date, computed at build time. Entries older than that carry the field
harmlessly.

**Retired fields:** `name` (required), `note` (required), `replacedBy` (optional).

### Templates

- New `src/_includes/uses-section.liquid` renders one section: heading, optional blurb
  blockquote, and a `.card-grid` of items.
- `src/uses.md` shrinks from 233 lines to roughly 30: intro prose, a loop over
  `uses.sections`, then the retired grid.

Follows the existing `talks.md` / `talks-list.liquid` / `talk-card.liquid` pattern exactly.

### Structure

Eight sections organised by context rather than by category, replacing the current
three-level `Work → Software → Programming` tree and its `Tools` junk drawer.

| # | Section | Items |
|---|---------|-------|
| 1 | Desk | Framework 13, ASUS TUF VG27AQ, Drop Ctrl, Blue Yeti, Sennheiser HD 4.50 BTNC |
| 2 | Dev environment | Zen, Arch + CachyOS repos, Ghostty, Zsh + oh-my-zsh + Starship, Zed, Claude Code, Claude Cowork |
| 3 | Gaming rig | Ryzen 5 2600 / GTX 1660 Ti / 32GB, Keychron V3 Max, Razer Deathadder V3, HyperX Cloud II, Windows Terminal, PowerShell 7 |
| 4 | Phone | Moto g73 5G (stock Android), Galaxy Buds+, Kvaesitso, FUTO Keyboard, Obtainium, Aurora Store, Sunup |
| 5 | Sync, security & self-hosted | Nextcloud, Syncthing, DAVx5, NextDNS, Bitwarden, YubiKey, Aegis |
| 6 | Notes & comms | Logseq, Matrix + Element, Thunderbird |
| 7 | Reading & listening | Miniflux, Readeck, Spotify, ListenBrainz |
| 8 | Coffee | Sage Bambino, Cecotec Stellmill, Hario Skerton |

42 items.

The six existing blockquotes are kept, rehomed as section blurbs:

| Blockquote | Destination |
|------------|-------------|
| "Open Web Philosophy" | §2, merged |
| "Simplicity and Speed" | §2, merged |
| "The Hybrid Approach" | §3 |
| "Ownership and Privacy" | §6 |
| "The Protocol Shift" | §5 |
| "The Analog Ritual" | §8 |

A section has at most one blurb, so the two that both describe the dev environment are
merged into a single piece of prose covering browser, distribution, editor and terminal.

§7 needs a new blurb: it has to explain the Spotify compromise, because that is what
justifies the Now Playing widget to a reader. §1 and §4 need none.

### Retired

Seven entries: Google Antigravity, Super Productivity, Bookmory, Reef, Lawnchair
(→ Kvaesitso), Smartspacer, Bromite.

Rendered with the existing `.past-projects` CSS — grayscale with dashed borders, colour and
solid borders restored on hover or focus-within. No new CSS.

Retired means genuinely stopped. Moshidon, Droidify and Shizuku are still installed and are
simply omitted from the page; they must not appear here.

Firefox is not retired. Zen is a Firefox fork, so the original entry's argument — Gecko
engine diversity — still holds, and the Zen rationale carries that nuance instead.

### Content changes

**Removed from the page:** the seven retired tools listed above, of which Bromite is a dead
project the author has replaced with nothing — he no longer reaches for a Chromium fork.
VLC is removed without being retired: he may still use it, but no rationale survives the
editorial rule. Moshidon, Droidify and Shizuku are likewise omitted rather than retired.

**Added:** Claude Code, Claude Cowork, Kvaesitso, NextDNS, YubiKey, Aegis, Miniflux,
Readeck, Spotify, ListenBrainz, Moto g73 5G, Galaxy Buds+, Sennheiser HD 4.50 BTNC,
ASUS TUF VG27AQ.

**Changed:** Firefox → Zen. Lawnchair → Kvaesitso. The unnamed electric grinder is a
Cecotec Stellmill.

**Rewritten:** every `note`. Drafts are written for review; anything whose rationale rings
hollow gets struck under the editorial rule.

Infrastructure details are deliberately omitted. Where Nextcloud and Syncthing run is not
published.

---

## Part B — Now Playing

### Data path

```
Spotify  ──▶  ListenBrainz  ──▶  browser fetch  ──▶  widget
 (plays)      (importer)        (public, CORS)
```

Spotify's own API authorises per user, which requires a client secret, which requires a
server — the reason comparable widgets run a serverless function. ListenBrainz is a public
archive rather than a private account API, which collapses that to a single `fetch`.

**Verified 2026-08-12** against `api.listenbrainz.org`:

- `GET /1/user/{user}/playing-now` and `GET /1/user/{user}/listens?count=1`
- No `Authorization` header required
- `Access-Control-Allow-Origin: *`
- `X-RateLimit-Limit: 30` per window, charged to the requesting IP — that is the visitor's
  IP, not the site's, so it does not aggregate across readers
- Payload includes `mbid_mapping.caa_release_mbid` and `caa_id` for cover art, and
  `url_rels` with streaming links per track (Spotify, Bandcamp, Tidal, Deezer)

### Behaviour

1. Request `playing-now`.
2. If nothing is playing, request the most recent listen and label it with relative time
   ("2h ago").
3. On failure or empty response, render nothing and log nothing user-visible. A dead widget
   is worse than no widget.

Client-side only. The element is absent from the served HTML and inserted on success, so
there is no layout shift and nothing is broken with JavaScript disabled.

Fetch once on load, then again on `visibilitychange` when the tab regains focus. No polling
loop.

### Design

- Cover art from Cover Art Archive, built from `caa_release_mbid` and `caa_id`. Uses the
  site's existing `img` treatment: grayscale, restored to colour on hover.
- Bordered `♪` placeholder when a track has no MusicBrainz mapping.
- Three hard-edged accent-orange bars as the playing indicator, frozen under
  `prefers-reduced-motion`.
- Not an ARIA live region. Ambient decoration must not interrupt a screen reader
  mid-sentence.
- Track title links to Spotify. A Bandcamp badge appears when `url_rels` offers one.

Two densities, one component: the full variant (art, track, artist) joins the home page
`.recent` strip as a third cell; the compact one-line variant sits in the footer on every
page except home, where it would duplicate.

### Dependencies

None. No new packages, no secrets, no serverless function, no build step, no scheduled
commits. Roughly forty lines of vanilla JavaScript.

### Prerequisites

1. Create a ListenBrainz account and link Spotify at
   `listenbrainz.org/profile/music-services/details/`.
2. Confirm the username. Implementation assumes `ryzokuken`; it lives in a single constant.

### Accepted trade-offs

- The ListenBrainz importer makes the **entire** listening history public, not only the
  track shown. This is the cost of having no server.
- Per ListenBrainz documentation, the Spotify importer and the Last.fm importer must not
  run simultaneously; doing so duplicates listens.
- Spotify does not report completed listens immediately, so `listens` can lag several
  minutes behind. `playing-now` updates promptly, which is the field the widget prefers.

---

## Non-goals

Podcast, reading-list and YouTube feeds are out of scope.

They belong to a different tier. ListenBrainz is public and unauthenticated, so it can be
read from the browser. Miniflux and Readeck are self-hosted and authenticated, so they
cannot: those feeds need build-time fetching with credentials held in GitHub Actions and a
scheduled rebuild. That is a separate spec, to be written once this one ships.

## Shipping order

Part A and Part B are independent. Ship A first.

## Verification

`pnpm test` — Eleventy build, then markuplint over `src/`, then linkinator over the built
`_site/`. Link liveness is linkinator's responsibility and is not checked by hand.

Both parts must be checked in light and dark mode, and at mobile, tablet and desktop
widths. For Part B, that includes the states where the widget renders nothing.
