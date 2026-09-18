---
name: ryzokuken.dev
description: Personal site of Ujjwal Sharma, set as a monospace plenary record in black, bone and TC39 Orange.
colors:
  tc39-orange: "#fc7c00"
  bone: "oklch(98% 0.008 70)"
  terminal-black: "oklch(12% 0.015 50)"
  ink-secondary: "color-mix(in oklch, oklch(12% 0.015 50) 75%, oklch(98% 0.008 70))"
  bone-night: "oklch(96% 0.008 70)"
  terminal-black-night: "oklch(10% 0.015 50)"
typography:
  display:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "clamp(2.25rem, 1.55rem + 3.5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "clamp(1.75rem, 1.45rem + 1.5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "clamp(1.375rem, 1.125rem + 1.25vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.3
  subtitle:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
  body:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
  badge:
    fontFamily: "JetBrains Mono, Fira Code, Courier New, monospace"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "0.05em"
rounded:
  none: "0"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "3rem"
  2xl: "5rem"
components:
  card:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.terminal-black}"
    rounded: "{rounded.none}"
    padding: "1rem 2rem"
  talk-card:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.terminal-black}"
    rounded: "{rounded.none}"
    padding: "1rem 2rem"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.5rem"
  chip-hover:
    backgroundColor: "{colors.terminal-black}"
    textColor: "{colors.bone}"
  nav-link:
    textColor: "{colors.terminal-black}"
    padding: "0.25rem 0.5rem"
  location-tag:
    backgroundColor: "{colors.terminal-black}"
    textColor: "{colors.bone}"
    padding: "0.25rem 0.5rem"
  footer:
    backgroundColor: "{colors.terminal-black}"
    textColor: "{colors.bone}"
    padding: "3rem 2rem"
  skip-link:
    backgroundColor: "{colors.tc39-orange}"
    textColor: "{colors.bone}"
    padding: "0.5rem 1rem"
  uses-badge:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-black}"
    typography: "{typography.badge}"
    padding: "0 0.25rem"
---

# Design System: ryzokuken.dev

> **Status: incumbent, open to redesign.** This file records the system as it ships today
> (`src/css/main.css`, `src/_includes/`). It is the reference for refinements and the
> evidence for any redesign, not a mandate to preserve. PRODUCT.md marks the visual
> identity as non-binding. A redesign replaces this file; it does not patch it.

## Overview

**Creative North Star: "The Plenary Record"**

The site reads like the minutes of a working life in standards: dense, factual, bordered
entries, set in a single monospace face, ruled off by heavy lines. Every talk, podcast,
project and tool is an entry with a title, a venue, a date and its links, in a
consistent order. The one orange is the chair's gavel. It marks what is current, what
you can act on, and where you are, and nothing else.

Personality comes from typographic jokes borrowed from the shell and from source code:
a `>` prompt before the name, `[brackets]` around the current page, `//` comment labels
over small sections, `@` before an event name. The ornament is punctuation. There are no
illustrations, gradients, icons beyond the social marks, or decorative imagery.

Density is moderate to high: body copy runs large (1.25rem) with generous line height,
but pages are long, stacked lists of bordered entries with little whitespace between
them. Both color schemes are first-class; the footer always inverts against the page.

**Key Characteristics:**
- One typeface, JetBrains Mono, at three weights (400, 700, 800).
- Two warm neutrals and one accent; no other hues.
- Zero corner radius anywhere, including Mermaid diagram nodes.
- 2px rules for structure, 4px for emphasis.
- Depth only as a hard, unblurred offset shadow on hover.
- Shell and source-code punctuation as the only ornament.

## Colors

A warm two-tone of near-black and bone, swapped wholesale between light and dark, with
TC39 Orange as the single accent.

### Primary
- **TC39 Orange** (`tc39-orange`): link underlines, list markers, the `>` hero prompt,
  nav brackets, focus rings (3px outline), the podcast-card left edge, blockquote rules,
  the uses "new" badge border, the now-playing bars, and card hover shadows. It is the
  same value in both schemes. It can be text on terminal black (7.76:1), but not on bone
  (2.47:1).

### Neutral
- **Bone** (`bone`, `--bg` in light mode): page and card background. A barely-warm
  off-white (hue 70), not paper white.
- **Terminal Black** (`terminal-black`, `--text` in light mode): all text, every border
  (`--border` aliases `--text`), and the footer background. Slightly warm (hue 50).
- **Ink Secondary** (`ink-secondary`, `--text-secondary`): paragraphs, meta lines and
  `//` labels. A 75% mix of text into background, derived rather than picked, so it
  follows the scheme automatically.
