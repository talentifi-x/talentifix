import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Reads published content only, so no token is required; the write-scoped
// SANITY_API_TOKEN stays confined to the upload scripts in scripts/.
//
// useCdn is off so titles, descriptions and the sitemap are read fresh: Sanity's
// CDN can serve a stale copy for a while after publishing, and that copy would
// then be cached again by ISR. The pages' own revalidate window already limits
// how often Sanity is called. Stega (visual-editing markers) stays off so no
// hidden characters leak into titles or structured data.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: false,
});
