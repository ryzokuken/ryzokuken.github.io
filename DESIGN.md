---
name: ryzokuken.dev
description: Personal site of Ujjwal Sharma, typeset as a living web specification in ink, paper and one spec blue.
colors:
  spec-blue: "oklch(50% 0.14 250)"
  blue-wash: "oklch(95.5% 0.025 250)"
  ink: "oklch(22% 0.012 260)"
  ink-secondary: "oklch(46% 0.014 260)"
  rule: "oklch(88% 0.006 260)"
  paper: "oklch(100% 0 0)"
  panel: "oklch(95.5% 0.005 260)"
  code-bg: "oklch(96.5% 0.004 260)"
  spec-blue-dark: "oklch(78% 0.1 250)"
  blue-wash-dark: "oklch(27% 0.045 250)"
  ink-dark: "oklch(93% 0.006 260)"
  ink-secondary-dark: "oklch(74% 0.012 260)"
  rule-dark: "oklch(33% 0.012 260)"
  paper-dark: "oklch(18% 0.012 260)"
  panel-dark: "oklch(22.5% 0.012 260)"
typography:
  display:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.9rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.8rem + 1.8vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Cambria, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Cambria, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body-compact:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Cambria, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  ui:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1.5
  code:
    fontFamily: "ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.86em"
    fontWeight: 400
rounded:
  none: "0"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3rem"
  2xl: "5rem"
components:
  toc-sidebar:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    width: "16.5rem"
    padding: "2rem 1.25rem 1.25rem"
  toc-link-current:
    textColor: "{colors.spec-blue}"
    typography: "{typography.ui}"
  toc-sublink-current:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.spec-blue}"
    typography: "{typography.label}"
    padding: "0.2rem 0.5rem"
  theme-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.5rem"
  theme-button-pressed:
    backgroundColor: "{colors.spec-blue}"
    textColor: "{colors.paper}"
  note-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.body-compact}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.25rem"
  table-header-cell:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.5rem 0.75rem"
  table-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-compact}"
    padding: "0.5rem 0.75rem"
  badge:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.spec-blue}"
    rounded: "{rounded.none}"
    padding: "0 0.35rem"
  year-jump-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.spec-blue}"
    typography: "{typography.label}"
    padding: "0.15rem 0.5rem"
  year-jump-link-hover:
    backgroundColor: "{colors.blue-wash}"
  skip-link:
    backgroundColor: "{colors.spec-blue}"
    textColor: "{colors.paper}"
    padding: "0.5rem 1.25rem"
---

# Design System: ryzokuken.dev

## Overview

**Creative North Star: "The Living Standard"**

The site is set as a living web specification, the way WHATWG and TC39 documents look when you read them in a browser. Every page is a numbered clause, the navigation is the spec's table of contents, and the record (talks, projects, tools) sits in captioned, numbered tables, definition entries and note panels. The person is written up as a standard: roles as numbered steps, current activity in a note, contact links as normative references. It is quiet, dense where the data is dense, and open where the prose runs long.

Two voices carry the page. Public Sans, a public-sector grotesque, speaks for structure: headings, section numbers, the TOC, captions, table headers, dates and metadata. Source Serif 4 speaks for content: body prose, table cells, entry descriptions, the subtitle. A system monospace appears only inside code. Color is almost absent: near-black ink on white paper (or its dark inversion), a cool gray rule for every line, a pale panel for notes and header rows, and one spec blue that marks links, section numbers and the current clause.

The world rejects the developer-portfolio arrangement: no hero-then-card-grid, no cards, no shadows, no rounded corners. Depth and grouping come from hairline rules, the panel tint and numbering, never from lift.

**Key Characteristics:**
- Pages are numbered clauses; h2 and h3 carry blue, linkable section numbers generated at build time.
- Sticky table-of-contents sidebar on wide screens, a "Contents" disclosure bar on narrow ones.
- Sans for structure, serif for content, mono for code only.
- One accent (spec blue); everything else is ink, secondary ink, rule and panel.
- 1px hairline rules everywhere; zero radius; zero shadow.
- Tables and figures are captioned and auto-numbered ("Table 1:", "Figure 1:").
- Full light and dark sets, switchable by preference or an explicit Auto/Light/Dark control.

