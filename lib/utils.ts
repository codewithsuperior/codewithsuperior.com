/** Join class names, dropping falsy branches. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2024-05" -> "May 2024". */
export function formatMonth(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "2026-08-14" -> "14 August 2026". Parsed as UTC so the date never shifts. */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/**
 * Human duration between two `YYYY-MM` values, e.g. "2 yrs 8 mos".
 *
 * `end: null` means the role is current, so it is measured against today and
 * keeps counting on its own — a current role never needs editing to stay right.
 */
export function formatDuration(start: string, end: string | null) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  const total = Math.max(0, (ey - sy) * 12 + (em - sm)) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/** "May 2024 → Present · 2 yrs 4 mos" */
export function formatRolePeriod(start: string, end: string | null) {
  const from = formatMonth(start);
  const to = end ? formatMonth(end) : "Present";
  return `${from} → ${to} · ${formatDuration(start, end)}`;
}

/** Rough reading time from a word count, at 200 wpm. */
export function readingTime(words: number) {
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** "+2349156015252" -> "2349156015252", for wa.me links. */
export function waNumber(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}
