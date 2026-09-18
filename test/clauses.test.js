import { describe, expect, it } from "vitest";

import { numberClauses, slugify } from "../lib/clauses.js";

const page = (main, attr = ' data-clause="2"') =>
  `<nav><!--subtoc--></nav><main id="main-content"${attr}>${main}</main>`;

describe("numberClauses", () => {
  it("leaves pages without data-clause alone, dropping the TOC slot", () => {
    const html = "<nav><!--subtoc--></nav><main><h2>Hi</h2></main>";
    expect(numberClauses(html)).toBe("<nav></nav><main><h2>Hi</h2></main>");
  });

  it("numbers h1, h2 and h3 under the page clause", () => {
    const out = numberClauses(page("<h1>Talks</h1><h2>Podcasts</h2><h2>Past</h2><h3>2025</h3>"));
    expect(out).toContain('<h1><span class="secnum">2</span> Talks</h1>');
    expect(out).toContain('<a class="secnum" href="#podcasts">2.1</a> Podcasts');
    expect(out).toContain('<a class="secnum" href="#past">2.2</a> Past');
    expect(out).toContain('<a class="secnum" href="#2025">2.2.1</a> 2025');
  });

  it("restarts h3 numbering under each h2", () => {
    const out = numberClauses(page("<h2>A</h2><h3>x</h3><h2>B</h2><h3>y</h3>"));
    expect(out).toContain(">2.2.1</a> y");
  });

  it("numbers locally and skips the h1 when the clause is empty", () => {
    const out = numberClauses(page("<h1>Post</h1><h2>First</h2>", ' data-clause=""'));
    expect(out).toContain("<h1>Post</h1>");
    expect(out).toContain('href="#first">1</a> First');
  });

  it("does not number a doc-title h1", () => {
    const out = numberClauses(page('<h1 class="doc-title">Name</h1>', ' data-clause="1"'));
    expect(out).toContain('<h1 class="doc-title">Name</h1>');
  });

  it("keeps existing ids and avoids duplicate generated ones", () => {
    const out = numberClauses(page('<h2 id="upcoming">Upcoming</h2><h2>Notes</h2><h2>Notes</h2>'));
    expect(out).toContain('<h2 id="upcoming"><a class="secnum" href="#upcoming">');
    expect(out).toContain('id="notes"');
    expect(out).toContain('id="notes-2"');
  });

  it("does not collide with ids used elsewhere on the page", () => {
    const html = `<div id="flags"></div>${page("<h2>Flags</h2>")}`;
    expect(numberClauses(html)).toContain('id="flags-2"');
  });

  it("ignores an h3 before any h2", () => {
    expect(numberClauses(page("<h3>Loose</h3>"))).toContain("<h3>Loose</h3>");
  });

  it("fills the TOC slot with h2 clauses, tags stripped", () => {
    const out = numberClauses(page('<h2><a href="/x">Linked <em>post</em></a></h2>'));
    expect(out).toContain(
      '<ol class="toc-sub"><li><a href="#linked-post"><span class="toc-num">2.1</span> Linked post</a></li></ol>',
    );
  });

  it("empties the TOC slot when there are no h2 clauses", () => {
    expect(numberClauses(page("<p>none</p>"))).toContain("<nav></nav>");
  });

  it("throws when main is never closed", () => {
    expect(() => numberClauses('<main data-clause="1"><h2>x</h2>')).toThrow(/never closed/);
  });
});

describe("slugify", () => {
  it("strips accents, entities and punctuation", () => {
    expect(slugify("A Coruña &amp; Galiza!")).toBe("a-coruna-galiza");
  });

  it("falls back when nothing survives", () => {
    expect(slugify("¿?")).toBe("section");
  });
});
