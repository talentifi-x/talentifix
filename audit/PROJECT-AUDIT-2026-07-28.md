# Project Audit — TalentiFi-X

**Date:** 2026-07-28
**Auditor:** Claude Code (project-audit skill)
**Stack:** TypeScript · Next.js 16.2.3 (App Router) · React 19.2.5 · Tailwind CSS 4 · Sanity CMS 5 · Nodemailer/Brevo SMTP · pnpm
**Scope:** Code quality & bugs · Security · Dependencies & config · Architecture & docs

**Coverage note:** All 72 files under `src/` were enumerated; every API route, config file, `sanity/` module, layout, sitemap/robots, and the four form components were read in full. The larger presentational components (`CandidateRegistrationForm.tsx`, `privacy-policy/page.tsx`, `blog/[slug]/page.tsx`) were sampled by targeted grep rather than read line-by-line. Tools run: `tsc --noEmit` (fails), `pnpm audit` (120 advisories), `pnpm outdated`, `eslint` (cannot run — see C2), `npm audit` (cannot run — see C4). **No test suite exists**, so no test results are reported. Runtime/browser behaviour was not exercised; findings are static. The `.next/`, `node_modules/`, and `.audit/` directories were excluded except where a finding lives there.

---

## Executive summary

The application code is cleaner than its surroundings. There is no `dangerouslySetInnerHTML`, no `any`, no `@ts-ignore`, HTML escaping is applied consistently in every email template, and SMTP header injection is explicitly defended against. The problems are almost entirely at the edges: an unpatched framework, a build toolchain that no longer runs, and a set of configuration values that point at the wrong things.

Three items are urgent. **Next.js 16.2.3 carries eleven high-severity advisories** including SSRF and middleware-bypass, all fixed in 16.2.11 — a patch-level bump. **Every blog post declares a canonical URL on `www.talentifi-x.com`**, a domain this site does not serve, which instructs Google to drop the entire blog from the index. And **the cookie consent banner does nothing** — Google Analytics and Microsoft Clarity load unconditionally in the root layout, so a visitor who clicks "Reject" is still tracked.

Underneath those, the quality gates are silently dead. ESLint 10 cannot read the project's `.eslintrc.json`, `next lint` was removed in Next 16, `npm run audit` fails on a pnpm lockfile, and `tsc --noEmit` exits with an error on a deprecated compiler target. None of these have been failing loudly, which is why they have accumulated. The four public form endpoints also have no rate limiting or bot protection of any kind, including a 5 MB file-upload route.

**Single highest-priority action:** upgrade Next.js to ≥16.2.11 and fix the blog canonical URLs. Both are one-line changes with disproportionate impact.

---

## Scorecard

| Dimension | Critical | High | Medium | Low |
|---|---|---|---|---|
| Code quality & bugs | 0 | 2 | 5 | 3 |
| Security | 1 | 3 | 3 | 1 |
| Dependencies & config | 0 | 3 | 4 | 3 |
| Architecture & docs | 1 | 3 | 4 | 2 |
| **Total** | **2** | **11** | **16** | **9** |

**Overall health:** Sound application code sitting on an unpatched framework with dead quality gates and two misconfigurations that actively cost search traffic and privacy compliance.

---

## Top priorities

1. **[Critical] Next.js 16.2.3 has 11 high-severity advisories** — SSRF, middleware/proxy bypass, and DoS; all patched in 16.2.11. `package.json:23`
2. **[Critical] Blog canonicals point at a domain the site does not serve** — every post tells Google the real page lives on `www.talentifi-x.com`. `src/app/blog/[slug]/page.tsx:40,57`
3. **[High] Cookie consent banner is decorative** — GA and Clarity load regardless of Accept/Reject. `src/app/layout.tsx:59-81`
4. **[High] Linting has not run in some time** — ESLint 10 requires flat config; `next lint` no longer exists in Next 16. `.eslintrc.json`, `package.json:12`
5. **[High] No rate limiting or bot protection on four public POST endpoints**, one of which accepts 5 MB file uploads. `src/app/api/*/route.ts`
6. **[High] `@refinedev` sits in the build critical path with zero usage** — six packages and all three npm scripts route through a framework the code no longer imports. `package.json:8-11`
7. **[High] 113 MB of unoptimized images in `public/`**, with single files up to 8.5 MB. `public/banner-home/banner.webp`
8. **[High] `/jobs` and `/jobs/[slug]` are absent from both sitemaps.** `src/app/sitemap.ts:10-32`

---

## Findings

### A. Code quality & bugs

#### [High] Unvalidated dropdown values crash the start-hiring endpoint
- **Location:** `src/app/api/primary-client-contact/route.ts:121-122`, rendered at `:195,199`
- **Issue:** `role` and `timeline` are only checked for non-emptiness (`:100`), then used as object keys: `ROLE_LABELS[role]` and `TIMELINE_LABELS[timeline]`. Any value outside the enum yields `undefined`, which is passed to `escapeHtml()` at `:195` and `:199`. `escapeHtml` calls `.replaceAll()` on its argument with no guard, so `undefined` throws a `TypeError`.
- **Impact:** A request with `{"timeline":"soon"}` — trivially produced by any client that is not the site's own form — returns a generic 500 and, because the route's `catch` block is empty (`:305`), leaves no log. The lead is lost silently. This is the primary "Start Hiring" conversion path.
- **Fix:** Validate against the label maps before use and return 400 on a miss: `if (!(role in ROLE_LABELS) || !(timeline in TIMELINE_LABELS)) return NextResponse.json({error: "Invalid selection"}, {status: 400})`. The candidate-registration route already does this correctly with `?? fallback` at `:336-351` — mirror that pattern.

