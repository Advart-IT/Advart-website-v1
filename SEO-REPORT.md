# Advart SEO implementation and validation

Audit date: 16 October 2026. Changes are local only; no push, deployment, Search Console submission or indexing request was made.

## Completed work and audit findings

Most SEO implementation was already present in the working tree when this task resumed. Those edits were preserved and checked rather than replaced. The homepage remains focused on the agency; the existing hero H1, styles, animations, navigation, forms, API integrations and case studies were retained.

Production checks confirmed:

- `https://advartit.in/` returns 301 to `https://www.advartit.in/`, which returns 200. HTTP non-www redirects through HTTPS non-www first. No redirect configuration was added.
- Production robots still declares the non-www host; the local version correctly declares www and retains the existing allow-all crawl policy and both sitemap references.
- The live `/advartgen/sitemap.xml` returns 200 XML with the lowercase canonical landing-page URL.
- The live `/advartgen` is a separate application, distinct from the pre-existing local route. Its files were not edited. Existing infrastructure routing must continue sending `/advartgen` and its subpaths to that application.
- The old root metadata had obsolete keywords, references to missing `/og.jpg`, `/logo.png` and a mask icon, an unverified legal company suffix, and root canonical inheritance that could conflict with child pages. Existing local edits already addressed these with page-specific metadata and a real social image.
- No JSON-LD script was found in the fetched production homepage or Advart Gen HTML at audit time. The parent homepage now has one graph with ProfessionalService, WebSite and two Service entities. Advart Gen is an offering of Advart, not a separate organization. Address, contact information and LinkedIn profile match the public footer. No prices, reviews or credentials were added to schema.

## Metadata before and after

Before (production title): `Advart Technologies | ROI-Focused Digital Marketing Agency in Coimbatore`.

Before (repository baseline description): `Advart Technologies is a Coimbatore-based digital marketing agency specializing in SEO, PPC, social media, and web design to grow your business.`

After title: `Advart | Performance Marketing Agency in Coimbatore`.

After description: `Advart is a performance marketing agency in Coimbatore helping brands grow through data-driven marketing, ecommerce strategies and Advart Gen AI product photography.`

The more focused title and description reflect the requested core offering and avoid extending claims to unsupported services. The homepage uses an absolute title to prevent the layout template appending another brand suffix. Canonicals resolve to the www origin; URL serialization may omit the root trailing slash, which represents the same URL. Open Graph and Twitter use the verified 1200 × 630 `/social-preview.png`, visually inspected during this task.

## Keyword placement

| Location | Natural targeting |
| --- | --- |
| Homepage title and description | Performance marketing agency in Coimbatore, data-driven marketing, ecommerce, AI product photography |
| Performance Marketing card and service schema | Data-driven performance marketing, ecommerce growth, ROI, advertising, campaign strategy, analytics, conversion optimisation |
| Existing Advart Gen introduction and service schema | Advart Gen, AdvartGen, AI-powered ecommerce product photography, fashion brands, catalogue/model/lifestyle visuals, managed production |
| About and contact metadata | Digital marketing agency in Coimbatore, performance marketing, brand strategy |

No meta-keywords or repetitive hidden keyword blocks were added. Read More still opens the existing interaction; its initial server-rendered excerpt contains the primary performance marketing and ecommerce positioning. No thin performance marketing page was created. Header and existing CTA links use lowercase `/advartgen`; the gallery destination is retained.

## Files

Edited during this continuation:

- `lib/seo.ts`: completed the graph with the Advart Gen Service and its stable ID/provider reference.
- `app/robots.ts`, `app/sitemap.ts`: share the canonical origin constant.
- `components/hero/hero-section.tsx`: escaped an apostrophe that blocked lint; rendered heading is identical.
- `package.json`: declared `npm@11.1.0` to resolve package-manager ambiguity.
- `scripts/verify-seo.mjs`: repeatable HTTP and generated-markup validation.
- `SEO-REPORT.md`: audit, validation, deployment checks and monitoring plan.

Previously completed changes retained: `app/layout.tsx`, `app/page.tsx`, route metadata layouts for aboutus, careers, contactus, dot, privacy-policy, terms-conditions and works/beelittle; metadata in `app/advartgen/page.tsx` and `app/careers/[slug]/apply/page.tsx`; homepage service/Advart Gen copy; footer contacts; `lib/utils.ts`; `public/social-preview.png`; `.eslintrc.json`; dependency lockfile/lint setup; `next.config.mjs` build checking; existing lint/type fixes in hero and Beelittle components. Other pre-existing edits were not reverted.

## Validation results

