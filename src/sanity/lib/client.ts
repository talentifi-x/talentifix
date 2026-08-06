import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Reads published content only, so no token is required. Keeping the client
// unauthenticated lets it use Sanity's CDN and confines the write-scoped
// SANITY_API_TOKEN to the upload scripts in scripts/.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