#### [High] Resume file-type validation is bypassable
- **Location:** `src/app/api/candidate-registration/route.ts:313-319`
- **Issue:** `const resumeType = resume.type || inferMimeType(resume.name);` then `if (resumeType && !ACCEPTED_MIME_TYPES.has(resumeType))`. When a client omits the multipart `Content-Type` header and the filename has an unrecognised extension, `resumeType` is the empty string and the entire check is skipped by the `resumeType &&` guard.
- **Impact:** An arbitrary file — `.exe`, `.html`, `.svg`, anything up to 5 MB — is accepted and forwarded as an email attachment to the internal recruiting inbox. The size cap at `:306` still holds, so this is not a resource issue; it is an attachment-delivery issue that puts the burden on the recipient's mail client.
- **Fix:** Invert the guard to fail closed — reject when the type cannot be determined: `if (!ACCEPTED_MIME_TYPES.has(resumeType)) return 400`. Validate the extension independently of the declared MIME type rather than as a fallback for it.

#### [Medium] Three of four API routes swallow errors with no logging
- **Location:** `src/app/api/candidate-registration/route.ts:551`, `src/app/api/job-application/route.ts:257`, `src/app/api/primary-client-contact/route.ts:305`
- **Issue:** All three end in a bare `} catch {` that returns a generic 500. The error object is never bound, so nothing reaches stdout. Only `src/app/api/contact/route.ts:197-202` logs.
- **Impact:** Every failure mode in these routes — SMTP credentials expired, Brevo quota hit, the `TypeError` in the finding above — is indistinguishable from every other, and invisible in Vercel logs. Lead loss would go unnoticed until someone reports it.
- **Fix:** Bind the error and `console.error` it, matching the contact route. Distinguish user-input failures (400) from infrastructure failures (500) so the two can be alerted on differently.

#### [Medium] No length limits on any input, client or server
- **Location:** All four routes (e.g. `src/app/api/contact/route.ts:44`); zero `maxLength` attributes across `ContactForm.tsx`, `PrimaryClientContactForm.tsx`, `ApplyModal.tsx`, `CandidateRegistrationForm.tsx`
- **Issue:** `message`, `coverNote`, `notes`, `targets`, and `topSkills` are read with `String(...).trim()` and interpolated straight into an email body with no cap. `req.json()` is likewise uncapped.
- **Impact:** A single request can push a multi-megabyte body into an SMTP message, consuming Brevo quota and potentially bouncing. Combined with the absence of rate limiting (B2), this is the cheapest available abuse vector.
- **Fix:** Cap each field server-side (e.g. 200 chars for names, 5000 for free text) and return 400 past the limit. Add matching `maxLength` on the inputs for immediate user feedback.

#### [Medium] Blog index has no offline fallback, but the sitemaps do
- **Location:** `src/app/blog/page.tsx:13-18` versus `src/app/sitemap.ts:42-48` and `src/app/sitemap.html/page.tsx:32-34`
- **Issue:** When Sanity is unreachable, `blog/page.tsx` catches and leaves `sanityPosts` as `[]`, rendering an empty grid. Both sitemaps and `blog/[slug]/page.tsx:51` fall back to the static `blogPosts` array instead.
- **Impact:** During a Sanity outage the sitemap advertises post URLs that still render correctly, while `/blog` shows an empty page with no error state. Crawlers see an index that contradicts the sitemap; users see a blog that appears to have no content.
- **Fix:** Apply the same `blogPosts` fallback in `blog/page.tsx`, or drop the fallback everywhere and render an explicit error state. The current split is the worst of both.

#### [Medium] A new SMTP transport is built and verified on every submission
- **Location:** `src/app/api/contact/route.ts:60-70`, and identically at `candidate-registration:357-367`, `job-application:110-120`, `primary-client-contact:131-141`
- **Issue:** `nodemailer.createTransport()` is called inside the request handler, followed by `await transporter.verify()` — a full connect-and-authenticate round trip — before the two `sendMail` calls that each open their own connection.
- **Impact:** Three SMTP handshakes per form submission instead of one pooled connection. On a cold serverless invocation this is the dominant latency in the request, and `verify()` adds nothing that a failing `sendMail` would not surface.
- **Fix:** Hoist a single `createTransport({pool: true, ...})` to module scope so it is reused across invocations on the same instance, and drop the `verify()` calls.

#### [Medium] Uploaded filename is used verbatim as the attachment name
- **Location:** `src/app/api/candidate-registration/route.ts:376-377`
- **Issue:** `filename: resume.name || \`resume.${fileExtension(resume.name) || "pdf"}\`` — `resume.name` is attacker-controlled and passed through unsanitized. Note also that the fallback branch calls `fileExtension(resume.name)` on the same value it just found falsy, so it can only ever produce `resume.pdf`.
- **Impact:** Filenames containing path separators, RTL override characters, or double extensions (`cv.pdf.exe`) reach the recruiter's inbox as-is. Nodemailer encodes the MIME header safely, so this is a recipient-side social-engineering risk rather than injection.
- **Fix:** Strip the filename to a basename, allow-list the characters, and force the extension to match the validated MIME type.

#### [Low] `tsc --noEmit` does not pass
- **Location:** `tsconfig.json:3`
- **Issue:** `error TS5107: Option 'target=ES5' is deprecated and will stop functioning in TypeScript 7.0.` TypeScript 6.0.2 treats this as an error, not a warning.
- **Impact:** There is no working type-check command, so type regressions cannot be caught in CI. Everything else in the codebase type-checks cleanly — this single option is the only failure.
- **Fix:** Set `"target": "ES2022"`. See C5 — the ES5 target is also costing bundle size.