## Colors

A near-monochrome cool-neutral palette with a single desaturated spec blue; the dark set inverts lightness and lifts the blue, keeping every role.

### Primary
- **Spec Blue** (`spec-blue`; `spec-blue-dark` in dark mode): every link, every section number, the current page in the TOC, the pressed theme button, the skip link, text selection, focus rings, `accent-color` and `caret-color`, the "New" badge text, the cancelled-talk asterisk, and the animated bars of the now-playing widget.
- **Blue Wash** (`blue-wash`; `blue-wash-dark`): the tint behind interactive and highlighted states. TOC hover, the current sub-clause in the TOC, year-jump hover, the badge ground, and the fading flash on a heading reached by its anchor.

### Neutral
- **Ink** (`ink`; `ink-dark`): headings, body text, figure and table caption prefixes, Mermaid node strokes.
- **Secondary Ink** (`ink-secondary`; `ink-secondary-dark`): metadata of every kind. TOC numbers, dates, captions, list markers, step numbers, venues, excerpts, the colophon, retired entries, reference keys.
- **Rule** (`rule`; `rule-dark`): every line in the system. Table borders, h2 top rules, entry and record dividers, the TOC edge, panel and image borders, unpressed buttons, the scrollbar thumb.
- **Paper** (`paper`; `paper-dark`): the page ground and the fill of buttons and Mermaid nodes.
- **Panel** (`panel`; `panel-dark`): the TOC sidebar, note panels, table header rows, Mermaid cluster fills.
- **Code Ground** (`code-bg`; dark mode reuses `panel-dark`): inline code and code blocks.

### Named Rules
**The One Blue Rule.** Spec blue is the only hue in the system. It means "this goes somewhere" or "you are here". Nothing decorative is ever blue, and no second accent is introduced.

**The Wash Is State Rule.** Blue wash appears only in response to state (hover, current location, a just-targeted heading) or on the one badge. It never becomes a resting background for a region; resting regions use panel.

**The Two Sets Rule.** Every color role exists in both the light and dark set, and components reference roles through custom properties, never literal values. Dark mode applies by `prefers-color-scheme` unless the reader pins a theme with `data-theme`.

## Typography

**Display Font:** Public Sans (self-hosted variable, 100–900), falling back to system-ui, sans-serif
**Body Font:** Source Serif 4 (self-hosted variable, 200–900, roman and italic, optical sizing on), falling back to Charter, Bitstream Charter, Cambria, serif
**Label/Mono Font:** system monospace stack (ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas), for code only

**Character:** A plain, civic sans for the document's apparatus against a warm book serif for what it says; the pairing reads as a well-kept standard, not a brand.

### Hierarchy
- **Display** (800, `--step-4` clamp 2.75–4.5rem, 0.95, -0.035em): the name in the home title block only.
- **Headline** (800, `--step-3` clamp 2.25–3rem, 1.1, -0.015em): the page h1 on every other page, prefixed with the page's clause number; post titles cap at 22ch.
- **Title** (700, `--step-2` 1.75rem, 1.2, -0.015em): h2 clauses, set under a 1px top rule with the blue number before them. Blog index entries drop to `--step-1`.
- **Subtitle** (700, `--step-1` 1.375rem, 1.3): h3 sub-clauses, such as the year headings on Talks.
- **Lede** (serif 400, `--step-1`, 1.4): the home subtitle under the name.
- **Body** (serif 400, `--step-0` 1.125rem, 1.65): prose, capped at a 68ch measure for paragraphs, list items, blockquotes and entry descriptions.
- **Body Compact** (serif 400, 1rem, 1.5–1.55): table cells, entry descriptions, note text.
- **UI** (sans 500, 0.9375rem): TOC page links, the references list, table date cells, code blocks.
- **Label** (sans 600–650, `--step--1` 0.875rem): table headers, captions, metadata lines, TOC sub-clauses, the theme control, the mobile Contents button, the colophon. Sentence case, no tracking.
- **Code** (system mono, 0.86em of its context): inline code on a code-ground tint; blocks at 0.9375rem, 1.5.

