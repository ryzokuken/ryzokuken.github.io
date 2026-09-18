// Numbers a page's h1 and h2 headings as sections and lists the h2s in the
// table of contents. h3s get ids but no number, so the numbering never runs
// three levels deep.
//
// Opt-in per page: only a <main> carrying data-clause is touched. The value is
// the page's own number ("2" for Talks); an empty value numbers the sections
// locally (1, 2, ...) and leaves the h1 alone, which is what blog posts use.
// An h2 with data-unnumbered (post titles on list pages) keeps its id but gets
// no number and no TOC entry, so adding a post never renumbers the others.

const MAIN_OPEN = /<main\b[^>]*\bdata-clause="([^"]*)"[^>]*>/;
const HEADING = /<h([123])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g;
const UNNUMBERED = /\sdata-unnumbered\b/;
const SUBTOC_SLOT = "<!--subtoc-->";

function stripTags(html) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function slugify(text) {
  const slug = text
    .normalize("NFKD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

function existingIds(html) {
  return new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]));
}

function uniqueId(base, taken) {
  let id = base;
  for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;
  taken.add(id);
  return id;
}

function subToc(entries) {
  if (entries.length === 0) return "";
  const items = entries
    .map(({ id, number, text }) => {
      const num = `<span class="toc-num">${number}</span>`;
      return `<li><a href="#${id}">${num} ${text}</a></li>`;
    })
    .join("");
  return `<ol class="toc-sub">${items}</ol>`;
}

/**
 * Adds clause numbers, permalink anchors and ids to the headings inside a
 * page's <main>, and fills the table-of-contents slot with its h2 clauses.
 *
 * @param {string} html Full rendered page.
 * @returns {string} The page with numbered headings; unchanged when <main>
 *   has no data-clause attribute.
 */
export function numberClauses(html) {
  const open = html.match(MAIN_OPEN);
  if (!open) return html.replace(SUBTOC_SLOT, "");

  const prefix = open[1];
  const start = open.index + open[0].length;
  const end = html.indexOf("</main>", start);
  if (end === -1) throw new Error("numberClauses: <main data-clause> is never closed");

  const taken = existingIds(html);
  const entries = [];
  let h2 = 0;

  const withId = (attrs, inner) => {
    const id = attrs.match(/\bid="([^"]+)"/)?.[1];
    if (id) return { id, attrs };
    const generated = uniqueId(slugify(stripTags(inner)), taken);
    return { id: generated, attrs: `${attrs} id="${generated}"` };
  };

  const body = html.slice(start, end).replace(HEADING, (whole, level, attrs = "", inner) => {
    if (level === "1") {
      if (prefix === "" || /\bclass="[^"]*\bdoc-title\b/.test(attrs)) return whole;
      return `<h1${attrs}><span class="secnum">${prefix}</span> ${inner}</h1>`;
    }

    const heading = withId(attrs, inner);
    if (level === "3" || UNNUMBERED.test(attrs)) {
      return `<h${level}${heading.attrs}>${inner}</h${level}>`;
    }

    h2 += 1;
    const number = prefix === "" ? `${h2}` : `${prefix}.${h2}`;
    entries.push({ id: heading.id, number, text: stripTags(inner) });
    const anchor = `<a class="secnum" href="#${heading.id}">${number}</a>`;
    return `<h2${heading.attrs}>${anchor} ${inner}</h2>`;
  });

  const numbered = html.slice(0, start) + body + html.slice(end);
  return numbered.replace(SUBTOC_SLOT, subToc(entries));
}