- **Bone Night / Terminal Black Night** (`bone-night`, `terminal-black-night`): the dark
  scheme's text and background. Dark mode is a role swap, not a second palette: `--bg`
  and `--text` trade places at slightly adjusted lightness (96% and 10%).

### Named Rules
**The Two Tokens Rule.** Surfaces, text and borders all derive from `--bg` and `--text`.
Aliases (`--border`, `--card-bg`, `--nav-bg`, `--icon-fill`) exist for naming, not for
new values. A third neutral would break the automatic dark-mode swap.

**The Gavel Rule.** Orange marks the current, the actionable, or the focused. If an
element is none of those, it is black or bone.

## Typography

**Display Font:** JetBrains Mono (with Fira Code, Courier New, monospace)
**Body Font:** JetBrains Mono
**Label/Mono Font:** JetBrains Mono

**Character:** One monospace family does every job. Hierarchy comes from weight (800 /
700 / 400), size, and uppercase, never from a second face. Self-hosted WOFF2 files
(latin and latin-ext subsets, regular weight preloaded) come from `@fontsource`.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 1.55rem + 3.5vw, 4rem)`, line-height 1, uppercase):
  the home hero name only, prefixed with an orange `>`.
- **Headline** (800, `clamp(1.75rem, 1.45rem + 1.5vw, 2.5rem)`, 1.2, uppercase): page
  `h1`.
- **Title** (700, `clamp(1.375rem, 1.125rem + 1.25vw, 2rem)`, 1.3): section `h2`,
  underlined by a 2px rule sized to the text (`width: fit-content`).
- **Subtitle** (700, 1.5rem): `h3`, used for year headings on the talks page.
- **Body** (400, 1.25rem, 1.6): paragraphs and list items, in ink-secondary. Long-form
  posts cap at 75ch.
- **Body Small** (400, 0.875rem): card descriptions, talk meta, blog meta.
- **Label** (700, 0.875rem): `//` section labels, link chips (uppercase), year-jump
  links, theme-switcher buttons (lowercase).
- **Badge** (700, 0.6875rem, 0.05em tracking, uppercase): the uses "new" badge only.

### Named Rules
**The Case Carries Rank Rule.** Uppercase marks top-level structure (page titles, the
hero name) and actions (link chips, badges). Navigation and switcher controls are
lowercase. Section titles and body are sentence case.

**The Comment Label Rule.** Small section labels are written as code comments, `// latest
post`, `// countries visited`, in bold ink-secondary at label size.

## Layout

A single centered column (`max-width: 70rem`) with `3rem 2rem` padding, dropping to
`2rem 1rem` below 640px. The body is a full-height flex column so the footer sits at
the bottom of short pages.

- **Navigation:** sticky top bar, 4rem tall, centered links with a 2rem gap and a 2px
  bottom rule. Below 640px it becomes a 3-column grid, then 2 columns below 420px.
- **Grids:** cards use `auto-fit, minmax(280px, 1fr)`. Current projects force two
  columns from 600px. Talks and podcasts are one column, then two from 640px. The home
  "recent" strip uses `auto-fit, minmax(min(100%, 16rem), 1fr)`.
- **Spacing:** a six-step rem scale (0.25, 0.5, 1, 2, 3, 5). Gaps between cards are 2rem;
  sections open with 3rem above the `h2`.
- **Anchors:** `h2[id]` offsets its scroll target by the nav height so sticky nav never
  covers a jumped-to heading.
- **Breakpoints in use:** 320, 420, 600, 640, 820px. They are ad hoc, not a scale.

## Elevation & Depth

Flat. There is no ambient shadow, blur, or layered surface anywhere. Depth appears only
as a response to hover: a card lifts up and left by 4px, and a hard, unblurred shadow
fills the gap behind it, like a stamp or a printed offset.

### Shadow Vocabulary
- **Offset accent** (`box-shadow: 4px 4px 0 var(--accent)`, with
  `transform: translate(-4px, -4px)`): generic `.card` hover (projects, uses, blog).
- **Offset ink** (`box-shadow: 4px 4px 0 var(--text)`, same translate): `.talk-card`
  hover (talks, podcasts).

### Named Rules
**The Stamp Rule.** Shadows are solid, unblurred, offset 4px down-right, and exist only
on hover. A blurred shadow is foreign to this system.

## Shapes

Sharp rectangles everywhere (radius `0`, also held as `--radius: 0`). Mermaid diagrams
are forced to square nodes (`rx: 0`) with 2.5px strokes. Borders are the architecture:

- **2px solid** for cards, chips, nav and year-jump rules, `h2` underlines, Mermaid frames.
- **4px solid** for emphasis: images, the hero portrait, the footer's top rule,
  blockquote and podcast-card left edges.