#### [Low] ~700 lines of duplicated email boilerplate across four routes
- **Location:** `escapeHtml` is defined four times: `contact/route.ts:9`, `candidate-registration/route.ts:145`, `job-application/route.ts:18`, `primary-client-contact/route.ts:68`. The transport config, logo attachment block, `EMAIL_RE`, `normalizeUrl`, and the inline CSS of the auto-reply template are each duplicated 2–4 times.
- **Impact:** A fix to the escaping logic or a change to the email design has to be made in four places, and the four copies have already drifted (only one route logs errors; only two use `safeField`).
- **Fix:** Extract `src/lib/mail.ts` with a shared transporter, `escapeHtml`, and a template helper.

#### [Low] No tests
- **Location:** No test runner in `package.json:7-14`; no `*.test.*` or `*.spec.*` files in the repo.
- **Impact:** The four API routes contain the only real logic in the project — validation, label mapping, escaping — and none of it is covered. Both High findings above are the kind a single unit test per route would have caught.
- **Fix:** Add Vitest and cover the four route handlers with valid, invalid-enum, and oversized-input cases. That alone would guard the highest-risk code.

---

### B. Security

#### [Critical] Next.js 16.2.3 carries 11 high-severity advisories
- **Location:** `package.json:23`
- **Issue:** `pnpm audit` reports 11 high and 9 moderate advisories against the pinned `next@16.2.3`, including:
  - Server-Side Request Forgery in rewrites via attacker-controlled destination hostname (fixed 16.2.11)
  - Server-Side Request Forgery in Server Actions on custom servers (fixed 16.2.11)
  - Middleware / Proxy bypass via segment-prefetch routes, dynamic route parameter injection, and Turbopack single-layout apps (fixed 16.2.5 / 16.2.6 / 16.2.11)
  - Denial of Service with Server Components, and via connection exhaustion (fixed 16.2.5)
- **Impact:** The DoS vectors apply directly — this is a public marketing site with Server Components on every route. The middleware-bypass class is lower risk here because the app defines no middleware, and the SSRF vectors require rewrites or a custom server, neither of which this app uses. The DoS exposure alone justifies Critical.
- **Fix:** `pnpm add next@^16.2.11 eslint-config-next@^16.2.11`. This is a patch-level bump within 16.2.x with no migration expected. Verify the build afterwards.

#### [High] Four public POST endpoints with no rate limiting or bot protection
- **Location:** `src/app/api/contact/route.ts:25`, `candidate-registration/route.ts:197`, `job-application/route.ts:38`, `primary-client-contact/route.ts:77`
- **Issue:** No rate limiting, no CAPTCHA, no honeypot field, no origin check — a grep for `captcha|honeypot|turnstile|botid` across `src/` returns nothing. Each endpoint sends two emails per request, and `/api/candidate-registration` additionally accepts a 5 MB file upload.
- **Impact:** A single scripted client can exhaust the Brevo sending quota, silencing all legitimate lead notifications. The upload endpoint amplifies this: 5 MB in, one attachment out, per request, unauthenticated. There is also nothing to stop the auto-reply from being used to mail arbitrary third-party addresses (`:497` sends to whatever `email` the caller supplies).
- **Fix:** Add rate limiting keyed on IP — Vercel's WAF rate-limiting rules or Upstash Redis both work without code restructuring. Add Vercel BotID or a honeypot field on the forms. Consider deferring the auto-reply until after a lightweight verification step.

#### [High] Cookie consent banner has no effect on tracking
- **Location:** `src/app/layout.tsx:59-81`; `src/components/layout/CookieConsent.tsx:31-40`
- **Issue:** The GA `gtag` script (`:59-70`) is unconditional. Clarity (`:71-81`) is gated only on `NEXT_PUBLIC_CLARITY_PROJECT_ID` being set. Meanwhile `CookieConsent` writes `"accepted"` or `"rejected"` to `localStorage.cookieConsent` and nothing anywhere reads that key — a grep for `cookieConsent` outside this component returns nothing. Both scripts use `strategy="afterInteractive"`, so they fire on first paint, before the banner is even rendered.
- **Impact:** A visitor who clicks "Reject" is tracked identically to one who clicks "Accept." Under GDPR and India's DPDP Act, presenting a consent choice that does not govern behaviour is worse than presenting none — it is an affirmative misrepresentation, and the site links to its privacy policy from the banner.
- **Fix:** Move both `<Script>` tags into a client component that reads the consent key and renders them only on `"accepted"`. Use GA Consent Mode v2 (`gtag('consent', 'default', {analytics_storage: 'denied'})`) so the tag loads in a denied state and is upgraded on acceptance. Also add a way to revisit the choice, which the current banner does not offer once dismissed.

#### [High] Nodemailer 8.0.5 is vulnerable
- **Location:** `package.json:26`
- **Issue:** `GHSA` advisory: "Message-level `raw` option bypasses `disableFileAccess`/`disableUrlAccess`", affecting `<=9.0.0`, patched in `9.0.1`. The installed version is 8.0.5.
- **Impact:** The app never uses the `raw` option, so it is not directly exploitable as written. It is High because nodemailer is a direct runtime dependency handling attacker-supplied data on every form submission, and the upgrade path is available.
- **Fix:** `pnpm add nodemailer@^9.0.3` and `@types/nodemailer@^8.0.1`. Note this is a major bump — review the v9 changelog for the transport API before deploying.