### Named Rules
**The Apparatus/Content Rule.** Sans is the document's apparatus (headings, numbers, labels, captions, dates, navigation); serif is its content (anything a reader reads as a sentence). When deciding, ask whether the text is about the page or is the page.

**The Tabular Numbers Rule.** Anything that counts or dates uses `font-variant-numeric: tabular-nums`: section numbers, TOC numbers, step counters, year links and every table.

**The Sentence Case Rule.** Labels, headers and captions are sentence case at normal tracking. The system has no uppercase, letter-spaced labels.

## Layout

The page is a two-column sheet: a 16.5rem table-of-contents column and a document column (`main`, max 62rem, padded `3rem clamp(1.25rem, 5vw, 5rem) 2rem`). The TOC is sticky, full viewport height, scrolls independently, and keeps the theme control pinned to its foot. Prose never runs wider than 68ch; tables and the title block use the full column.

Vertical rhythm comes from the seven-step space scale (2xs 0.25rem to 2xl 5rem). Clauses are separated generously (h2 has 5rem above, 1.25rem below), paragraphs by 1.25rem, and list items by 0.25rem. Records and entries use a two-column grid, label left (11rem for records and the index table, 14rem for entries), content right, divided by hairline rules with 0.75rem of vertical padding.

The home title block is a grid of text and a captioned portrait figure (11.25rem square) aligned to the baseline end. Contact references flow in an auto-fill grid of 15rem-minimum columns.

Responsive behavior:
- **Below 64rem:** the sidebar becomes a top bar (3.25rem minimum) with the brand on the left and a bordered "Contents" disclosure button with a CSS-drawn chevron on the right; the TOC and theme control open beneath it and close on link activation. Heading scroll margins grow to clear the bar.
- **Below 48rem:** the title block stacks with the portrait first (7.5rem), records and entries collapse to one column, h2 top margins drop to 3rem, and talk tables become stacked records: header row visually hidden, title across the full width, date and place beneath, links on their own line, one rule per record, no horizontal scroll.

### Named Rules
**The Clause Rule.** Structure is numbered, not decorated. A page gets a clause number in front matter (`clause:`) and the build numbers its h2/h3, makes each number a permalink, and writes the page's sub-TOC. New pages join the TOC numbering rather than inventing their own navigation.

**The Measure Rule.** Reading text stops at 68ch no matter how wide the column is.

## Elevation & Depth

The system is flat. There are no shadows anywhere. Depth is expressed only by tone and line: the panel tint sets off the TOC, notes and header rows from the paper; 1px rules separate everything else. Sticky elements (the TOC) sit on the same plane and are distinguished by their panel ground and a rule on their inner edge.

### Named Rules
**The Hairline Rule.** Every border in the system is 1px solid in the rule color, and it is the only way a region is bounded. Thicker strokes appear only as the 2px focus outline and the 2px underline on a hovered section number.

**The No-Lift Rule.** Nothing rises on hover. Interactive feedback is a color shift (underline strength, border to blue, blue-wash fill), never a shadow or transform.

## Shapes

Every corner is square (radius 0), including images, buttons, the badge, and Mermaid nodes, whose default rounding is overridden to 0. Forms are rectangles bounded by hairlines. The only non-rectangular marks are type itself, the CSS-drawn disclosure chevron and the three now-playing bars.

## Components

### Buttons
Quiet, bordered rectangles; they exist only as the theme control and the mobile Contents toggle.
- **Shape:** square corners, 1px rule border.
- **Default:** paper ground, ink text, label size, padding 0.2rem 0.5rem.
- **Hover / Focus:** border turns spec blue (0.2s, `--ease-out`); keyboard focus draws the global 2px blue outline at 3px offset.
- **Pressed:** `aria-pressed="true"` fills the button spec blue with paper text.

### Chips
- **Year jump:** a row of bordered, tabular year links under a secondary-ink "Jump to year" label. Hover turns the border blue and fills blue wash.
- **Badge ("New"):** blue text on blue wash, 0.75rem, weight 700, raised slightly from the baseline, placed after an entry name when the item is recent.

