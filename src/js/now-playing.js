import {
  API_BASE,
  coverArtUrl,
  relativeTime,
  selectListen,
  streamingLinks,
  toTrack,
} from "./listenbrainz.js";

const USER = "ryzo";
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

function titleNode(track, primary) {
  const text = `${track.title} — ${track.artist}`;
  if (!primary) return element("span", "now-playing-title", text);

  const link = element("a", "now-playing-title", text);
  link.href = primary.url;
  link.rel = "noopener";
  return link;
}

function badge(track, secondary) {
  const anchor = element("a", "now-playing-link", secondary.label);
  anchor.href = secondary.url;
  anchor.rel = "noopener";
  // "Bandcamp" alone is meaningless in a screen reader's list of links.
  anchor.setAttribute("aria-label", `${track.title} on ${secondary.label}`);
  return anchor;
}

function insert(mount, variant, widget) {
  const existing = mount.querySelector(".now-playing");
  if (existing) {
    existing.replaceWith(widget);
    return;
  }

  if (variant === "compact") {
    const credits = mount.querySelector("#footer > p");
    if (credits) {
      credits.before(widget);
      return;
    }
  }

  mount.append(widget);
}

function render(mount, variant, listen, isPlaying) {
  const track = toTrack(listen);
  if (!track) return;

  const widget = element("div", `now-playing now-playing--${variant}`);
  if (variant === "full") widget.classList.add("recent-item");

  widget.append(heading(isPlaying, track));

  const body = element("div", "now-playing-body");
  if (variant === "full") body.append(artwork(listen));

  const [primary, secondary] = streamingLinks(listen);
  const text = element("div", "now-playing-text");
  text.append(titleNode(track, primary));
  if (variant === "full") {
    if (track.release) text.append(element("p", "now-playing-release", track.release));
    // The compact footer variant stays a single line, so no badge there.
    if (secondary) text.append(badge(track, secondary));
  }
  body.append(text);
  widget.append(body);

  insert(mount, variant, widget);
}

// Sequential by design: the ListenBrainz rate limit is charged to the visitor's
// IP, and a failure on one endpoint must not discard a good response from the
// other.
async function pickListen() {
  const playing = selectListen(await getJson(`/user/${USER}/playing-now`), null);
  if (playing) return playing;

  return selectListen(null, await getJson(`/user/${USER}/listens?count=1`));
}

async function update() {
  const now = Date.now();
  if (now - lastFetch < MIN_REFETCH_MS) return;
  lastFetch = now;

  const home = document.querySelector(".recent");
  const mount = home ?? document.querySelector("#footer");
  if (!mount) return;

  try {
    const selected = await pickListen();
    if (selected) render(mount, home ? "full" : "compact", selected.listen, selected.isPlaying);
  } catch {
    // A silent widget is better than a broken one.
  }
}

update();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") update();
});
