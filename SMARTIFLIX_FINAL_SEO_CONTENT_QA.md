# Smartiflix Final SEO and Content QA

Audit date: 2026-10-12

## Article matrix

| Slug | Strict words | Intent | H2/H3 | FAQs | Contextual links | Images | Verdict |
|---|---:|---|---|---:|---:|---:|---|
| `how-to-install-iptv-on-firestick-2026` | 2580 | Firestick setup | 19/5 | 5 | 2 | 3 | PASS with image exception |
| `best-iptv-players-smart-tv-2026` | 2621 | Smart TV player comparison | 21/5 | 5 | 2 | 3 | PASS with image exception |
| `xtream-codes-vs-m3u` | 2573 | Login-format comparison | 23/5 | 5 | 2 | 3 | PASS with image exception |
| `iptv-buffering-fix-2026` | 2534 | Buffering diagnosis | 23/5 | 5 | 2 | 3 | PASS with image exception |
| `iptv-on-samsung-lg-smart-tv-2026` | 2556 | Samsung/LG setup | 23/5 | 5 | 2 | 3 | PASS with image exception |
| `best-iptv-player-for-firestick-2026` | 2515 | Firestick player selection | 25/5 | 5 | 2 | 3 | PASS with image exception |
| `iptv-epg-not-working-guide` | 2519 | EPG/XMLTV diagnosis | 25/5 | 5 | 2 | 3 | PASS with image exception |
| `iptv-on-apple-tv-2026` | 2516 | tvOS setup | 26/5 | 5 | 2 | 3 | PASS with image exception |
| `internet-speed-for-iptv` | 2540 | Network planning | 26/5 | 5 | 2 | 3 | PASS with image exception |
| `iptv-not-working-common-problems` | 2543 | Broad troubleshooting hub | 27/5 | 5 | 2 | 3 | PASS with image exception |

## SEO and rendered checks

- Titles are unique and under 60 characters; descriptions are unique and under 155 characters.
- Slugs and canonical paths are unchanged; no production origin was invented.
- Every page has one H1, logical H1→H2→H3 hierarchy, a keyword-led opening, a semantic table, and visible FAQs.
- BlogPosting, BreadcrumbList, and FAQPage JSON-LD render from the same article data; Organization and WebSite schema also appear globally.
- Sitemap and robots routes remain implemented; live indexing and Search Console remain NOT VERIFIED.
- Internal-link QA: zero broken, empty, hash-only, or placeholder links.
- Source QA: current article references return 200 except none after XMLTV replacement; no stale 404 source remains in article data.
- Exact normalized paragraph duplicates: zero. Near-duplicate script: zero substantial pairs.
- Responsive Chromium QA: 20/20 pages passed at 390px and 1440px with no overflow or console/page errors.
- Image QA: 30 local WebP assets exist and match required dimensions; all article pages render three images.

## Regression suite

| Command | Result |
|---|---|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| local-origin `npm run build` | PASS with explicit test-origin flag |
| `npm run qa:pricing` | 20/20 PASS |
| `npm run qa:discounts` | 20/20 PASS |
| `npm run qa:links` | 0 broken links |
| `npm run qa:blog:words` | 10/10 above 2,500 |
| `npm run qa:blog:forensics` | PASS |
| `npm run qa:blog:duplicates` | 0 substantial pairs |
| `npm audit --omit=dev` | 0 vulnerabilities |

## Exceptions

The literal one-image-per-substantive-H2 requirement remains a documented exception. Pexels license-level evidence is verified, but exact image provenance and owner retention remain an owner action. Production HTTPS canonicalization, Google indexing, Search Console, and rich-result eligibility remain unverified without the real domain.
