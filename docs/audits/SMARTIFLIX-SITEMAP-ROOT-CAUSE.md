# Smartiflix sitemap root-cause report

Audit date: 2026-11-18
Canonical origin: `https://www.tvsmartiflix.online`

## Executive result

The 21 Google Search Console “URL not allowed” entries came from one build-time origin defect. In the audited implementation, every absolute SEO URL was generated from `NEXT_PUBLIC_SITE_ORIGIN`; the live output shows that the deployed build resolved that input to `https://smartiflix.vercel.app`. Because `src/app/sitemap.ts` calls `absoluteUrl()` for every route, all 21 sitemap locations inherited that Vercel hostname even though the sitemap itself was served from `www.tvsmartiflix.online`.

The defect is fixed locally by making the intended production origin an immutable application constant. Sitemap, robots, metadata, Open Graph, Twitter, and JSON-LD generation now share that exact value and cannot inherit a preview hostname, request `Host`, `VERCEL_URL`, or `VERCEL_PROJECT_PRODUCTION_URL`.

This is not yet fixed on the live domain because the owner requested no deployment. The current live sitemap and robots file still contain `smartiflix.vercel.app` and will remain wrong until the corrected build is deployed.

## Why exactly 21 URLs were rejected

`src/app/sitemap.ts` emits:

- 11 static indexable routes: `/`, `/pricing`, `/devices`, `/faq`, `/blog`, `/support`, `/reseller`, `/privacy`, `/terms`, `/refund`, and `/disclaimer`.
- 10 article routes derived from `blogArticles`.

Total: 21 canonical indexable routes. Google rejected the submitted locations because their origin, `https://smartiflix.vercel.app`, is outside the submitted sitemap property/host, `https://www.tvsmartiflix.online`.

No stale static XML file exists. `src/app/sitemap.ts` is the active Next.js metadata route. The repository did not hardcode the Vercel hostname and did not derive it from an incoming request header. The former implementation in `src/lib/site.ts` accepted `process.env.NEXT_PUBLIC_SITE_ORIGIN`; the source path plus live value identify the build-time origin configuration as the cause. Direct Vercel dashboard access was unavailable, so the dashboard variable itself was not inspected. The checked-in `.env.example` also pointed to the non-www apex, which could have caused a second hostname mismatch if copied.

## Code repair

- `src/lib/site.ts`: added the single `CANONICAL_ORIGIN` constant and removed environment/fallback origin selection.
- `src/app/sitemap.ts`: removed unsupported identical modification dates from static routes; articles retain their declared content modification dates.
- `next.config.ts`: imports the same constant and declares a permanent, path/query-preserving redirect for the confirmed apex hostname only.
- `.env.example`: removed the misleading origin variable and documents that deployment-derived hosts must not control canonical output.
- `scripts/verify-site-production.mjs`: now rejects wrong-protocol/wrong-host sitemap URLs, wrong canonical/OG/JSON-LD origins, noindex directives, broken internal routes, missing H1s, and redirect loops/path loss using production-rendered output.
- `scripts/verify-blog-seo.mjs`: validates article canonicals against the immutable production origin.
- `package.json`: added `typecheck` and the aggregate `verify:seo` release gate.

## Corrected sitemap inventory

The final local sitemap contains 21 entries: 11 static routes and 10 articles. Every `<loc>` begins with `https://www.tvsmartiflix.online`; none use HTTP, the apex hostname, or `smartiflix.vercel.app`.

The route count remains 21 because all 21 existing public routes return 200, are intentionally indexable, have self-referencing canonicals, appear in internal navigation/content links, and contain server-rendered content. The generated 404 route is not included.

## Verification evidence

Local production-mode evidence:

- `npm run build`: PASS; 26 generated Next.js outputs including 21 content routes, sitemap, robots, icon, and not-found output.
- `npm run verify:production`: PASS; 21/21 intended indexable routes returned 200 with correct canonicals.
- Sitemap coverage: 21/21; exact origin and HTTPS checks passed.
- Robots: `Sitemap: https://www.tvsmartiflix.online/sitemap.xml` passed.
- Host redirects: the confirmed apex returned a local 308 response to the matching canonical path/query; the canonical host returned 200 and did not loop. The unrelated Vercel hostname is intentionally not handled by this project.

Live read-only evidence captured on 2026-11-18 before deployment:

- `https://www.tvsmartiflix.online/`: HTTP 200, but canonical/OG/Twitter/JSON-LD URLs use `https://smartiflix.vercel.app`.
- `https://www.tvsmartiflix.online/sitemap.xml`: HTTP 200 with 21/21 wrong-host locations.
- `https://www.tvsmartiflix.online/robots.txt`: HTTP 200 and incorrectly references `https://smartiflix.vercel.app/sitemap.xml`.
- All 21 live content routes returned HTTP 200, contained one H1, and were not noindex, but all 21 canonicals used the Vercel hostname.
- `https://tvsmartiflix.online/pricing?ref=audit`: HTTP 308 to `https://www.tvsmartiflix.online/pricing?ref=audit`; the apex configuration is healthy and preserves path/query.
- `https://smartiflix.vercel.app/pricing?ref=audit`: HTTP 301 to `https://smartiflix.io/pricing?ref=audit`. That hostname currently belongs to or is configured for another deployment/domain behavior, so the repository cannot correct its live redirect until the Vercel project/domain association is fixed by the owner.

## Required deployment and Search Console handoff

1. Deploy the corrected build; no DNS change is required for the code repair.
2. No origin variable is required. If an obsolete `NEXT_PUBLIC_SITE_ORIGIN` variable exists, it is inert and may be removed only after the dashboard configuration is independently reviewed.
3. In Vercel, confirm `www.tvsmartiflix.online` is the primary production domain and the apex redirects directly to it.
4. Leave `smartiflix.vercel.app` unchanged unless its owning project is independently confirmed. It is not configured or redirected by this repository.
5. Open the deployed sitemap and verify all 21 `<loc>` values use the www HTTPS origin.
6. Verify the deployed robots file and representative page canonicals/OG/JSON-LD.
7. Resubmit `https://www.tvsmartiflix.online/sitemap.xml` in Google Search Console and inspect a small set of priority URLs.

Search Console may retain the historical errors until Google recrawls the corrected sitemap. Passing local or live technical checks does not guarantee indexing or rankings.
