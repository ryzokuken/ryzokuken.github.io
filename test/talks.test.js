import { describe, expect, it } from "vitest";

import { isPastMonth } from "../lib/talks.js";
import talks from "../src/_data/talks.json" with { type: "json" };

describe("isPastMonth", () => {
  const now = new Date(2026, 9, 15);

  it("treats earlier months as past", () => {
    expect(isPastMonth("Sep 2026", now)).toBe(true);
    expect(isPastMonth("Dec 2025", now)).toBe(true);
  });

  it("does not treat the current or a later month as past", () => {
    expect(isPastMonth("Oct 2026", now)).toBe(false);
    expect(isPastMonth("Jan 2027", now)).toBe(false);
  });

  it("rejects dates outside the Mon YYYY convention", () => {
    expect(() => isPastMonth("October 2026", now)).toThrow(/Mon YYYY/);
    expect(() => isPastMonth("2026", now)).toThrow(/Mon YYYY/);
  });
});

describe("talks.json", () => {
  it("has no upcoming talk whose month is already over", () => {
    const now = new Date();
    const stale = talks
      .flatMap((year) => year.talks)
      .filter((talk) => talk.upcoming && isPastMonth(talk.date, now))
      .map((talk) => `${talk.title} (${talk.date})`);
    // A stale talk has happened (drop "upcoming") or fell through (drop it and
    // append "*" to mark it undelivered).
    expect(stale).toEqual([]);
  });
});
