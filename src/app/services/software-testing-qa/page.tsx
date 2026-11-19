import { ContentPageView } from "@components/content/ContentPageView";
import { assertValidContent } from "@data/content";
import { QA_SERVICE_PAGES } from "@data/content/pages/softwareTesting";
import { contentMetadata } from "@lib/contentPage";
import { pageShareImage } from "@lib/seo";

const page = QA_SERVICE_PAGES[0];

export const metadata = contentMetadata(page, {
  image: pageShareImage(page.path, page.h1),
});

export default function SoftwareTestingPage() {
  assertValidContent();
  return <ContentPageView page={page} posts={{}} />;
}
