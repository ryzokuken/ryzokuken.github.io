# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: JavaScript and web-standards peers.** Developers, implementers, and standards
participants who follow TC39, Temporal, Intl/ECMA-402, and MessageFormat work. They know
the vocabulary, read closely, and judge the site by whether it is accurate and useful.

A frequent entry path: someone lands here from one of the projects (a Temporal or
ECMA-402 repo, a spec, a slide deck, a talk video) and wants to learn more about that
project, about the person behind it, and about the related work.

Secondary audiences: event organizers vetting a speaker, potential collaborators, and
readers arriving from a shared blog post.

## Product Purpose

The personal site of Ujjwal Sharma (ryzokuken) at `www.ryzokuken.dev`. A visit succeeds
when the visitor:

- understands a project they arrived from, and finds its neighbors;
- leaves with a clear picture of the author's standards roles and track record;
- reads a post or explainer through to the end and understands it;
- gets in touch, for a speaking invite, a collaboration, or a conversation.

It is also a living record: talks, podcasts, tools in use, and what's playing now. It
shows what the author is doing now, not just past work.

## Positioning

Written from inside JavaScript governance. The author co-edits ECMA-402, champions Temporal
and has co-chaired TC39, and the site explains standards bodies and specs as someone who
runs them. The "What even is Ecma?" series is the clearest example. A neighboring
developer-advocate site could not truthfully make this claim.

## Operating Context

- Pages: home (`src/index.md`), talks and podcasts (`src/talks.md`), projects
  (`src/projects.md`), blog and tag pages (`src/blog.liquid`, `src/tag.liquid`), uses
  (`src/uses.md`), and 404. A legacy one-off page lives at `src/temporal-2020-04/`.
- Slide decks are served under `/slides/` from a separate deployment, not this repo.
- Talks, podcasts, and uses are data-driven (`src/_data/*.json`); editorial conventions
  live in CLAUDE.md.
- Blog posts are long-form Markdown and may carry Mermaid diagrams (`mermaid: true`).

## Capabilities and Constraints

- Static site: Eleventy 3 with Liquid, deployed to GitHub Pages on every push to `main`.
  No client framework; JavaScript is small, progressive, and optional.
- Client features: a theme switcher (auto/light/dark, stored in `localStorage`), a
  ListenBrainz "now playing" widget (`src/js/now-playing.js`), Twemoji on pages that set
  `flags: true`, and GoatCounter analytics.
- CSS is one hand-written file (`src/css/main.css`), bundled and minified by LightningCSS.
- Gates: markuplint, Vitest unit tests, and linkinator run from the Husky hooks and CI.
- Must work on every popular screen size and in both color schemes.
- Emoji flags must render on Windows, which lacks native flag glyphs.

## Brand Commitments

- Name: Ujjwal Sharma; handle and domain: ryzokuken / ryzokuken.dev.
- Voice: first person, candid, plain-spoken, occasionally wry. Posts explain jargon
  instead of assuming it. Pages like `/uses` state their own editorial rules and keep
  retired entries rather than quietly deleting them.
- Roles shown as fact: ECMA-402 co-editor and Temporal champion. Past roles (TC39 co-chair,
  Node.js core contributor, Electron maintainer and a former employer) sit in their own
  list on the home page.
- The visual identity is the understated web-specification look in DESIGN.md: a white
  sheet, near-black ink, one spec blue, numbered sections and hairline rules. The site
  borrows that look but never names or labels itself as a spec.

## Evidence on Hand

- 47 talks from 2018 to 2026, 6 with video links, 1 upcoming (`src/_data/talks.json`).
- 8 podcast appearances (`src/_data/podcasts.json`).
- 3 blog posts, including the two-part Ecma series (`src/blog/`).
- Current and past projects with role notes (`src/projects.md`).
- Tools and gear, each with a rationale (`src/_data/uses.json`).
- Portrait photo in several formats (`src/photo.jpg`, `src/img/`).
- There are no testimonials, endorsements, audience metrics, or press quotes. Do not
  invent them.

## Product Principles

1. **Accuracy first.** The audience knows the domain. A wrong date, title, or role costs
   more credibility than any visual flourish gains.
2. **Every entry point leads somewhere.** A visitor landing on any page, from any project,
   should reach the author and the related work in one step.
3. **Explain from the inside.** Content earns attention by making standards work
   legible, not by self-promotion.
4. **Alive, not archived.** Surface what is current (next talk, latest post, now
   playing) alongside the record.
5. **Light by default.** Static HTML, minimal JavaScript, fast on modest devices and
   slow networks.

## Accessibility & Inclusion

Everything must be usable by everyone: semantic HTML, full keyboard access with visible
focus, sufficient contrast in both color schemes, reduced-motion support, and emoji that
render on every platform.
