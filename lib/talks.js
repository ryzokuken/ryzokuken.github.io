const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Tells whether a talk date in "Mon YYYY" form lies in a month before `now`.
 * The current month does not count as past: a talk later this month may not
 * have happened yet.
 *
 * @param {string} date Talk date such as "Oct 2026".
 * @param {Date} now The moment to compare against.
 * @returns {boolean} True when the whole month is over.
 */
export function isPastMonth(date, now) {
  const match = /^([A-Z][a-z]{2}) (\d{4})$/.exec(date);
  const month = match ? MONTHS.indexOf(match[1]) : -1;
  if (month === -1) {
    throw new Error(`isPastMonth: "${date}" is not a "Mon YYYY" date such as "Oct 2026"`);
  }
  const year = Number(match[2]);
  return year * 12 + month < now.getFullYear() * 12 + now.getMonth();
}
