import { PAGE_MODIFIED, readableDate } from "@lib/pageDates";

export function PageUpdated({ path }: { path: string }) {
  const date = PAGE_MODIFIED[path];
  if (!date) return null;
  // text-dark/70, not /60: 14px text needs 4.5:1 against white, and /60 measured 4.39:1.
  return (
    <p className="mt-4 text-sm text-dark/70">
      Updated <time dateTime={date}>{readableDate(date)}</time>
    </p>
  );
}
