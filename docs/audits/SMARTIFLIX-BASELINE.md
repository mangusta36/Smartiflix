# Smartiflix pre-remediation baseline

Audit date: 2026-11-12
Baseline commit: `52ddc19` (`Initial Smartiflix website release`)
Scope: project discovery and technical SEO baseline before remediation

This document records the repository state observed before implementation work began. The working tree was initially clean: `git status --short --branch` returned only `## main...origin/main`. Parallel remediation began after the evidence capture, so later working-tree output is intentionally not treated as baseline evidence.

## Executive result

The site has a sound crawlable core: all 20 public content routes rendered successfully in the isolated production build, all 20 had one H1, a unique title, a unique description, and a unique canonical, and the sitemap covered exactly those 20 routes. The rendered link graph had no broken internal targets and no orphan content routes.

Release is nevertheless blocked until the owner supplies the real HTTPS origin. Social metadata is incomplete on static pages, all legal and commercial inquiry pages are implicitly indexable without an explicit indexing decision, JSON-LD serialization lacked the sanitization recommended by the installed Next.js guide, the sitemap dates were hard-coded, and no production-rendered image-alt verifier existed.

## Project discovery

| Area | Finding | Evidence |
|---|---|---|
| Framework | Next.js 16.3.8, React 19.3, App Router | `package.json`; `src/app/`; successful `next build` |
| Package manager | npm | `package-lock.json` |
| Source root | `src/` | app, components, data, and libraries under `src/` |
| Content storage | Local TypeScript data | `src/data/blog.ts`, `src/data/faq.ts`, `src/data/pricing.ts` |
| Article renderer | One SSG dynamic route using `generateStaticParams` and `generateMetadata` | `src/app/blog/[slug]/page.tsx` |
| SEO configuration | App Router metadata exports plus metadata route files | `src/app/layout.tsx`, route `page.tsx` files, `robots.ts`, `sitemap.ts` |
| Origin configuration | `NEXT_PUBLIC_SITE_ORIGIN`; localhost fallback for local use; production assertion in prebuild | `src/lib/site.ts`, `.env.example`, `scripts/verify-origin.ts` |
| Styling | Tailwind CSS 4 through PostCSS plus `src/app/globals.css` | `package.json`, `postcss.config.mjs`, CSS import |
| Images | `next/image` and 32 local WebP files | page renderers and `public/images/` |
| Internal linking | Shared header/footer, blog hub, article contextual links and related links | `Header.tsx`, `Footer.tsx`, blog renderers and data |
| Existing tests/checks | ESLint, origin, links, pricing, discounts, blog word count, forensics, duplicate checks | `package.json`, `scripts/` |
| Deployment configuration | None committed for Vercel, Netlify, Docker, Fly, or Cloudflare | repository file search |
| Production domain | **Unresolved** | `.env.example` contains `https://your-real-production-domain.example`; no real hostname is committed |

## Installed Next.js documentation consulted

Next-specific conclusions were checked against the versioned documentation installed with Next.js 16.3.8:

- `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`
- `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`

The documentation confirms that App Router metadata files generate the corresponding routes, `metadata` and `generateMetadata` are server-only APIs, and JSON-LD should be emitted as a native script with potentially dangerous `<` characters escaped.

## Route and indexability inventory

| Inventory item | Count | Result |
|---|---:|---|
| Public content routes | 20 | 10 static content routes plus 10 generated article routes |
| Static content routes | 10 | `/`, `/pricing`, `/devices`, `/faq`, `/blog`, `/reseller`, `/privacy`, `/terms`, `/refund`, `/disclaimer` |
| Blog articles | 10 | All supplied by `src/data/blog.ts` and generated at build time |
| Implicitly indexable content routes | 20 | No content route emitted a `robots` noindex meta tag |
| Explicit noindex content routes | 0 | None |
| Error route | 1 | An unknown URL returned 404 and Next emitted `robots=noindex` |
| Metadata/asset routes | 3 | `/robots.txt`, `/sitemap.xml`, `/icon.svg`; excluded from the content-route count |
| Sitemap URLs | 20 | Exact match to the public content inventory |

The production build reported the 10 article paths as SSG and the other content routes as statically prerendered. Every content route returned HTTP 200 in the browser crawl. Trailing-slash requests are normalized by Next's generated 308 redirect to the no-trailing-slash form.

The 20 routes are currently indexable by default, rather than by explicit per-page directives. The legal pages and `/reseller` are not identified as drafts in source, so this baseline does not assume they should be noindex. Their indexing status still requires an owner/legal decision before release.

## Metadata and canonical baseline

