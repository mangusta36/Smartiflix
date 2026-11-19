# Smartiflix complete technical SEO audit

Audit date: 2026-11-18
Scope: repository source, generated production application, Chromium DOM/interaction checks, and read-only live diagnostics

## Outcome

The critical origin defect is repaired locally. The production build now emits `https://www.tvsmartiflix.online` consistently in the sitemap, robots reference, canonicals, Open Graph/Twitter metadata, and structured data. The broader production-rendered audit passed for all 21 intended indexable routes. Live production still serves the previous wrong-origin build and requires deployment.

## Inventory and baseline

| Inventory | Count | Evidence |
|---|---:|---|
| Intended indexable routes | 21 | 11 static routes + 10 articles in `scripts/qa-routes.mjs` |
| Blog articles | 10 | `src/data/blog.ts`; all generated through `/blog/[slug]` |
| Generated sitemap entries | 21 | Production `/sitemap.xml` verification |
| Production HTML image occurrences | 23 | Homepage 3 + blog cards 10 + article heroes 10 |
| Unique rendered image assets | 12 | Two base photographs plus ten article crops |
| Internal link occurrences checked | 575 | All rendered anchors across 21 routes |
| Parsed JSON-LD blocks | 73 | Global and page-specific blocks across the route crawl |
| Responsive route/viewport checks | 24 | Eight representative routes at 390, 768, and 1440 px |

## Issues discovered and disposition

| Severity | Finding | Disposition |
|---|---|---|
| Critical | Live sitemap contains 21 `smartiflix.vercel.app` URLs. | Fixed locally by immutable canonical origin; deployment pending. |
| Critical | Live robots, canonicals, Open Graph/Twitter, and JSON-LD inherit the same bad origin. | Fixed locally through shared `site.origin`; deployment pending. |
| High | `.env.example` advertised the non-www apex and environment configuration could select any HTTPS host. | Removed the origin variable and documented the invariant. |
| High | No deterministic host-redirect regression check existed. | Added raw-host production checks for 308 path/query preservation and canonical-host loop prevention. |
| Medium | Aggregate SEO verification command was absent. | Added `npm run verify:seo`. |
| Medium | Image audit ledger described stale source declarations and images that are not rendered. | Rebuilt the ledger from the actual production DOM. |
| Medium | Keyword map lacked an explicit content-improvement field. | Added route-specific, non-fabricated opportunities for all 21 routes. |
| External deployment | Live `smartiflix.vercel.app` redirects to `smartiflix.io` and is not confirmed as belonging to this project. | Documented only; no redirect or Vercel change was added here. |

## Crawlability, sitemap, and robots

- Local production sitemap: 21/21 correct HTTPS www URLs, no duplicates, redirects, 404s, private routes, or noindex routes.
- Local robots: allows `/` and references `https://www.tvsmartiflix.online/sitemap.xml`.
- All intended routes: HTTP 200, no `noindex`/`nofollow` meta directive, no noindex `X-Robots-Tag`, and a self-referencing canonical.
- The not-found test route returns 404 and is excluded from the sitemap.
- Live state remains wrong-origin until deployment; see `SMARTIFLIX-SITEMAP-ROOT-CAUSE.md`.

## Metadata and headings

- 21/21 routes have unique titles and unique meta descriptions.
- 21/21 routes have exactly one meaningful H1.
- Open Graph title, description, URL, site name, and image are present on every intended route and use the canonical origin locally.
- Twitter large-image metadata is present and uses the canonical origin locally.
- HTML language is `en` on all checked routes.
- Metadata reflects the visible route purpose; no Zenora content or configuration was introduced.

## Structured data

- 73 rendered JSON-LD blocks parsed successfully during the full route crawl.
- Global `Organization` and `WebSite` entities use stable canonical IDs.
- Articles render `BlogPosting`, `BreadcrumbList`, and visible-content-backed `FAQPage` data.
- Local validation rejects Vercel, non-www, HTTP, localhost, example, or unexpected structured-data URL origins.
- No reviews, ratings, or unsupported offer claims were added.

## Blog and content quality