#### [Medium] Sanity client uses a write-capable token for public reads
- **Location:** `src/sanity/lib/client.ts:5-11`
- **Issue:** `createClient({ useCdn: false, token: process.env.SANITY_API_TOKEN })`. The same `SANITY_API_TOKEN` is documented in `scripts/upload-job.mjs:10` as needing "write/editor access" — it is the deploy token, reused for page rendering. All content read through it (`queries.ts`) is published, public blog and job data.
- **Impact:** A write-scoped credential is loaded into every server render of the site, widening the blast radius of any server-side disclosure well beyond what the read path needs. Separately, `useCdn: false` plus a token means every render bypasses Sanity's CDN, adding latency and API quota cost for content that is entirely public. (Drafts are *not* exposed — `@sanity/client@7.21.0` defaults to the `published` perspective.)
- **Fix:** Drop `token` from `src/sanity/lib/client.ts` entirely and set `useCdn: true`; published content needs no authentication. Keep the write token confined to `scripts/`.

#### [Medium] No Content-Security-Policy
- **Location:** `next.config.mjs:16-28`
- **Issue:** Four headers are set — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` — which is a good baseline. There is no `Content-Security-Policy`, and no `Strict-Transport-Security` (usually supplied by the host on Vercel-managed domains, so lower concern).
- **Impact:** No defence-in-depth against injected script. The exposure is genuinely low here — the app renders no untrusted HTML and has no `dangerouslySetInnerHTML` anywhere — but the site loads third-party script from googletagmanager.com and clarity.ms, which a CSP would pin.
- **Fix:** Add a CSP allowing `'self'`, `*.googletagmanager.com`, `*.clarity.ms`, and `cdn.sanity.io`. The inline GA/Clarity snippets will need a nonce or `'unsafe-inline'`; start in `Content-Security-Policy-Report-Only` to find breakage before enforcing. Note `/studio` will need looser rules.

#### [Medium] SMTP connects without requiring TLS
- **Location:** `src/app/api/contact/route.ts:63`, and identically in the other three routes
- **Issue:** `secure: false` on port 587. Nodemailer will opportunistically STARTTLS, but without `requireTLS: true` it will silently continue in plaintext if the server does not offer the upgrade.
- **Impact:** SMTP credentials and full form contents — including resumes and salary expectations — would transit unencrypted under a downgrade. Brevo does offer STARTTLS, so this is a hardening gap rather than an active exposure.
- **Fix:** Add `requireTLS: true` to the transport config (or switch to `secure: true` on port 465).

#### [Low] `.audit/` artifacts are neither tracked nor ignored
- **Location:** `.audit/` (2.3 MB, untracked); `.gitignore` has no entry for it
- **Issue:** The directory holds `dev-home.html` (293 KB of rendered page output), two Lighthouse JSON dumps, and several build/dev server logs from the June audit. Nothing excludes them from a future `git add -A`.
- **Impact:** Rendered-page and server-log artifacts are exactly the kind of file that carries environment detail into a repo by accident.
- **Fix:** Add `.audit/` to `.gitignore` — and `audit/` if these generated reports should not be versioned either.

---

### C. Dependencies & config

#### [High] `@refinedev` is in the build critical path with zero usage
- **Location:** `package.json:8-11,15-18`; a grep for `@refinedev` across `src/` returns **no matches**
- **Issue:** Six Refine packages remain as dependencies (`@refinedev/cli`, `core`, `devtools`, `kbar`, `nextjs-router`, `simple-rest`) and all three lifecycle scripts run through the Refine CLI: `"dev": "... refine dev"`, `"build": "refine build"`, `"start": "refine start"`. Commit `0c9e393` removed the Refine wrapper from the app; commit `0c1e1e8` restored the dependencies "so Vercel build passes" — i.e. the scripts were never migrated back.
- **Impact:** Every production build shells through a CLI wrapper for a framework the application does not use, and six unused packages sit in the dependency tree pulling transitive vulnerabilities (`@refinedev/cli` is the path by which `axios`, `tar`, and `adm-zip` — 13 high advisories between them — enter this project at all). The build is coupled to a package that has no reason to be here.
- **Fix:** Change the scripts to `next dev` / `next build` / `next start`, remove all six `@refinedev/*` dependencies and the `refine` block at `package.json:32-34`, then reinstall and verify the Vercel build. This is the single highest-leverage dependency cleanup available.

#### [High] Linting cannot run at all
- **Location:** `.eslintrc.json`; `package.json:12`
- **Issue:** Two independent breakages. (1) `npm run lint` invokes `next lint`, which was removed in Next.js 16 — the command is now interpreted as a directory argument and fails with `Invalid project directory provided, no such directory: ...\lint`. (2) Running ESLint directly also fails: `ESLint couldn't find an eslint.config.(js|mjs|cjs) file` — ESLint 10.2.0 requires flat config, and the project only has the legacy `.eslintrc.json`.
- **Impact:** There is no working lint command. Combined with A8 (`tsc --noEmit` also failing), **the project currently has no functioning static analysis at all** — which is the underlying reason several findings in this report went unnoticed.
- **Fix:** Migrate to flat config — create `eslint.config.mjs` exporting `next/core-web-vitals` via `FlatCompat`, delete `.eslintrc.json`, and change the script to `"lint": "eslint ."`. Then run it and triage the backlog.

#### [High] 120 advisories in the dependency tree — 1 critical, 50 high
- **Location:** `pnpm-lock.yaml`; full output in the Appendix
- **Issue:** `pnpm audit` reports 1 critical, 50 high, 55 moderate, 14 low. The critical is `tar` (node-tar decompression/parse DoS, `<=7.5.18`, patched `7.5.19`). The high count is concentrated in `next` (11 — see B1), `axios` (11), `undici` (4), `fast-uri` (4), `brace-expansion` (4), plus `postcss` (2, direct dev dependency at 8.5.9 vs patched 8.5.18), `sharp`, `form-data`, and `nodemailer` (B4).
- **Impact:** Most of the transitive count reaches the project through `sanity`/`@sanity/cli` and `@refinedev/cli` and is build-time only — real, but not runtime-exploitable by a site visitor. The runtime-facing subset is what matters: `next`, `nodemailer`, `postcss`, `undici`, `sharp`.
- **Fix:** In order — bump `next` (B1), `nodemailer` (B4), and `postcss`. Then remove `@refinedev/*` (C1), which eliminates a large share of the transitive count outright. Re-run `pnpm audit` and re-triage what remains.

#### [Medium] `npm run audit` is broken
- **Location:** `package.json:13`
- **Issue:** The script runs `npm audit`, but the project uses pnpm and ships only `pnpm-lock.yaml`. Result: `npm error code ENOLOCK — This command requires an existing lockfile.`
- **Impact:** Anyone running the project's own audit command gets an error rather than the 120 advisories above. A vulnerability check that fails closed-but-silent is worse than none.
- **Fix:** `"audit": "pnpm audit"`.

#### [Medium] TypeScript target is ES5
- **Location:** `tsconfig.json:3`
- **Issue:** `"target": "es5"` on a Next.js 16 / React 19 project whose `engines` field requires Node ≥20.
- **Impact:** Two costs. It breaks the type-check outright (A8), and it forces downlevel emit — generators, async/await, class fields, and spread all compile to ES5 helpers, inflating the client bundle for browsers that have supported these natively for years. Next.js sets its own browser targets for the final build, so the practical bundle impact is limited, but the setting is wrong either way.
- **Fix:** `"target": "ES2022"`.

#### [Medium] Dockerfile is stale and would not build
- **Location:** `Dockerfile:1,17,25-28`
- **Issue:** Base image is `refinedev/node:18` while `package.json:5` declares `"node": ">=20"`. Paths reference `/app/refine/node_modules`, `/app/refine/public`, and `/app/refine/.next` from the Refine scaffold. The dependency step installs pnpm via `yarn global add pnpm`. `RUN npm run build` then invokes the Refine CLI (C1).
- **Impact:** The container build is broken against the current project layout. If deployment is Vercel-only this file is simply dead weight; if it is a documented fallback, that fallback does not work.
- **Fix:** Either delete it, or rewrite against `node:22-alpine` with correct paths and a `corepack enable pnpm` install step. `output: "standalone"` is already set in `next.config.mjs:7`, so the standalone copy pattern is sound once the paths are fixed.

#### [Medium] `SANITY_WEBHOOK_SECRET` is documented, configured, and unused
- **Location:** `.env.example:17-18`; also set in `.env.local`; a grep for `SANITY_WEBHOOK_SECRET`, `revalidateTag`, and `revalidatePath` across `src/` returns **no matches**
- **Issue:** The env var exists for "Sanity webhook secret for ISR revalidation," but there is no revalidation route and no tag-based caching. Content freshness relies entirely on `export const revalidate = 60` polling in `blog/page.tsx:10`, `blog/[slug]/page.tsx:30`, `jobs/[slug]/page.tsx:18`, and `sitemap.html/page.tsx:10`.
- **Impact:** Dead configuration that implies a capability the app does not have. Editors publishing in Sanity wait up to 60 seconds with no way to force a refresh, and the documented mechanism for doing so does not exist.
- **Fix:** Either build the webhook route (`/api/revalidate` verifying the secret, then `revalidateTag`) or remove the variable from `.env.example` and `.env.local`.

#### [Low] `studio` script contradicts the codebase
- **Location:** `package.json:13`
- **Issue:** `"studio": "echo 'Sanity studio removed - reinstall to use'"` — but `sanity@5.20.0` is installed, `sanity.config.ts` exists, and the Studio is mounted at `src/app/studio/[[...tool]]/page.tsx`.
- **Impact:** A new contributor reading `package.json` concludes the Studio is gone. It is live at `/studio`.
- **Fix:** Restore `"studio": "sanity dev"` or delete the script.

#### [Low] pnpm settings block is ignored by the installed pnpm
- **Location:** `package.json:32-34`
- **Issue:** `pnpm outdated` warns: `The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.onlyBuiltDependencies".`
- **Impact:** `esbuild`, `sharp`, and `unrs-resolver` are no longer explicitly permitted to run build scripts, so install behaviour depends on pnpm's defaults rather than on intent.
- **Fix:** Move the setting to `pnpm-workspace.yaml` per the linked pnpm docs.

#### [Low] `legacy-peer-deps=true` masks peer conflicts
- **Location:** `.npmrc:1-2`
- **Issue:** Both `legacy-peer-deps=true` and `strict-peer-dependencies=false` are set. `npm` also warns that `strict-peer-dependencies` is an unknown npm config and will stop working.
- **Impact:** Genuine peer incompatibilities install silently. With React 19, Next 16, and Sanity 5 in one tree, that is exactly where a real conflict would surface.
- **Fix:** Remove both, attempt a clean install, and fix whatever surfaces. If something genuinely requires an override, use pnpm `overrides` so the exception is explicit and scoped.

---

### D. Architecture & docs

#### [Critical] Every blog post declares a canonical URL on the wrong domain
- **Location:** `src/app/blog/[slug]/page.tsx:40` and `:57`
- **Issue:** `alternates: { canonical: \`https://www.talentifi-x.com/blog/${slug}\` }` — hardcoded on both the Sanity and static-fallback branches. The site is served from `talentifix.com` (`NEXT_PUBLIC_SITE_URL` in `.env.local`), and `robots.ts:5`, `sitemap.ts:7`, and `sitemap.html/page.tsx:25` all use that value. `www.talentifi-x.com` (with the hyphen) is a different hostname.
- **Impact:** A canonical tag is a directive: it tells Google the authoritative copy of this page lives elsewhere. Every blog post on the site is currently pointing at a hostname the site does not serve, while the sitemap simultaneously submits the `talentifix.com` URLs. The likely outcome is that the entire blog is dropped from the index — which would also nullify the nine blog upload scripts in `scripts/`.
- **Fix:** Derive the canonical from the same base URL everything else uses: `` canonical: `${baseUrl}/blog/${slug}` `` with `baseUrl` from `NEXT_PUBLIC_SITE_URL`. Better, set `metadataBase` once in the root layout (D5) and use the relative path `/blog/${slug}`. Then request re-indexing in Search Console.

#### [High] README is the unmodified Refine scaffold
- **Location:** `README.MD:1-40`
- **Issue:** The README describes Refine — "A React Framework for building internal tools, admin panels, dashboards & B2B apps" — for a project that imports nothing from Refine (C1). It documents `npm run dev/build/start` and links to Refine's docs. It does not mention Next.js, Sanity, the Studio at `/studio`, the four API routes, Brevo SMTP, **any** of the twelve environment variables the app requires, the deployment target, or the content-upload scripts.
- **Impact:** The project will not start from a fresh clone by following its own README — `src/sanity/env.ts:4-12` throws on a missing `NEXT_PUBLIC_SANITY_DATASET` or `NEXT_PUBLIC_SANITY_PROJECT_ID`, and nothing tells a new developer those exist. `.env.example` is good and complete; the README never points at it.
- **Fix:** Rewrite: stack summary, prerequisites, `cp .env.example .env.local` with a note on where each credential comes from, the dev/build/deploy commands, an architecture paragraph covering Sanity content flow and the four form endpoints, and a section on the `scripts/` uploaders.

#### [High] Job pages are missing from both sitemaps
- **Location:** `src/app/sitemap.ts:10-32`; `src/app/sitemap.html/page.tsx:12-21`
- **Issue:** `staticRoutes` covers `/`, `/about`, `/solutions`, `/blog`, `/contact`, `/start-hiring`, `/join-our-network`, `/privacy-policy`, `/sitemap.html`, plus dynamic blog slugs. Neither `/jobs` nor any `/jobs/[slug]` appears — despite `getAllSanityJobSlugs()` already existing in `queries.ts:99` for exactly this purpose, and being used by `generateStaticParams` at `jobs/[slug]/page.tsx:24`.
- **Impact:** Every job listing is invisible to search engines except through internal links. For a recruitment company these are the highest-intent landing pages on the site, and job-seeker traffic is overwhelmingly search-driven.
- **Fix:** Add `/jobs` to `staticRoutes` and map `getAllSanityJobSlugs()` into the sitemap alongside the blog slugs, mirroring lines 34-49. Do the same in `sitemap.html/page.tsx`. Consider adding `JobPosting` structured data to `jobs/[slug]/page.tsx` for Google Jobs eligibility.

#### [High] 113 MB of unoptimized images in `public/`
- **Location:** `public/` — largest offenders: `banner-home/banner.webp` (8.5 MB), `banner-home/Next.webp` (7.9 MB), `assets/contact/contact-form-bg.png` (7.9 MB), `blogs/b2.png` (7.4 MB), `banner-home/solution.webp` (7.3 MB), `assets/Solutions/perm-placement-bg.png` (7.3 MB), `blogs/b1.png` (6.9 MB)
- **Issue:** 64 MB in `assets/`, 27 MB in `banner-home/`, 21 MB in `blogs/`. Twenty files exceed 300 KB; several exceed 7 MB. All are committed to git. Note that `blogs/b1.png` (6.9 MB) is the default blog card image at `blog/page.tsx:34` — it appears on every card lacking a Sanity image.
- **Impact:** `next/image` optimizes these at request time, so end users are not served the raw files, but the cost is real regardless: repository weight, deploy artifact size, slower builds, and on first request per size variant Vercel's optimizer must fetch and process a multi-megabyte source. The git history is now permanently carrying them.
- **Fix:** Re-encode the source images to a sane ceiling — 200-400 KB at 2× the largest rendered size — before they enter the repo. Anything genuinely large should move to Sanity's asset CDN, which is already a configured remote pattern (`next.config.mjs:10`). Also note `qualities: [100, 75]` at `next.config.mjs:11` permits quality-100 requests; 75 is almost always sufficient.

#### [Medium] No `metadataBase`, and no OG image site-wide
- **Location:** `src/app/layout.tsx:12-31`
- **Issue:** The root `metadata` sets `openGraph.siteName`, `type`, and `locale`, and `twitter.card: "summary_large_image"` — but never `metadataBase`, and never an `images` entry. A grep for `metadataBase` across `src/` returns nothing.
- **Impact:** Without `metadataBase`, Next.js cannot resolve relative OG/Twitter image URLs into absolute ones and warns at build time. And because no default OG image is defined anywhere, every page shared to LinkedIn, WhatsApp, or Slack renders with no preview image — while declaring `summary_large_image`, which promises one. For a recruitment brand whose distribution is largely LinkedIn, this is a visible cost on every share.
- **Fix:** Add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentifix.com")` and a default `openGraph.images` entry pointing at a 1200×630 asset.

#### [Medium] The site does not agree with itself on its own domain
- **Location:** `src/app/blog/[slug]/page.tsx:40,57` (`www.talentifi-x.com`) · `src/app/jobs/[slug]/page.tsx:203-206` (`https://talentifi-x.com`) · `src/app/jobs/page.tsx:48-51` and `jobs/[slug]/page.tsx:67` and `sanity/schemaTypes/job.ts:62` (`careers@talentifi-x.com`) · `src/components/home/TheNextStepSection.tsx:51` (`www.talentifix.com`) · `robots.ts:5`, `sitemap.ts:7`, `sitemap.html/page.tsx:25`, and three API routes (`https://talentifix.com`)
- **Issue:** Two spellings of the brand domain — `talentifi-x.com` and `talentifix.com` — are used interchangeably across links, canonicals, email addresses, and fallback URLs. The `job-application` route additionally hardcodes `careers@talentifi-x.com` as its final recipient fallback at `:100`.
- **Impact:** The canonical instance is Critical on its own (D1). Beyond that: the outbound link at `jobs/[slug]:203` may be dead, and if `talentifi-x.com` does not have MX records, the careers fallback address silently discards job applications whenever `CAREERS_TO_EMAIL` and `CONTACT_TO_EMAIL` are both unset. *This one needs confirmation from you — I could not verify DNS from a static read.*
- **Fix:** Settle on one canonical domain, define it once as `NEXT_PUBLIC_SITE_URL`, and derive every reference from it. Verify which address actually receives mail before changing the careers fallback.

#### [Medium] Six TTF font faces with no `font-display`
- **Location:** `src/styles/global.css:3-44`
- **Issue:** Six `@font-face` blocks load `.ttf` files from `/static/`. None declares `font-display`, and there is no `<link rel="preload">` for any of them.
- **Impact:** The browser default is `font-display: auto`, which behaves as `block` — text set in Stack Sans Notch is invisible for up to 3 seconds while the font loads. That font is used for every heading on the site (`--font-notch` at `global.css:57`), so the effect lands squarely on Largest Contentful Paint. TTF is also roughly 40% larger than WOFF2 for the same glyphs. Note the contrast with `Inter`, which is loaded correctly through `next/font/google` at `layout.tsx:10` and gets `font-display: swap` automatically.
- **Fix:** Convert to WOFF2, add `font-display: swap` to each block, and preload the two weights used above the fold. Or move the family to `next/font/local`, which handles all three concerns.

#### [Medium] `blogData.ts` duplicates CMS content
- **Location:** `src/data/blogData.ts` (511 lines); consumed at `blog/[slug]/page.tsx:9,51`, `sitemap.ts:3,44`, `sitemap.html/page.tsx:3,33`
- **Issue:** A hand-maintained TypeScript array of blog posts serves as the fallback when Sanity is unreachable — while `scripts/` contains nine separate uploader scripts pushing the same posts into Sanity.
- **Impact:** Two sources of truth for the same content, updated by different mechanisms, with no process keeping them in sync. The file is modified in the current working tree, which suggests it is being maintained by hand. Over time the fallback will drift into serving stale content during exactly the outages when correctness matters most.
- **Fix:** Decide which is authoritative. If Sanity is, delete the fallback and let the routes fail honestly — Next.js will serve the last successful ISR render anyway, which is a better fallback than a frozen array. If offline resilience is required, generate `blogData.ts` from Sanity at build time rather than editing it.

#### [Low] Two audit `.docx` files committed at the repo root
- **Location:** `talentifix-seo-audit.docx` (53 KB, tracked); `TalentiFi-X Website Audit Report - 2026-06-18.docx` (49 KB, untracked)
- **Impact:** Binary deliverables in a source tree — undiffable, and they will accumulate one per audit cycle.
- **Fix:** Move reports under `audit/` (where this one is written) and add binary formats to `.gitignore`, keeping the Markdown source versioned instead.

#### [Low] `public/assets/figma/` holds 21 MB of raw design exports
- **Location:** `public/assets/figma/` — including `who-polygon.png` (4.8 MB) and `hero-image-9-6267d4.png` (2.9 MB, hash-suffixed export name)
- **Impact:** Referenced by nine home-page components, so not dead — but the directory name and the hashed filenames signal that these are unprocessed exports rather than production assets, and they are a large share of D4's total.
- **Fix:** Fold into the D4 image pass: re-encode, rename descriptively, and drop the `figma/` grouping.

---

## Quick wins

Ordered by value per unit of effort. The first four are roughly an hour combined.

1. **Fix the blog canonicals** — two lines in `src/app/blog/[slug]/page.tsx`. Stops the blog from being de-indexed. (D1)
2. **`pnpm add next@^16.2.11`** — patch bump, clears 11 high advisories. (B1)
3. **`"audit": "pnpm audit"`** — one word in `package.json:13`. (C4)
4. **`"target": "ES2022"`** in `tsconfig.json:3` — makes `tsc --noEmit` pass, restoring type-checking. (A8, C5)
5. **Add `/jobs` and job slugs to both sitemaps** — `getAllSanityJobSlugs()` already exists; ~10 lines. (D3)
6. **Add `metadataBase` + one OG image** to `src/app/layout.tsx` — fixes link previews everywhere. (D5)
7. **Add `font-display: swap`** to the six `@font-face` blocks — one line each, direct LCP improvement. (D7)
8. **Log the caught errors** in the three silent API routes — three lines, and the next production failure becomes diagnosable. (A3)
9. **Drop the Sanity token and set `useCdn: true`** — `src/sanity/lib/client.ts`, two lines, faster and least-privilege. (B5)
10. **Add `.audit/` to `.gitignore`.** (B8)

Then tackle, in order: the ESLint flat-config migration (C2), removing `@refinedev` (C1), rate limiting (B2), the consent gating (B3), and the image re-encoding pass (D4).

---

## Appendix

### Commands run

| Command | Result |
|---|---|
| `npx tsc --noEmit` | **Fails** — `tsconfig.json(3,15): error TS5107: Option 'target=ES5' is deprecated and will stop functioning in TypeScript 7.0.` No other type errors. |
| `npx next lint` | **Fails** — `Invalid project directory provided, no such directory: ...\Talentifix\lint` (`next lint` removed in Next 16) |
| `npx eslint "src/**/*.{ts,tsx}"` | **Fails** — `ESLint couldn't find an eslint.config.(js\|mjs\|cjs) file` (ESLint 10 requires flat config) |
| `npm audit` | **Fails** — `npm error code ENOLOCK — This command requires an existing lockfile` (pnpm project) |
| `pnpm audit` | **120 vulnerabilities: 1 critical, 50 high, 55 moderate, 14 low** |
| `pnpm outdated` | 18 packages behind; see table below |
| `find src -name "*.ts*" \| wc -l` | 72 files, 11,050 lines |
| `du -sh public` | 113 MB |
| Test suite | **None** — no runner configured, no test files present |

