# Smartiflix canonical-domain verification

Verification date: 2026-11-18
Official canonical origin: `https://www.tvsmartiflix.online`
Repository: `/home/mangusta/Projects/Smartiflix`
Deployment performed: no

## Result

The generated local production site is canonical-domain clean. All 21 discovered indexable routes return HTTP 200, contain exactly one page-specific canonical, one matching `og:url`, one canonical-origin Twitter image, valid same-site JSON-LD URLs, and no active stale-domain string. The sitemap contains 21 unique HTTPS www URLs and robots references the correct sitemap.

Live production is still serving the previous wrong-origin build. Its sitemap, robots reference, homepage canonical, Open Graph URL/image, Twitter image, and JSON-LD still use `smartiflix.vercel.app`. The local repair therefore remains pending deployment; no live state was changed.

## Repository-wide domain classification

The maintained repository was searched while excluding `.git`, `.next`, `node_modules`, `package-lock.json`, and `tsconfig.tsbuildinfo` as source dependencies.

| Classification | References found | Disposition |
|---|---|---|
| Active production URL | `src/lib/site.ts` defines `CANONICAL_ORIGIN` as `https://www.tvsmartiflix.online`; layout, metadata helper, sitemap, robots, and JSON-LD derive from it. | Correct and preserved. |
| Redirect source | `next.config.ts` matches host `tvsmartiflix.online` and redirects to the imported canonical origin. | Legitimate apex source; permanent 308 verified. |
| Test fixture | `scripts/verify-site-production.mjs` contains `smartiflix.vercel.app`, `smartiflix.io`, the apex, localhost, and preview-host patterns in its forbidden-host assertions. | Legitimate negative regression fixtures; never emitted by the site. |
| Development-only URL | `scripts/production-server.mjs` uses `http://127.0.0.1:<port>`; `scripts/verify-image-alt.mjs` uses `http://smartiflix.test` only as a URL-parsing base. | Local QA only; not production output. |
| Environment safety documentation | `.env.example` names `NEXT_PUBLIC_SITE_ORIGIN` and `VERCEL_URL` only to prohibit deployment-derived canonical configuration. | Legitimate warning; no active origin variable exists. |
| Historical documentation | `SMARTIFLIX_COMPLETE_FORENSIC_SEO_UI_AUDIT.md`, `SMARTIFLIX_IMPLEMENTATION_REPORT.md`, `SMARTIFLIX_10_BLOGS_COMPLETE_FORENSIC_AUDIT.md`, `SMARTIFLIX_PRODUCTION_GSC_READINESS.md`, `SMARTIFLIX_COMPLETE_SEO_UI_REMEDIATION_REPORT.md`, `docs/audits/SMARTIFLIX-BASELINE.md`, and `docs/audits/SMARTIFLIX-BLOG-VERIFICATION.csv` describe superseded origin or localhost-baseline behavior. | Preserved as historical evidence, not current instructions. |
| Current audit evidence | `SMARTIFLIX-SITEMAP-ROOT-CAUSE.md`, `SMARTIFLIX-COMPLETE-SEO-AUDIT.md`, and `SMARTIFLIX-FINAL-VERIFICATION.md` mention stale domains only when documenting the live defect or the negative tests. | Legitimate audit evidence. |
| External reference | `smartiflix.io` appears only in audit text recording the observed redirect from the separate Vercel hostname. | Not an active link, canonical, redirect destination, metadata value, or schema URL in this project. |

No active page, component, navigation record, content record, metadata generator, sitemap generator, robots generator, or JSON-LD generator contains a stale Smartiflix production hostname.

## Central domain configuration and environment safety

`src/lib/site.ts` contains one immutable application constant:

```ts
export const CANONICAL_ORIGIN = "https://www.tvsmartiflix.online";
```

`site.origin`, `absoluteUrl()`, `metadataBase`, sitemap, robots, Open Graph, Twitter images, and JSON-LD IDs all resolve from it. No `process.env` value and no incoming `Host` header can override it.

Environment-file inventory found only `.env.example`; there is no repository `.env`, `.env.local`, or `.env.production`. No Vercel configuration file exists. No production environment variable is required for the canonical origin. Consequently, no Vercel variable must be changed for correctness; a redeployment of the repaired source is required. Any stale origin variable in the dashboard is inert in the current code and may be cleaned up only after it is independently reviewed.

## Route inventory discovery

The verifier reads `.next/server/app-paths-manifest.json`, compares its static page routes with `scripts/qa-routes.mjs`, confirms that `/blog/[slug]` is the only dynamic content route, and expands it from the ten real article records. This produced:

- 11 static indexable routes.
- 10 article routes backed by `src/data/blog.ts`.
- 21 total indexable routes.

Metadata routes, the icon route, framework error output, and the not-found page are correctly excluded from the sitemap inventory.

## Per-route production HTML evidence

The following results come from `npm run verify:domain`, which rebuilt the application, started `next start`, fetched every route in Chromium, and inspected the actual DOM. Next.js serializes the root canonical/OG URL as the origin without a redundant trailing slash; it is the same root URL as `https://www.tvsmartiflix.online/`. All other paths follow the no-trailing-slash convention.

