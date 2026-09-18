---
version: 1
slug: "src-index-md"
primary_target: "src/index.md"
related_targets: ["src/_includes/layout.liquid","src/css/main.css"]
---

## Scope

Home page (`src/index.md`), first surface of a site-wide redesign; the world then rolls across
every template. Mode: Persuade (a visitor from a project decides who this is and whether to
reach out), set in a Read register.

## Audience and job

JS and standards peers arriving from a repo, spec, deck or video: learn who this is, see the
roles and what is current, find the neighbors, get in touch.

## Direction contract

THESIS: The site is a living specification. Pages are numbered clauses, the nav is the
spec's table of contents, entries sit in captioned tables and notes. It refuses the developer
portfolio arrangement (hero, then a card grid).

OWN-WORLD: White sheet, near-black ink, one spec blue for links and the current clause, pale
note panels, sans headings led by bold section numbers, a system serif for prose, and a
system mono for code. Numbered tables have gray header rows. No cards, shadows or radius.

STORY: The visitor sees a person written up as a standard: roles as numbered steps, current
work in a note, contact as normative references. They follow any clause to its neighbor.

FIRST VIEWPORT: A sticky TOC sidebar on the left (site clauses 1–5, current one blue, theme
control at its foot). Main column: a "Living Standard · Updated <build date>" status line,
the name set large in bold sans, a serif subtitle, and a references line of contact links
directly under it (the primary action). Figure 1 (portrait, captioned) sits at right.
§1 Roles starts in view.

FORM: The Living Standard, #1 on the ordered list, seed b8271d48 (pick card).

SIGNATURE: The TOC tracks the clause in view (scroll-spy) and expands the current page's
subclauses. Section numbers are permalinks.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