- **Dashed** marks the past: past-project and retired cards use dashed borders and a
  full grayscale filter, both restored on hover or focus-within.

Images are framed in a 4px border and shown in grayscale until hovered. The hero portrait
and Twemoji glyphs are exempt from the grayscale.

## Components

### Buttons and Link Chips
Blunt and tactile. The system has no filled buttons. Actions are bordered chips.
- **Shape:** square, 2px terminal-black border, `0.25rem 0.5rem` padding.
- **Default:** transparent, black bold uppercase label (talk links: `video`, `slides`,
  `conf`; the now-playing link).
- **Hover:** full inversion to a black fill with bone text, 0.1s.
- **Year jump:** the same chip, not uppercase, in a row between two 2px rules, led by a
  `// year:` label.
- **Theme switcher:** borderless lowercase text buttons in the footer. Hover or
  `aria-pressed="true"` turns them orange and reveals `[ ]` brackets.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** bone (the page background, so cards read as ruled boxes, not surfaces).
- **Shadow Strategy:** flat at rest; stamp shadow on hover (see Elevation).
- **Border:** 2px terminal-black. Podcast cards add a 4px orange left edge.
- **Internal Padding:** `1rem 2rem`.
- **Plain variant:** uses entries without a URL drop the border and hover entirely.
- **Talk card anatomy:** bold title → `@ Event` in bold black → `🇪🇸 City, CC · Mon YYYY`
  in small ink-secondary → link chips pinned to the bottom.

### Links
Inline links stay black and carry a 2px orange underline, offset 4px, which thickens to
4px on hover. In the inverted footer, link text itself turns orange.

### Navigation
- Bold lowercase links at 1.25rem, no underline.
- Hover and `aria-current="page"` reveal orange `[` `]` brackets around the label; the
  text color does not change.
- Sticky, with the page background behind it and a 2px bottom rule.

### Hero
The portrait sits in a 4px black frame (180px square). Below it: the `>`-prefixed display
name, a large ink-secondary subtitle, an inverted location tag (bone on black), a list of
roles with no bullets, and social icons (2rem, black). Icons invert on hover to bone on
an orange square.

### Footer
The page's one inverted block: black background, bone text, 4px top rule. It holds the
theme switcher, the credits, and (off the home page) the now-playing line.

### Now Playing (signature)
A `// now playing` or `// last played` label, 64px square cover art in a 2px frame (or a
`♪` placeholder box), a bold track title, and three 3px orange bars that pulse at 900ms
with staggered 150ms delays. The bars stay still under reduced motion. It mounts in the
home "recent" strip, otherwise in the footer.

### Blockquote
A 4px orange left rule, italic black text at body size, and 3rem vertical margin. The
uses page uses it for section blurbs.

## Do's and Don'ts

### Do:
- **Do** derive every new surface, text and border color from `--bg` and `--text` so dark
  mode keeps working as a swap.
- **Do** keep corners at 0 and structural borders at 2px, emphasis at 4px.
- **Do** mark actions as bordered chips that invert on hover.
- **Do** use code punctuation (`>`, `//`, `[ ]`, `@`) for small labels and state instead
  of icons.
- **Do** check every change under light, dark, and each theme-switcher setting.
- **Do** honor `prefers-reduced-motion`; the global rule collapses transitions and
  animations to 0.01ms.

### Don't:
- **Don't** add a second typeface or a second accent hue.
- **Don't** use rounded corners, blurred shadows, or gradients.
- **Don't** set orange as text on bone. It is a mark, underline, edge or fill, never body
  copy on the light background.
- **Don't** add orange to an element that is not current, actionable or focused.

## Known Gaps

Found while documenting. These are candidates for refinement or a redesign.

- **Orange-on-bone contrast failures.** Orange measures 2.47:1 against bone and 7.76:1
  against terminal black. In light mode the skip link sets bone text on an orange fill.
  In dark mode the footer turns bone (2.33:1), which puts its orange links, the `theme:`
  label and the active switcher button below the bar. Both fail WCAG AA for normal text.
- **No code styling.** There are no rules for `pre`, `code`, tables, or `hr`, on a site
  whose posts discuss specs and whose look borrows from source code.
- **Duplicated chip.** `.talk-card-links a`, `.year-jump a` and `.now-playing-link`
  repeat the same chip declarations instead of sharing one.
- **`transition: all`** on cards and nav links animates properties nobody intended.
- **Ad hoc breakpoints** (320, 420, 600, 640, 820px) rather than a small shared set.
- **Global image grayscale** applies to every post image unless it is explicitly exempted.