- `npm run typecheck`: PASS. Installed Next.js 15.5.27 and TypeScript 5.4.5 resolve the `next` metadata types. No suppression or dependency upgrade was needed in this continuation. If VS Code still shows old errors, select the workspace TypeScript version and restart its TS server.
- `npm run lint`: PASS with 16 existing warnings (14 raw image warnings and two hero effect dependency warnings). No lint errors. The Next 15 lint command emits its deprecation notice.
- `npm run build`: PASS; static pages generated and dynamic API/career routes retained. The first sandboxed attempt failed with worker `spawn EPERM`; the approved unrestricted rerun succeeded.
- `node scripts/verify-seo.mjs` against the production build: PASS for all nine sitemap entries, HTTP 200, unique single titles/canonicals, descriptions, Open Graph and Twitter metadata, no keyword tags or accidental noindex. Homepage H1 count, existing links, server-rendered copy, schema JSON parsing, unique IDs/provider references, robots policy and social image dimensions passed.
- `git diff --check`: PASS.
- Schema validation here checks JSON structure, entity fields and references; it is not a Google Rich Results Test or an external Schema.org validator result. Service markup does not promise a rich result.

Reproduce with `npm run build`, then `npm run start`, then in another terminal `node scripts/verify-seo.mjs`. Override `SEO_BASE_URL` to check a staging deployment.

## Limitations and deployment checks

1. No browser surface is connected, so mobile/desktop screenshots and interactive regression checks could not be run. Responsive classes and layouts were preserved; that is not a substitute for visual QA. Before approval, check 375px, 768px and desktop widths, the greeting overlay, hero animation, service Read More, Advart Gen comparison tabs, navigation and forms without submitting real enquiries.
2. LCP, INP and CLS were not measured; no performance gain is claimed. External Figtree CSS, unoptimized images and the existing animation JavaScript were retained to avoid speculative visual/behavior changes. Homepage build reports 169 kB first-load JS. Use PageSpeed Insights and Search Console field data after release; only change loading behavior after identifying the actual bottleneck.
3. Both lockfiles existed before this task. `package-lock.json` matches the installed dependencies; `pnpm-lock.yaml` references a substantially older/different dependency set. Use npm and `npm ci` in deployment; do not let hosting auto-select pnpm. The stale lockfile was retained rather than deleting existing work.
4. Deployment/proxy configuration is not in this repository. Preserve the separate application mapping for `/advartgen`, `/advartgen/gallery`, its assets and sitemap. The parent-only preview does not implement the gallery or Advart Gen sitemap. Do not add duplicate implementations here. Verify these destinations on staging/production after routing is applied.
5. Dynamic career detail behavior depends on the live roles API. The nine sitemap URLs passed, including careers, but individual openings and application submissions were not exhaustively tested. Existing missing-job handling may return a soft 404 and should be handled in a separate careers behavior change.
6. No private route disallow rules existed to preserve. API authentication and form handling were not modified; robots.txt is not an access-control mechanism.

## Manual release and Search Console actions

After reviewing the diff and approving deployment:

1. Deploy through the existing process using npm, retaining current environment variables and proxy routes. No automatic deployment is authorized by this report.
2. Recheck non-www redirects, all public sitemap URLs, canonical tags, robots, the social image and the separate Advart Gen/gallery/sitemap destinations on the deployed host.
3. Paste the homepage JSON-LD into Schema.org Validator and test the live homepage in Google Rich Results Test. Resolve actual validation errors; lack of a Service rich-result feature is not an error.
4. In the verified Search Console property, inspect `https://www.advartit.in/` and `https://www.advartit.in/advartgen` separately. Run the live test, confirm crawl permission and rendered content, and compare user-declared versus Google-selected canonicals. Request indexing after successful deployment if appropriate.
5. Submit or verify `https://www.advartit.in/sitemap.xml` and `https://www.advartit.in/advartgen/sitemap.xml`; inspect processing status and Page indexing exclusions. Do not request indexing for duplicate hostname versions.

## 30-day monitoring plan

Day 0 means the approved deployment date, not this audit date. Export the previous 28 days as a baseline. Use the same country, device, search type and date-window settings in comparisons. Segment exact homepage URL and exact Advart Gen landing URL separately; inspect other pages independently.

| Query group | Queries |
| --- | --- |
| Company / Local | advart; advart technologies; performance marketing agency in coimbatore; digital marketing agency in coimbatore |
| Performance Marketing | performance marketing agency; ecommerce performance marketing; performance marketing services; ecommerce growth marketing |
| Advart Gen | advart gen; advartgen; advart ai; ai product photography; ai image generation for ecommerce |

Track impressions, clicks, CTR and average position in Search Console Performance for each query group and page segment. Record indexed-page count and exclusions separately from the Page indexing report. Query groups may overlap; do not sum them as unique totals. Low-volume queries may be withheld by Search Console.

- Days 0–2: save baseline; check sitemap processing, canonical selection, crawl accessibility and deployed metadata.
- Day 7: record metrics and indexing changes; investigate exclusions or broken links before changing copy.
- Day 14: repeat; inspect device differences and relevant incoming query variations.
- Day 21: repeat; review page-level relevance and any field performance data available.
- Day 30: export the full post-release period, compare with an equivalent prior period, and record observations without attributing every movement to SEO edits.

Use a tracking table with: date window, page segment, query group, impressions, clicks, CTR, average position, indexed-page count, exclusions and notes. Leave unavailable data blank. No rankings, volumes, traffic forecasts or indexing outcomes are fabricated.