| Route | HTTP | Canonical and `og:url` | Twitter images | JSON-LD blocks | Result |
|---|---:|---|---:|---:|---|
| `/` | 200 | `https://www.tvsmartiflix.online` | 1 | 2 | PASS |
| `/pricing` | 200 | `https://www.tvsmartiflix.online/pricing` | 1 | 2 | PASS |
| `/devices` | 200 | `https://www.tvsmartiflix.online/devices` | 1 | 2 | PASS |
| `/faq` | 200 | `https://www.tvsmartiflix.online/faq` | 1 | 3 | PASS |
| `/blog` | 200 | `https://www.tvsmartiflix.online/blog` | 1 | 2 | PASS |
| `/support` | 200 | `https://www.tvsmartiflix.online/support` | 1 | 2 | PASS |
| `/reseller` | 200 | `https://www.tvsmartiflix.online/reseller` | 1 | 2 | PASS |
| `/privacy` | 200 | `https://www.tvsmartiflix.online/privacy` | 1 | 2 | PASS |
| `/terms` | 200 | `https://www.tvsmartiflix.online/terms` | 1 | 2 | PASS |
| `/refund` | 200 | `https://www.tvsmartiflix.online/refund` | 1 | 2 | PASS |
| `/disclaimer` | 200 | `https://www.tvsmartiflix.online/disclaimer` | 1 | 2 | PASS |
| `/blog/how-to-install-iptv-on-firestick-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/best-iptv-players-smart-tv-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/xtream-codes-vs-m3u` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/iptv-buffering-fix-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/iptv-on-samsung-lg-smart-tv-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/best-iptv-player-for-firestick-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/iptv-epg-not-working-guide` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/iptv-on-apple-tv-2026` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/internet-speed-for-iptv` | 200 | matching www route | 1 | 5 | PASS |
| `/blog/iptv-not-working-common-problems` | 200 | matching www route | 1 | 5 | PASS |

Every route had exactly one canonical tag. No canonical included a query string, duplicate tag, localhost URL, apex URL, Vercel hostname, or `smartiflix.io`.

## Sitemap verification

The production `/sitemap.xml` response was parsed with Chromium's native `DOMParser` as `application/xml`, not with a source regex.

- HTTP status: 200.
- XML parse errors: 0.
- `<loc>` entries: 21.
- Unique entries: 21.
- Expected route coverage: 21/21.
- Protocol: HTTPS for 21/21.
- Host: `www.tvsmartiflix.online` for 21/21.
- Canonical-host route status: 200 for 21/21; no sitemap URL redirected.
- Sitemap routes marked noindex/nofollow: 0.
- Sitemap routes blocked by robots: 0.
- Static routes with unsupported `lastmod`: 0.
- Article `lastmod` values: 10/10 exactly match `article.modified ?? article.date` from `src/data/blog.ts`.

Generated evidence begins:

```xml
<loc>https://www.tvsmartiflix.online/</loc>
<loc>https://www.tvsmartiflix.online/pricing</loc>
<loc>https://www.tvsmartiflix.online/devices</loc>
```

No sitemap location contains `smartiflix.vercel.app`, `smartiflix.io`, HTTP, localhost, an apex URL, or a preview hostname.

## Robots verification

The generated local response is:

```text
User-Agent: *
Allow: /

Sitemap: https://www.tvsmartiflix.online/sitemap.xml
```

It returns HTTP 200, contains no global `Disallow: /`, has no stale hostname, and does not contradict the 21-route sitemap inventory. The repository has no private, checkout, account, or draft route requiring an additional restriction.

## Social metadata and assets

- Canonical tags: 21 total, exactly one per route.
- `og:url`: 21 total, exactly one correct page-specific URL per route.
- Open Graph images: canonical www origin on every route.
- Twitter images: 21 total, canonical www origin on every route.
- `twitter:url`: not emitted by the Next.js metadata model; if added later, the verifier enforces the page canonical.
- Unique social image assets checked locally: 11; all returned HTTP 200 with an image content type.
- Stale or preview domain tokens in rendered HTML: 0.

No visual asset was changed.

## Structured-data verification

Seventy-three rendered JSON-LD scripts were parsed successfully. The verifier recursively inspects absolute strings and URL-bearing fields including `@id`, `url`, `mainEntityOfPage`, `image`, `logo`, `contentUrl`, `thumbnailUrl`, `item`, and `publisher`.

- Invalid JSON blocks: 0.
- Relative URL-bearing values: 0.
- Same-site values using a forbidden host: 0.
- Same-site HTTP values: 0.
- Organization/WebSite identity conflicts: 0.
- Legitimate `https://schema.org` contexts remained unchanged.
- No schema, review, rating, offer, or commercial claim was invented.

## Internal links and browser verification

- Rendered internal link/form occurrences checked: 575.
- Broken internal targets: 0.
- Active absolute links to stale Smartiflix hosts: 0.
- Placeholder, empty, or `href="#"` links: 0.
- Same-site navigation remains root-relative.
- WhatsApp destinations and legitimate external editorial sources remain external and unchanged.
- Pricing verification: 20/20 values correct.
- Discount verification: 20/20 values correct.

