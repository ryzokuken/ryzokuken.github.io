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