### Cards / Containers
The system has no cards. Its containers are:
- **Note panel:** panel ground, 1px rule border, padding 0.75rem 1.25rem, square. A paragraph inside a note is prefixed with a small sans "Note" label, the spec convention; a note may also hold a record list, whose outer rules are removed.
- **Code block:** code-ground tint, 1px rule border, 1.25rem padding, horizontal scroll.
- **Diagram frame (Mermaid):** 1px rule border around the figure, nodes in paper with ink strokes, clusters in panel, edges in secondary ink, dashed edges in blue, labels in Public Sans 500.

### Inputs / Fields
There are no form fields. Native controls inherit `accent-color` and `caret-color` from spec blue.

### Navigation
- **TOC sidebar:** brand ("ryzokuken.dev", bold sans) over a secondary-ink "Living Standard" line, then an ordered list of the five site clauses, each a two-column grid of tabular number and name at UI size. The current page is spec blue and bold. Hover fills blue wash.
- **Sub-TOC:** the current page's h2 clauses nest beneath it at label size in secondary ink, numbered (1.1, 1.2...). Scroll-spy marks the clause whose heading has passed 30% of the viewport with `aria-current="location"`: blue text on blue wash. Blog posts nest their own title and its clauses.
- **Mobile:** the Contents disclosure described in Layout.
- **Links:** spec blue with a 1px underline at 45% blue, offset 0.2em; the underline goes solid on hover (0.2s).

### Numbered tables
The signature container of the record. Full-width, collapsed 1px rule grid, tabular numbers, header row in panel with sans labels, cells in compact serif. Every table carries a caption auto-prefixed "Table N:" in bold ink, and figures likewise get "Figure N:". Talk rows put the date in a narrow sans column, the title in semibold over an italic secondary-ink event line, the place with its flag, and links as a small sans inline list. A talk that was not delivered carries a blue superscript asterisk, explained by a secondary-ink table note beneath the table.

### Definition entries
Used on Projects and Uses: a rule-divided list of name (sans 650, left, 14rem) and description (serif, right), with a note panel as the section blurb. Retired entries set the name in secondary ink.

### Title block and references
The home page opens like a spec's front matter: the name at display size, a serif lede, a grid of references each led by a bracketed secondary-ink key ("[GitHub]"), a meta line with place and the "Living Standard, updated <date>" status, and a captioned portrait figure.

### Steps
Ordered lists set like a spec algorithm: counters in secondary-ink sans with tabular numbers ("1."), hanging in a 2rem gutter.

### Now playing
A compact record row inside the home note: a label with three blue bars pulsing at 900ms (static under reduced motion), a serif title, an italic release line and square 3.5rem cover art with a rule border.

### Motion
One easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, at 0.2–0.3s for color and border changes and 0.25s for the chevron. A heading reached by its anchor flashes blue wash and fades over 2.4s. Reduced motion collapses all animations and transitions.

## Do's and Don'ts

### Do:
- **Do** number every new page with a `clause:` value and let the build number its headings and write its sub-TOC.
- **Do** put structured records in captioned tables or rule-divided definition entries, and asides in a note panel.
- **Do** use spec blue only for links, section numbers, current location and state; use blue wash only for hover, current location and the badge.
- **Do** set structure in Public Sans and reading text in Source Serif 4, and cap reading text at 68ch.
- **Do** bound regions with 1px rule-colored hairlines and the panel tint, in both color sets.
- **Do** use tabular numbers for anything counted or dated.
- **Do** check every change in light, dark, pinned-theme, and below 64rem and 48rem.

### Don't:
- **Don't** use cards, card grids or a hero layout; the record is tables, entries and notes.
- **Don't** add shadows, rounded corners, or hover lift.
- **Don't** introduce a second accent hue or tint regions blue at rest.
- **Don't** set prose in sans or headings in serif, and don't use monospace outside code.
- **Don't** add uppercase, letter-spaced labels above headings; a clause is introduced by its number.
- **Don't** hardcode color values in components; reference the role custom properties so both sets stay correct.
