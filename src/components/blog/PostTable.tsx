export interface PostTableValue {
  rows?: { cells?: string[] }[];
}

/**
 * A table from the CMS body. The first row is the header; in every other row
 * the first cell labels the row, so screen readers announce it with each value.
 * Rendered as a real <table> so search engines and AI answers can read it.
 */
export function PostTable({ value }: { value: PostTableValue }) {
  const rows = (value?.rows ?? []).map((row) => row?.cells ?? []);
  if (rows.length < 2) return null;
  const [header, ...body] = rows;

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full border-collapse text-left font-sans text-[15px] md:text-base">
        <thead className="bg-primary/5">
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 font-notch font-bold text-dark align-bottom"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className="border-t border-gray-200">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th
                    key={i}
                    scope="row"
                    className="px-4 py-3 font-semibold text-dark align-top md:whitespace-nowrap"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-dark/70 leading-relaxed align-top">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
