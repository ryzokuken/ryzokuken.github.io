import { describe, expect, it } from "vitest";

import {
  coverArtUrl,
  relativeTime,
  selectListen,
  streamingLinks,
  toTrack,
} from "../src/js/listenbrainz.js";

const EMPTY = { payload: { count: 0, listens: [], playing_now: true } };

const NOW_PLAYING = {
  payload: {
    count: 1,
    playing_now: true,
    listens: [
      {
        playing_now: true,
        track_metadata: { artist_name: "Röyksopp", track_name: "Some Resolve" },
      },
    ],
  },
};

const RECENT = {
  payload: {
    count: 1,
    listens: [
      {
        listened_at: 1_771_414_109,
        track_metadata: {
          artist_name: "Röyksopp",
          track_name: "Some Resolve",
          release_name: "Profound Mysteries II",
          mbid_mapping: {
            caa_id: 32_916_450_708,
            caa_release_mbid: "f1418001-7f1e-46af-bfdb-95faeded8841",
            url_rels: [
              { type: "free streaming", url: "https://www.deezer.com/track/1787299817" },
              { type: "free streaming", url: "https://royksopp.bandcamp.com/track/some-resolve" },
              { type: "free streaming", url: "https://open.spotify.com/track/7H7RaiZoTNPwjNLygV4fXQ" },
            ],
          },
        },
      },
    ],
  },
};

describe("selectListen", () => {
  it("prefers a currently playing track", () => {
    expect(selectListen(NOW_PLAYING, RECENT)).toEqual({
      listen: NOW_PLAYING.payload.listens[0],
      isPlaying: true,
    });
  });

  it("falls back to the most recent listen", () => {
    expect(selectListen(EMPTY, RECENT)).toEqual({
      listen: RECENT.payload.listens[0],
      isPlaying: false,
    });
  });

  it("returns null when both payloads are empty", () => {
    expect(selectListen(EMPTY, EMPTY)).toBeNull();
  });

  it("survives malformed payloads", () => {
    expect(selectListen(undefined, undefined)).toBeNull();
    expect(selectListen({}, {})).toBeNull();
    expect(selectListen({ payload: {} }, { payload: {} })).toBeNull();
  });
});

describe("toTrack", () => {
  it("flattens a full listen", () => {
    expect(toTrack(RECENT.payload.listens[0])).toEqual({
      title: "Some Resolve",
      artist: "Röyksopp",
      release: "Profound Mysteries II",
      listenedAt: 1_771_414_109,
    });
  });

  it("reports no timestamp for a now-playing listen", () => {
    expect(toTrack(NOW_PLAYING.payload.listens[0]).listenedAt).toBeNull();
  });

  it("returns null without a track name", () => {
    expect(toTrack({ track_metadata: { artist_name: "Nobody" } })).toBeNull();
    expect(toTrack({})).toBeNull();
  });
});

describe("coverArtUrl", () => {
  it("builds a Cover Art Archive URL", () => {
    expect(coverArtUrl(RECENT.payload.listens[0])).toBe(
      "https://coverartarchive.org/release/f1418001-7f1e-46af-bfdb-95faeded8841/32916450708-250.jpg",
    );
  });

  it("returns null when the listen has no MusicBrainz mapping", () => {
    expect(coverArtUrl(NOW_PLAYING.payload.listens[0])).toBeNull();
    expect(coverArtUrl({})).toBeNull();
  });
});

describe("streamingLinks", () => {
  it("returns Spotify first, then Bandcamp", () => {
    expect(streamingLinks(RECENT.payload.listens[0])).toEqual([
      { label: "Spotify", url: "https://open.spotify.com/track/7H7RaiZoTNPwjNLygV4fXQ" },
      { label: "Bandcamp", url: "https://royksopp.bandcamp.com/track/some-resolve" },
    ]);
  });

  it("ignores services it does not know about", () => {
    const links = streamingLinks(RECENT.payload.listens[0]);
    expect(links.some((link) => link.url.includes("deezer"))).toBe(false);
  });

  it("returns an empty array when there are no relations", () => {
    expect(streamingLinks(NOW_PLAYING.payload.listens[0])).toEqual([]);
    expect(streamingLinks({})).toEqual([]);
  });
});

describe("relativeTime", () => {
  const at = 1_000_000_000;
  const after = (seconds) => relativeTime(at, (at + seconds) * 1000);

  it("collapses anything under a minute", () => {
    expect(after(0)).toBe("now");
    expect(after(59)).toBe("now");
  });

  it("steps through minutes, hours, days and weeks", () => {
    expect(after(60)).toBe("1m ago");
    expect(after(59 * 60)).toBe("59m ago");
    expect(after(60 * 60)).toBe("1h ago");
    expect(after(23 * 3600)).toBe("23h ago");
    expect(after(24 * 3600)).toBe("1d ago");
    expect(after(6 * 86_400)).toBe("6d ago");
    expect(after(7 * 86_400)).toBe("1w ago");
    expect(after(63 * 86_400)).toBe("9w ago");
  });

  it("never reports a future time", () => {
    expect(relativeTime(at, (at - 500) * 1000)).toBe("now");
  });
});