Chromium checked eight representative pages at 390, 768, and 1440 pixels (24 viewport checks), including homepage, pricing, devices, FAQ, blog, an article, support, and reseller. It found no horizontal overflow or domain-related console/page errors. Mobile menu navigation, blog navigation, FAQ expansion, and an actual contextual article click passed.

## Redirect verification

Only the confirmed apex host is configured in this repository:

```text
tvsmartiflix.online /pricing?ref=seo-qa
  -> HTTP 308
  -> https://www.tvsmartiflix.online/pricing?ref=seo-qa
```

Path and query are preserved. All 21 canonical-host route requests return 200 without a `Location` header, so there is no canonical-host loop or double redirect.

`smartiflix.vercel.app` is not configured as a redirect source. Its observed redirect to `smartiflix.io` belongs to a separate/unconfirmed deployment and was intentionally left unchanged.

## Automated regression protection

Added:

```json
"verify:domain": "npm run build && tsx scripts/verify-canonical-domain.mjs"
```

`scripts/verify-canonical-domain.mjs` invokes the extended production-rendered verifier rather than creating a second drifting audit implementation. Mandatory domain failures exit nonzero, including wrong/preview hosts, duplicate canonicals, wrong OG/Twitter URLs, invalid or stale JSON-LD URLs, malformed sitemap XML, wrong/missing sitemap routes, unsupported dates, robots conflicts, broken absolute internal links, missing social images, apex redirect failure, or canonical redirect loops.

Actual successful summary:

```text
Indexable routes checked: 21
Unique titles: 21; unique descriptions: 21
Internal link occurrences checked: 575
JSON-LD blocks parsed: 73
Canonical tags: 21; Open Graph URLs: 21; Twitter image URLs: 21
Sitemap entries parsed as XML: 21; social image assets checked: 11
Responsive viewport checks: 24
Production site verification: PASS
```

## Live production comparison

Read-only checks at approximately 2026-11-18 17:27 UTC found:

| Check | Local production | Live production |
|---|---|---|
| Homepage HTTP | 200 | 200 |
| Homepage canonical | Correct www origin | Incorrect `smartiflix.vercel.app` |
| Homepage `og:url` | Correct www origin | Incorrect `smartiflix.vercel.app` |
| Homepage OG/Twitter image | Correct www origin | Incorrect `smartiflix.vercel.app` |
| Sitemap HTTP | 200 | 200 |
| Sitemap entries | 21 correct www URLs | 21 incorrect Vercel URLs |
| Robots HTTP | 200 | 200 |
| Robots sitemap | Correct www URL | Incorrect Vercel URL |
| Apex path/query redirect | Local 308 PASS | Live 308 PASS |

Live header evidence showed Vercel cache hits for the old generated HTML/XML. This is consistent with an unapplied deployment or deployment/configuration mismatch. It is not evidence that the current local source remains defective.

## Files modified

Domain-specific changes in this verification pass:

- `next.config.ts`: restricted the code redirect to the confirmed apex host.
- `package.json`: added `verify:domain`.
- `scripts/verify-canonical-domain.mjs`: added the dedicated entry point.
- `scripts/verify-site-production.mjs`: extended production checks with build-manifest discovery, real XML parsing, per-route canonical/OG/Twitter evidence, recursive JSON-LD URL validation, social-asset checks, absolute-link checks, and apex/canonical-host checks.
- `docs/audits/SMARTIFLIX-DOMAIN-VERIFICATION.md`: added this evidence report.
- Existing sitemap/root-cause/final reports: corrected their redirect scope so they do not claim ownership of the separate Vercel hostname.

The existing uncommitted canonical repair in `src/lib/site.ts`, `src/app/sitemap.ts`, `.env.example`, and related SEO tests was inspected, preserved, rebuilt, and verified rather than rewritten unnecessarily.

## Commands executed

```bash
npm run typecheck
npm run lint
npm run build
npm run verify:seo
npm run verify:domain
npm run qa:links
npm run verify:blog-seo
npm run qa:blog:forensics
npm run qa:blog:duplicates
npm run qa:pricing
npm run qa:discounts
git diff --check
```

Live comparisons used bounded read-only `curl` requests. No DNS, Vercel, deployment, Search Console, or unrelated project state was changed.

## Remaining deployment requirements

1. Deploy the current repaired source to the production project serving `www.tvsmartiflix.online`.
2. Verify the live homepage canonical, `og:url`, social images, and JSON-LD after the deployment cache updates.
3. Verify all 21 live sitemap locations and the live robots sitemap reference.
4. Resubmit the corrected sitemap in Google Search Console and inspect priority URLs.
5. Allow Google time to refetch and reprocess the sitemap; historical errors may remain temporarily.

No Vercel domain-setting change is required for the confirmed www/apex pair. Do not modify `smartiflix.vercel.app` without independently establishing ownership. Technical correctness does not guarantee indexing or rankings.