| Check | Result |
|---|---|
| Titles present | 20/20 |
| Unique titles | 20/20; 0 duplicates |
| Descriptions present | 20/20 |
| Unique descriptions | 20/20; 0 duplicates |
| Canonicals present | 20/20 under the isolated test origin |
| Unique canonicals | 20/20; 0 duplicates |
| Exactly one H1 | 20/20 |
| Open Graph title and description | 20/20 |
| Open Graph URL | 11/20; absent on 9 static routes |
| Open Graph image | 10/20; present only on articles |
| Twitter card | 20/20 declare `summary_large_image` |
| Twitter image | 10/20; absent on all 10 static routes |
| Open Graph `site_name` | 8/20 |
| Open Graph `type` | 18/20; missing on home and pricing |

The real-domain canonical result cannot be certified. Without `NEXT_PUBLIC_SITE_ORIGIN`, `npm run build` stopped in `qa:origin` with `Production origin validation: BLOCKED`. An isolated build with `NEXT_PUBLIC_SITE_ORIGIN=https://smartiflix.localhost SMARTIFLIX_ALLOW_TEST_ORIGIN=1` succeeded and was used only to verify route behavior. This safety gate is good, but deployment remains blocked until the true origin is supplied.

The social gaps come from a combination of incomplete base metadata and route-level `openGraph` objects replacing inherited nested fields. Home and pricing override Open Graph metadata without retaining all common fields; article metadata retains `type`, URL, and image but drops the inherited site name. Static routes without their own Open Graph object inherit a title, description, site name, and type but still lack route-specific URLs and images.

## Robots and sitemap baseline

- `/robots.txt` returned 200, allowed `/` for `*`, and referenced the test-origin sitemap.
- No private, checkout, order-status, account, draft, or admin route exists in the route manifest.
- `/sitemap.xml` returned 20 URLs: all 10 static content routes and all 10 articles, with no missing or extra content URL.
- Static `lastModified` values are hard-coded to 2026-10-06 and all article dates resolve to 2026-10-07. The sitemap will not reflect later edits unless code or article dates are updated.
- The root canonical renders without a trailing slash while the XML serializer emits the root sitemap location with `/`; these normalize to the same origin URL and were not counted as a canonical conflict.

## Structured-data baseline

All rendered JSON-LD parsed successfully: 0 parse errors across 20 pages.

| Schema | Coverage |
|---|---:|
| `Organization` | 20/20 |
| `WebSite` | 20/20 |
| `BlogPosting` | 10/10 articles |
| `BreadcrumbList` | 10/10 articles |
| `FAQPage` | 10/10 articles plus `/faq` |
| `WebPage` | 0/20 |

The article FAQ content is visibly rendered, so the FAQ entities are not hidden schema. Article images and canonical entity URLs were absolute under the test origin. No rating, review, inventory, or unsupported offer schema was found.

Confirmed issue: the baseline `JsonLd` component used raw `JSON.stringify(data)` inside `dangerouslySetInnerHTML`. The installed Next.js JSON-LD guide recommends replacing `<` with `\u003c` to reduce injection risk. Current data is locally controlled, so this is a hardening defect rather than evidence of an active exploit.

Potential enhancement, not a validity failure: non-article routes show breadcrumb-like navigation but do not emit `BreadcrumbList`, and no route emits a `WebPage` entity. Only add those entities where the visible page and entity relationships support them.

## Content, images, and internal links

### Blog inventory

| Article slug | Strict editorial words | Section headings | Rendered images |
|---|---:|---:|---:|
| `how-to-install-iptv-on-firestick-2026` | 2,580 | 19 | 3 |
| `best-iptv-players-smart-tv-2026` | 2,621 | 21 | 3 |
| `xtream-codes-vs-m3u` | 2,573 | 23 | 3 |
| `iptv-buffering-fix-2026` | 2,534 | 23 | 3 |
| `iptv-on-samsung-lg-smart-tv-2026` | 2,556 | 23 | 3 |
| `best-iptv-player-for-firestick-2026` | 2,515 | 25 | 3 |
| `iptv-epg-not-working-guide` | 2,519 | 25 | 3 |
| `iptv-on-apple-tv-2026` | 2,516 | 26 | 3 |
| `internet-speed-for-iptv` | 2,540 | 26 | 3 |
| `iptv-not-working-common-problems` | 2,543 | 27 | 3 |

Total strict editorial words: 25,497. Range: 2,515–2,621. The existing verifier counts the title, introduction, section headings, and section body once and excludes template, CTA, tables, FAQs, sources, related links, navigation, and footer.

