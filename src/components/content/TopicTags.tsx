/** Short, visible subject labels; these do not create empty tag archive pages. */
export function TopicTags({ tags }: { tags: readonly string[] }) {
  if (!tags.length) return null;
  return (
    <ul aria-label="Topics" className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
          {tag}
        </li>
      ))}
    </ul>
  );
}
