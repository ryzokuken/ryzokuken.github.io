// Marks the table-of-contents entry for the clause currently being read.
// Without this script the TOC still lists and links every clause.

const links = new Map(
  Array.from(document.querySelectorAll(".toc-sub a[href^='#']"), (link) => [
    decodeURIComponent(link.hash.slice(1)),
    link,
  ]),
);

const headings = Array.from(links.keys(), (id) => document.getElementById(id)).filter(Boolean);

function mark(id) {
  for (const [key, link] of links) {
    if (key === id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

// The current clause is the last heading whose top has scrolled past the
// reading line, so a short clause stays marked until the next one arrives.
function current() {
  const line = window.innerHeight * 0.3;
  let active = null;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= line) active = heading.id;
  }
  mark(active);
}

if (headings.length > 0) {
  const observer = new IntersectionObserver(current, { rootMargin: "0px 0px -70% 0px" });
  for (const heading of headings) observer.observe(heading);
  current();
}

// On narrow screens the contents are a disclosure over the page; following a
// link inside it should reveal the page, not leave the menu covering it. On
// wide screens the sidebar is always shown; opening the element keeps it
// visible in browsers that cannot style ::details-content.
const contents = document.querySelector(".toc-contents");
const wide = window.matchMedia("(width >= 64rem)");

if (contents) {
  const sync = () => {
    contents.open = wide.matches;
  };
  sync();
  wide.addEventListener("change", sync);
  contents.addEventListener("click", (event) => {
    if (!wide.matches && event.target instanceof Element && event.target.closest("a")) {
      contents.open = false;
    }
  });
}