### `pnpm audit` — high-and-above, by module

| Module | Critical | High | Notable advisory | Patched in |
|---|---|---|---|---|
| `tar` | 1 | 1 | Decompression/parse DoS via unlimited input | 7.5.19 |
| `next` | — | 11 | SSRF in rewrites; middleware/proxy bypass; DoS in Server Components | 16.2.11 |
| `axios` | — | 11 | Prototype pollution → credential injection; proxy credential leak | 1.16.0 |
| `undici` | — | 4 | TLS certificate validation bypass via SOCKS5 proxy | 7.28.0 |
| `fast-uri` | — | 4 | Path traversal; host confusion | 3.1.4 |
| `brace-expansion` | — | 4 | DoS via exponential-time expansion | 5.0.8 |
| `js-yaml` | — | 2 | Quadratic CPU via merge-key chains | 4.3.0 |
| `linkify-it` | — | 2 | Quadratic-complexity DoS in scan loop | 5.0.2 |
| `postcss` | — | 2 | Arbitrary file read via `sourceMappingURL` | 8.5.18 |
| `nodemailer` | — | 1 | `raw` option bypasses `disableFileAccess`/`disableUrlAccess` | 9.0.1 |
| `sharp` | — | 1 | Inherited libvips CVEs (2026-33327/33328/35590) | 0.35.0 |
| `form-data` | — | 1 | CRLF injection via unescaped field names | 4.0.6 |
| `tmp`, `adm-zip`, `ws`, `vite`, `http-proxy-middleware`, `@babel/plugin-transform-modules-systemjs` | — | 1 each | Build/dev-time paths | various |

