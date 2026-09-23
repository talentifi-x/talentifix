import React from "react";

/**
 * Renders a JSON-LD structured-data block.
 *
 * `<` is escaped so CMS-authored content containing markup can never terminate
 * the script tag early.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
