// Small display formatters (pure, tested).

// "2026-11-19" -> "Nov 19, 2026"; anything that is not a date is returned as it is.
export function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
