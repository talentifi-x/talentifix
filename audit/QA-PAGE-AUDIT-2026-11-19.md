# Software Testing and QA Page Audit

19 November 2026. The new page at `/services/software-testing-qa` passes all 91 browser assertions and the content, TypeScript and production build checks. No unresolved page-specific defect was found in these checks. The existing Next.js dependency has a separate security finding described below.

This audit covers the local preview at <http://127.0.0.1:3200/services/software-testing-qa>.

## Implementation

- Pulled `origin/master` with a fast-forward from `f55a8e0` to `20213b3` before editing.
- Used the supplied `Software Testing & QA Services - TX.docx` for the 12 content sections, 10 FAQs and enquiry calls to action.
- Reused `ContentPageView`, content cards, steps, breadcrumbs, topic tags, FAQ accordion, metadata and structured-data helpers, header and footer. Brand fonts, blue and cyan colors, section spacing and responsive grids follow the existing talent pages.
- Added optional actions and service facts to the shared template so QA enquiries lead to `/contact`. Existing talent pages retain their hiring actions and candidate facts.
- Added links from Solutions and the footer. The shared content registry includes the page in the XML sitemap, HTML sitemap and `llms.txt`.
- Removed internal source-file references and drafting commentary from the public copy, normalized the brand and US spelling, and shortened the meta description to fit the existing content rules. Replaced the vague research reference with the surrounding substantive copy; no unverified research claim was added. Linked the accessibility statement to W3C sources.

## Validation results

| Check | Result |
| --- | --- |
| Content validation | All 7 registered pages passed with no errors or warnings |
| TypeScript | `pnpm exec tsc --noEmit --incremental false` passed |
| Production build | All 73 static outputs generated; final build exited successfully after retrying the existing framework security reminder |
| Browser assertions | 91 passed, 0 failed |
| Chromium widths | 320, 360, 375, 390, 414, 640, 768, 820, 1024, 1280, 1440 and 1920 pixels; no horizontal overflow |
| Firefox and WebKit widths | 390, 768 and 1440 pixels in each; no horizontal overflow |
| Runtime and resources | No JavaScript exceptions or failed local resources in the three browsers |
| Interaction | Mobile menu, collapsed contents list, section anchors below the sticky header, enquiry destinations and keyboard FAQ opening and closing passed |
| Automated accessibility | axe-core WCAG A and AA checks at 1440 and 390 pixels and with an expanded FAQ: zero violations in the page content |
| SEO | One H1, valid canonical on `www.talentifix.com`, 48-character title, 143-character description, Service, BreadcrumbList and FAQPage data; all 10 FAQs mirrored in schema |
| Discovery and destinations | Both sitemaps, `llms.txt`, Solutions, Contact, related talent pages and the generated share image returned HTTP 200; discovery pages include the new URL |
| Regression | Existing software talent page retains Start hiring and its candidate facts |
| Patch hygiene | `git diff --check` passed; generated TypeScript configuration changes removed |

Screenshots of the desktop and phone hero, coverage cards, functional and non-functional testing, delivery pipeline, quality visibility and FAQ sections were inspected. The final page retains the site's existing fixed footer fade and back-to-top treatment.

After the Quality Visibility image was replaced, Chromium loaded the new image and exposed its descriptive alt text at viewport widths of 390, 768 and 1536 pixels. Both checkout screens and the highlighted button were visible at all three widths, with no horizontal page overflow.

The closing section pairs the introduction with four labeled questions covering functionality, performance, reliability and usability. The panels sit side by side on desktop and stack on phones. The FAQ follows directly. The accessibility section contains both W3C references inline. All 91 page checks passed again. A further 68 focused checks across six widths (320 to 1536 pixels) verified the heading, reading order, text bounds and FAQ placement. Scoped axe checks at 390 and 1536 pixels found zero violations.

## Audit fixes

1. The shared contents list used blue at 50% opacity for small section numbers, producing a 3.24:1 contrast ratio. It now uses solid brand blue. The final axe runs passed.
2. FAQ buttons now identify their answer panels with `aria-controls`; answer regions reference their question buttons. Closed answers are hidden from assistive technology and inert. Keyboard opening and closing and the relationships passed in all three browsers.

The shared FAQ introduction stays 24px below the site header as the questions scroll on layouts at least 1024px wide. It releases at the end of the FAQ. All 80 scroll checks passed across the QA service and six technology talent pages, including expansion of an answer and natural scrolling in the stacked layout. Measurements are in `.audit/qa-page/faq-sidebar-results.json`.

At 768 × 689 the shared footer now gives the staffing statement its own row. The navigation, four social links and both addresses fit beneath it. All 160 footer checks passed on the QA and Solutions pages at eight widths from 320 to 1536 pixels. The results and tablet screenshot are in `.audit/qa-page/shared-footer-results.json` and `.audit/qa-page/footer-revised-768.png`.

## Performance and test scope

The page is prerendered and does not fetch CMS content at runtime. The two reused WebP photographs are 58,716 and 63,688 bytes. Quality Visibility uses a dedicated 1440 × 1080 WebP (94,566 bytes) showing a visual regression test highlighting a misaligned checkout button. The closing section also uses the existing Solutions cube artwork with empty alt text as a decorative image. The page uses `next/image` and loads section images lazily. Before the image replacement, the generated HTML measured 302,598 bytes before compression and 41,959 bytes with gzip.

These are local production checks, not field Core Web Vitals measurements or a complete screen-reader certification. Browser analytics requests were blocked during testing. WebKit's local HTTP test removed the CSP header to avoid its known `upgrade-insecure-requests` behavior on loopback; the production CSP was unchanged. Forms were not submitted.

Evidence and screenshots are in the ignored `.audit/qa-page/` folder. The browser checks are in `.audit/qa-page-audit.py`, `.audit/check-quality-section.py` and `.audit/faq-sidebar-scroll.py`. The original audit build is under `.audit/qa-build/` and the release build is under `.audit/qa-release-build/`.

## Existing framework security finding

The first release build exited with a security warning for the installed `next@16.4.2` after static generation. An advisory covering this version documents an image optimizer issue on self-hosted deployments and identifies 16.4.5 as the patch for that issue. [Next.js advisory, 3 November 2026](https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2)