- 10/10 intended articles exist with unique slugs, titles, descriptions, and declared primary intents.
- 10/10 render one H1, a primary topic in section headings, valid article canonicals, real clickable contextual anchors, a blog-hub return path, and related-article links.
- Contextual article links: 30 total; contextual core/hub links: 10; all articles receive inbound contextual links, so there are no contextual orphans.
- Strict editorial body counts range from 617 to 789 words before template, FAQ, sources, related links, tables, and CTA copy. The requested 2,500-word guideline was not forced: these task-oriented setup/troubleshooting pages already cover their assigned intent, and adding roughly 1,700 filler words per page would reduce usefulness. Future expansion should be driven by verified reader questions or substantive original testing.
- Source validation found no placeholder sources, cross-brand leakage, unsupported first-party claims, or substantial duplicate article pairs.

## Internal links and navigation

- 575 rendered internal link occurrences were checked across header, main content, and footer.
- Source validation found 0 broken internal links, `href="#"` values, empty hrefs, or placeholder links.
- Chromium successfully opened the mobile menu, navigated to the blog, expanded an FAQ item, and followed a contextual article link.
- Article links render as actual anchor elements; escaped HTML link strings were not found.
- See `SMARTIFLIX-INTERNAL-LINK-AUDIT.csv` for the editorial graph.

## Images and accessibility

- 23 production HTML image occurrences and the corresponding 23 browser-DOM occurrences were checked.
- Missing alt attributes: 0; unmarked empty alts: 0; generic/filename/keyword-stuffed alts: 0; broken images: 0.
- Decorative hero/card images use empty alt plus an explicit decorative marker.
- Informative images use literal descriptions of the visible living-room or remote-control photograph; they do not falsely claim that a platform UI, network test, EPG, or login fields are visible.
- Article-specific supporting images are not currently rendered. Existing files outside the rendered DOM were not counted as accessibility successes or failures.
- See `SMARTIFLIX-IMAGE-ALT-AUDIT.csv` for the production occurrence ledger.

## Responsive quality and runtime behavior

- Eight representative routes were checked at 390, 768, and 1440 px; 24/24 checks found no horizontal page overflow.
- Production verification recorded no console errors or uncaught page errors.
- Mobile navigation, FAQ interaction, and article navigation passed.
- No redesign, pricing change, WhatsApp change, payment-flow change, or third-party script was introduced.
- Lighthouse was not run, so no performance score is claimed. The audit did verify browser image loading and production runtime behavior.

## Domain behavior

- Local host redirect configuration: the confirmed apex maps directly to the canonical www URL with permanent 308 status and preserved path/query; canonical www requests return 200 without a loop.
- Live apex behavior: already correct (308 to www with path/query preservation).
- Live Vercel hostname behavior: 301 to `smartiflix.io`; treated as an unrelated deployment and intentionally left unchanged.

## Files changed for this remediation

- `.env.example`
- `next.config.ts`
- `package.json`
- `scripts/verify-blog-seo.mjs`
- `scripts/verify-site-production.mjs`
- `src/app/sitemap.ts`
- `src/lib/site.ts`
- `docs/audits/SMARTIFLIX-SITEMAP-ROOT-CAUSE.md`
- `docs/audits/SMARTIFLIX-COMPLETE-SEO-AUDIT.md`
- `docs/audits/SMARTIFLIX-KEYWORD-MAP.csv`
- `docs/audits/SMARTIFLIX-IMAGE-ALT-AUDIT.csv`
- `docs/audits/SMARTIFLIX-FINAL-VERIFICATION.md`

`SMARTIFLIX-INTERNAL-LINK-AUDIT.csv` was reviewed and remains accurate; it did not require a content change.

## Owner-dependent actions

1. Deploy this working tree.
2. No origin variable is required; treat any stale dashboard variable as optional cleanup after independent review because current code ignores it.
3. Verify the live sitemap, robots, canonical, Open Graph, and JSON-LD output after deployment.
4. Do not change `smartiflix.vercel.app` unless ownership is separately established; this repository deliberately does not claim it.
5. Resubmit the sitemap in Search Console and inspect priority URLs.
6. Monitor Page Indexing over subsequent days/weeks; historical errors can persist while Google reprocesses the sitemap.

These repairs improve technical eligibility and consistency; they do not guarantee indexing, rich results, traffic, or rankings.
