import { PAGE_MODIFIED, readableDate } from "@lib/pageDates";

export function PageUpdated({ path }: { path: string }) {
  const date = PAGE_MODIFIED[path];
  if (!date) return null;
  return (
    <p className="mt-4 text-sm text-dark/60">
      Updated <time dateTime={date}>{readableDate(date)}</time>
    </p>
  );
}