The baseline lacked the newly requested deterministic five-keyword-heading check and exact-match editorial homepage-link check. Each article had two contextual-link records and three related-article records, but none had the two owner-requested exact-match primary-keyword homepage anchors in editorial paragraphs.

### Images

- 32 unique local WebP files exist: 30 blog assets and 2 site assets.
- 43 image occurrences rendered across the 20-route crawl: 3 home, 10 blog-hub cards, and 30 article images.
- Missing rendered alt attributes: 0.
- Empty rendered alt values: 0.
- Referenced blog image paths: 30/30 present.
- `scripts/verify-image-alt.mjs` and `npm run verify:image-alt` did not exist, so the required production-rendered verifier was absent even though this bounded crawl found no missing alt attribute.

### Internal links

The rendered crawl found 453 internal-link occurrences and 20 unique internal destinations. All 20 destinations returned 200 without redirection, and every content route had at least one incoming link. No article was orphaned. Each article was linked from the blog hub and also participated in the contextual/related graph.

The source-level `qa:links` check also reported 0 broken links, 0 `href="#"`, 0 empty hrefs, and 0 placeholders. Its route set is manually maintained, so the rendered crawl is the stronger baseline.

## Other confirmed baseline defects and risks

| Priority | Finding | Impact |
|---|---|---|
| Blocker | Real HTTPS production origin is not supplied | Production build/deployment cannot be certified; absolute SEO URLs cannot be verified |
| High | Static social cards lack images; 9 routes lack Open Graph URL | Weak or inconsistent social previews despite `summary_large_image` declaration |
| High | All 20 content routes are implicitly indexable and 20/20 are in the sitemap | Legal/reseller indexing may be intentional, but there is no recorded approval boundary |
| Medium | Hard-coded sitemap modification dates | Search engines may receive stale modification signals after content changes |
| Medium | Raw JSON-LD serialization | Does not follow the installed Next.js escaping recommendation |
| Medium | No rendered image-alt verifier or npm script | Current alt coverage cannot be continuously enforced |
| Medium | 404 copy says no Smartiflix articles are live | Factually stale because 10 articles are published; the status and automatic noindex behavior are correct |
| Medium | No deterministic five-keyword-heading/homepage-anchor validation | Requested editorial conventions are not testable in CI |
| Low | No deployment configuration is committed | Hosting behavior, environment injection, redirects, and headers cannot be independently verified from the repository |

## Quality-gate command results

| Command | Baseline result |
|---|---|
| `npm run lint` | PASS |
| `npm run qa:links` | PASS; 0 broken/empty/placeholder links |
| `npm run qa:pricing` | PASS; 20/20 |
| `npm run qa:discounts` | PASS; 20/20 |
| `npm run qa:blog:words` | PASS; 10/10 at or above 2,500 strict editorial words |
| `npm run qa:blog:forensics` | PASS on all reported checks |
| `npm run qa:blog:duplicates` | PASS; 0 substantial duplicate pairs |
| `npm run build` without origin | BLOCKED in prebuild by the intentional production-origin assertion |
| Isolated test-origin `npm run build` | PASS; 25 generated framework pages including 20 content pages |
| Playwright production crawl | PASS for 20 route responses, H1 count, canonical presence, JSON-LD parsing, rendered alt presence, and internal target resolution |

## Evidence commands

The baseline used read-only discovery plus an isolated local production build. Principal commands were:

```text
find . -path './node_modules' -prune -o -path './.next' -prune -o -path './.git' -prune -o -type f -print
git status --short --branch
npm run lint
npm run qa:links
npm run qa:pricing
npm run qa:discounts
npm run qa:blog:words
npm run qa:blog:forensics
npm run qa:blog:duplicates
npm run build
NEXT_PUBLIC_SITE_ORIGIN=https://smartiflix.localhost SMARTIFLIX_ALLOW_TEST_ORIGIN=1 npm run build
NEXT_PUBLIC_SITE_ORIGIN=https://smartiflix.localhost PORT=3210 npx next start
```

Playwright then inspected the browser DOM on all 20 content routes, and a same-origin fetch crawl resolved the rendered internal link graph. The test hostname is not claimed as the production domain.

## Baseline limitations

- No real production hostname, deployed environment, analytics, Search Console, server logs, or field Core Web Vitals data was available.
- Search volume, rankings, traffic, and keyword difficulty were not invented. The accompanying keyword map is a relevance-and-intent recommendation only.
- External article sources were not revalidated as part of this technical baseline.
- This pass verified production-rendered SEO output and link/image basics; it was not the final multi-viewport accessibility and interaction sign-off.