Runtime-facing subset: `next`, `nodemailer`, `postcss`, `undici`, `sharp`. The remainder arrive through `@sanity/cli` and `@refinedev/cli` and execute only at build time.

### `pnpm outdated` — direct dependencies

| Package | Current | Latest | Note |
|---|---|---|---|
| `next` | 16.2.3 | 16.2.12 | **Security — see B1** |
| `nodemailer` | 8.0.5 | 9.0.3 | **Security — see B4**; major bump |
| `postcss` (dev) | 8.5.9 | 8.5.23 | **Security** — patched at 8.5.18 |
| `react` / `react-dom` | 19.2.5 | 19.2.8 | Patch |
| `eslint-config-next` (dev) | 16.2.3 | 16.2.12 | Track with `next` |
| `eslint` (dev) | 10.2.0 | 10.8.0 | Blocked on flat-config migration (C2) |
| `lucide-react` | 1.8.0 | 1.27.0 | Minor |
| `tailwindcss` / `@tailwindcss/postcss` (dev) | 4.2.2 | 4.3.3 | Minor |
| `sanity` / `@sanity/vision` | 5.20.0 | 6.6.0 | Major — review changelog |
| `next-sanity` | 12.2.2 | 13.2.2 | Major — pair with `sanity` v6 |
| `@portabletext/react` | 6.0.3 | 7.0.1 | Major |
| `typescript` (dev) | 6.0.2 | 7.0.2 | Major — will hard-fail on `target: es5` (C5) |
| `@types/node` (dev) | 25.6.0 | 26.1.1 | Major |
| `@types/react` / `@types/nodemailer` (dev) | — | — | Patch |

### Notes on what was verified and what was not

- **Not a finding:** Sanity draft content is *not* exposed by the tokened client. `@sanity/client@7.21.0` defaults to the `published` perspective, so `*[_type == "post"]` returns published documents only. The token is still worth removing for least-privilege and CDN reasons (B5).
- **Not a finding:** the SSR bailout identified in the June 2026 audit appears resolved — `src/app/layout.tsx` no longer wraps the tree in a Refine provider, and no `useSearchParams` call remains outside a Suspense boundary.
- **Not verified:** whether `talentifi-x.com` resolves and accepts mail (D6). This determines whether the `careers@talentifi-x.com` fallback at `job-application/route.ts:100` silently discards applications.
- **Not verified:** production response headers, actual Core Web Vitals, and whether the deployed `NEXT_PUBLIC_SITE_URL` matches `.env.local`. All findings here are from static analysis of the working tree at commit `fcc4510`.
