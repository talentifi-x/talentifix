/** Dates of substantive edits to these pages. Never replace with the build date. */
export const PAGE_MODIFIED: Readonly<Record<string, string>> = {
  "/": "2026-11-20",
  "/about": "2026-11-18",
  "/blog": "2026-11-18",
  "/contact": "2026-11-18",
  "/join-our-network": "2026-11-18",
  "/sitemap.html": "2026-11-18",
  "/insights/talentifi-x-gcc-summit-2026": "2026-11-18",
};

export function readableDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}
