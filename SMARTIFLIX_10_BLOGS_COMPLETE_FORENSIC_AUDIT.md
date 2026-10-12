# Smartiflix 10-Article Complete Forensic SEO Audit

Audit date: 2026-10-12  
Scope: read-only inspection of `src/data/blog.ts`, `src/app/blog/[slug]/page.tsx`, rendered production-like article pages, local image metadata, source/license ledger, existing QA scripts, and safe HTTP/source checks. No article, image, route, or application source was modified.

## 1. Executive summary

All 10 intended article slugs are present, unique, routed, and rendered. Titles are unique and under 60 characters, descriptions are under 155 characters, all pages have one H1, answer-first openings under 80 words, useful tables, five visible FAQ items, contextual CTAs, BlogPosting/BreadcrumbList/FAQPage JSON-LD, and two contextual internal links.

The main compliance failure is editorial word count under the requested definition. The existing `qa:blog:words` script reports 10/10 because it counts FAQ material and other fields. A stricter article-only count of title, opening, H2 headings, and section body text—excluding the repeated FAQ/sources/related template—falls below 2,500 for all 10 articles. Counts range from 2,385 to 2,491.

The literal one-image-per-H2 requirement is also not met: each article has one hero and two section images, while each article has 18–26 content H2s plus template H2s. Editorially, two relevant section images per article is reasonable; adding 18–26 images per article would be excessive and harmful to page performance. This is recorded as literal noncompliance and a separate editorial/performance assessment.

The articles are topically distinct but adjacent. The clearest cannibalization risk is between the two Firestick articles, the two Smart TV articles, and the broad troubleshooting article versus buffering/EPG articles. The existing duplicate-shingle script finds zero substantial duplicate paragraph pairs, but it does not prove unique search intent or original research.

## 2. Article inventory

| # | Slug / URL | Source location | Primary keyword | Intent | SEO title / chars | Meta description / chars | Date |
|---:|---|---|---|---|---|---:|---|
| 1 | `/blog/how-to-install-iptv-on-firestick-2026` | `src/data/blog.ts:26-50` | how to install IPTV on Firestick | Informational how-to | How to Install IPTV on Firestick in 2026 / 40 | 151 | 2026-10-07 |
| 2 | `/blog/best-iptv-players-smart-tv-2026` | `src/data/blog.ts:51-76` | best IPTV player for Smart TV | Commercial-investigative comparison | Best IPTV Players for Smart TV in 2026 / 38 | 139 | 2026-10-07 |
| 3 | `/blog/xtream-codes-vs-m3u` | `src/data/blog.ts:77-101` | Xtream Codes vs M3U | Informational comparison | Xtream Codes vs M3U: Key Differences / 36 | 136 | 2026-10-07 |
| 4 | `/blog/iptv-buffering-fix-2026` | `src/data/blog.ts:102-126` | IPTV buffering | Informational troubleshooting | IPTV Buffering: Causes and Fixes / 32 | 144 | 2026-10-07 |
| 5 | `/blog/iptv-on-samsung-lg-smart-tv-2026` | `src/data/blog.ts:127-152` | IPTV on Smart TV | Informational platform setup | IPTV on Smart TV: Samsung and LG Setup / 38 | 129 | 2026-10-07 |
| 6 | `/blog/best-iptv-player-for-firestick-2026` | `src/data/blog.ts:153-178` | best IPTV player for Firestick | Commercial-investigative comparison | Best IPTV Player for Firestick in 2026 / 38 | 153 | 2026-10-07 |
| 7 | `/blog/iptv-epg-not-working-guide` | `src/data/blog.ts:179-203` | IPTV EPG not working | Informational troubleshooting | IPTV EPG Not Working: XMLTV Guide Fixes / 39 | 146 | 2026-10-07 |
| 8 | `/blog/iptv-on-apple-tv-2026` | `src/data/blog.ts:204-228` | IPTV on Apple TV | Informational platform setup | IPTV on Apple TV: tvOS Setup Guide / 34 | 143 | 2026-10-07 |
| 9 | `/blog/internet-speed-for-iptv` | `src/data/blog.ts:229-254` | internet speed for IPTV | Informational troubleshooting/planning | Internet Speed for IPTV: Wi-Fi and Ethernet / 43 | 145 | 2026-10-07 |
| 10 | `/blog/iptv-not-working-common-problems` | `src/data/blog.ts:255-…` | IPTV not working | Broad informational troubleshooting hub | IPTV Not Working: 15 Problems and Fixes / 39 | 146 | 2026-10-07 |

## 3. Article-by-article compliance matrix

Statuses use PASS, FAIL, PARTIAL, and NOT VERIFIED. “Editorial words” is the strict article-only count described above; the project script’s broader count is shown separately.

| Slug | Editorial-only words | Project script words | H2 / H3 | Opening words | FAQ | Internal contextual links | Image set | Overall article status |
|---|---:|---:|---:|---:|---:|---:|---|---|
| `how-to-install-iptv-on-firestick-2026` | 2,469 FAIL | 2,581 PASS | 18 / 5 | 36 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `best-iptv-players-smart-tv-2026` | 2,491 FAIL | 2,603 PASS | 20 / 5 | 38 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `xtream-codes-vs-m3u` | 2,452 FAIL | 2,553 PASS | 22 / 5 | 34 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `iptv-buffering-fix-2026` | 2,404 FAIL | 2,512 PASS | 22 / 5 | 32 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `iptv-on-samsung-lg-smart-tv-2026` | 2,431 FAIL | 2,536 PASS | 22 / 5 | 32 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `best-iptv-player-for-firestick-2026` | 2,396 FAIL | 2,509 PASS | 24 / 5 | 33 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `iptv-epg-not-working-guide` | 2,395 FAIL | 2,507 PASS | 24 / 5 | 31 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `iptv-on-apple-tv-2026` | 2,385 FAIL | 2,501 PASS | 25 / 5 | 30 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `internet-speed-for-iptv` | 2,416 FAIL | 2,527 PASS | 25 / 5 | 29 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |
| `iptv-not-working-common-problems` | 2,415 FAIL | 2,530 PASS | 26 / 5 | 31 PASS | 5 PASS | 2 PASS | hero + 2 section images | PARTIAL |

All 10 have unique titles, descriptions, slugs, answer-first openings, at least three H2s, a table, a conclusion/Next Step contextual CTA, five FAQs, and two contextual internal links. All 10 fail the literal one-image-per-H2 rule. All 10 have semantic keyword coverage in H2s, but none uses the full primary keyword phrase verbatim in an H2; classify that requirement PARTIAL rather than inventing a keyword match.

## 4. Metadata, keyword, and intent audit

### Verified PASS across all 10

- SEO title tags are unique and 32–43 characters after `seoTitle` is applied; all are below 60 characters.
- Primary keyword or a very close grammatical form begins the title; none is buried late in the title.
- Meta descriptions are unique, 129–153 characters, and contain the topic/keyword naturally.
- Slugs are lowercase, hyphenated, descriptive, and keyword-focused.
- Each rendered article has exactly one H1 matching the visible article title and intent.
- Each opening is 29–38 words and puts the target topic within the first 100 words.
- Each article has 18–26 H2s, well above the three-section minimum.
- Each article has five H3s used for visible FAQ questions; no H1-to-H3 skip was observed.
- Keywords are naturally distributed through headings/body data; no obvious stuffing pattern was found.
- Semantic terms are relevant: Fire OS, Tizen, webOS, Google TV, M3U, Xtream-compatible login, EPG/XMLTV, Wi-Fi, Ethernet, buffering, cache, device model, and app-store availability.

### PARTIAL / FAIL findings

- **Primary keyword exact H2 match: PARTIAL for all 10.** Each article has semantically relevant H2s—e.g. “Step-by-Step Firestick Setup,” “How M3U Works,” “EPG Troubleshooting Table”—but no full exact primary phrase in an H2. This is not automatically an SEO defect; it is a literal prompt requirement result.
- **Meaningful 2,500-word article threshold: FAIL for all 10 under the strict count.** The project script at `scripts/verify-blog-word-counts.mjs:3-10` includes FAQs and description/title fields. The strict count excludes FAQ, sources, related widgets, navigation, footer, and repeated template blocks. Do not claim the existing 10/10 script result proves 2,500 meaningful editorial words.
- **H3 hierarchy: PASS structurally, PARTIAL editorially.** H3s are only FAQ questions; body sections do not use H3 subsections. This is valid HTML hierarchy but gives long articles many H2s and no nested explanatory H3s.

## 5. Content and search-intent assessment

| Article group | Intent separation | Risk |
|---|---|---|
| Firestick installation vs Firestick player comparison | Distinct: procedure vs selection criteria | Moderate cannibalization if both target “best IPTV player for Firestick” language too heavily |
| Smart TV player comparison vs Samsung/LG setup | Distinct: multi-platform comparison vs platform-specific setup | Moderate overlap around app-store availability and player compatibility |
| Buffering vs EPG troubleshooting vs broad not-working hub | Distinct layers: playback/network vs guide data vs symptom hub | Broad hub should act as parent and link down; avoid repeating full fixes |
| Apple TV setup, speed planning, Xtream/M3U comparison | Distinct platform, network, and format intents | Low direct overlap |

The duplicate checker (`scripts/verify-blog-duplicates.mjs`) reports 0 substantial paragraph pairs. That is useful evidence against copied paragraphs, not proof that search intent cannot cannibalize. No search-volume, ranking, competitor, or PAA claims were made because no such evidence was available.

## 6. Image audit

### Asset inventory

All 30 article image references resolve to local WebP files. Every hero is 1200×630. Every section image is 800×500. No image exceeds the 80 KB optimization-candidate threshold; the largest recorded files are 58,962 bytes.

| Slugs | Hero asset size | Section assets | Section sizes | Alt / filename result |
|---|---:|---|---|---|
| Firestick install | 58,962 bytes | `firestick-player-login.webp`, `firestick-wifi-troubleshooting.webp` | 16,400 / 38,456 | PASS: descriptive and contextual |
| Smart TV players | 24,480 bytes | `samsung-lg-google-tv-apps.webp`, `remote-friendly-iptv-guide.webp` | 38,456 / 16,400 | PASS |
| Xtream vs M3U | 24,480 bytes | `playlist-login-fields.webp`, `epg-xmltv-mapping.webp` | 38,456 / 16,400 | PASS |
| Buffering | 58,962 bytes | `wifi-router-streaming-check.webp`, `ethernet-playback-stability.webp` | 16,400 / 38,456 | PASS |
| Samsung/LG | 24,480 bytes | `smart-tv-app-store-check.webp`, `webos-tizen-iptv-player.webp` | 38,456 / 16,400 | PASS |
| Firestick player | 58,962 bytes | `fire-tv-epg-favorites.webp`, `firestick-app-storage.webp` | 16,400 / 38,456 | PASS |
| EPG | 24,480 bytes | `xmltv-channel-mapping.webp`, `tv-guide-timezone-check.webp` | 38,456 / 16,400 | PASS |
| Apple TV | 24,480 bytes | `tvos-player-app-store.webp`, `apple-tv-remote-login.webp` | 38,456 / 16,400 | PASS |
| Internet speed | 58,962 bytes | `wifi-ethernet-speed-test.webp`, `router-streaming-stability.webp` | 16,400 / 38,456 | PASS |
| Not working | 58,962 bytes | `iptv-login-epg-buffering-check.webp`, `smartiflix-support-checklist.webp` | 16,400 / 38,456 | PASS |

### Literal image-per-H2 rule versus editorial usefulness

- Literal compliance: **FAIL for all 10.** Each article has 1 hero plus 2 section images and 18–26 article/template H2s. The source mapping is at `src/data/blog.ts:598-680`; rendering is at `src/app/blog/[slug]/page.tsx:123-128`.
- Editorial usefulness: **PARTIAL/PASS.** The two section images per article are placed after relevant headings, captioned, and visually related. A one-image-per-every-H2 implementation would create 20–30 images per article, repetitive visual noise, and materially worse loading cost. The literal requirement should be replaced with a reasonable “one hero plus two to three useful section images” editorial rule.
- Browser verification: the DOM rendered 3 article images and captions per article at both 390px and 1440px. Lazy section images were not all network-complete in a single scripted scroll, so “all lazy assets fully downloaded” is NOT VERIFIED; no broken source path was found.

### License/source evidence

`SMARTIFLIX_IMAGE_SOURCES.md:3-45` records two Pexels source assets and derivative crops, download date, dimensions, and transforms. It explicitly says the free-to-use license should be rechecked before launch. Therefore source traceability is PASS, production license confirmation is **NOT VERIFIED / OWNER ACTION REQUIRED**. No image was assumed licensed solely from the filename or source-site name.

## 7. FAQ and structured data

All 10 articles render five visible questions with substantive answers. The article template maps the same `article.faqs` array into FAQPage JSON-LD at `src/app/blog/[slug]/page.tsx:65-73`; exact question/answer consistency was verified from the shared data/rendered output. No rich-result guarantee is claimed.

All 10 rendered articles expose these JSON-LD types: `Organization`, `WebSite`, `BlogPosting`, `BreadcrumbList`, and `FAQPage`. BlogPosting headline, description, dates, image, author, publisher, and canonical article URL are sourced from the article record/template. The schema is structurally present; Google live rich-result validation was not run against a real production domain.

## 8. Internal-link audit

Each article has two contextual links in `article.contextualLinks`, plus the article CTA and related-guide links. The link checker reports 0 broken internal links, 0 hash links, 0 empty hrefs, and 0 placeholder links. Rendered article columns contained at least three contextual/internal links. Anchors are descriptive and topic-relevant; no obvious keyword-stuffed anchor pattern was found.

Target coverage includes devices, pricing, related setup guides, EPG, buffering, and the broad troubleshooting hub. No redirect-chain result is available without live deployment.

## 9. Freshness and credibility audit

### Verified or supported findings

- Amazon Fire TV source URLs returned HTTP 200 during the audit; the linked official documentation supports Fire TV app installation/developer context.
- Apple Support and Apple Developer source URLs returned HTTP 200.
- Google’s current official Google TV installation page was found at `https://support.google.com/googletv/answer/10050570/install-apps-on-google-tv`; the stored URL with only `?hl=en` returned 404 in the direct check, so the stored source should be updated in a future content maintenance pass.
- GitHub XMLTV repository returned HTTP 200; the wiki URL returned 403, so XMLTV facts were not independently verified through that wiki in this run.
- Samsung, LG, and Netflix URLs returned 403 to the audit HTTP client; this is access denial, not proof that the pages are invalid.
- Stored Google Home and YouTube source URLs returned 404 and should be reviewed before publication. Do not silently retain them as current citations.

### Current-fact and credibility status

- Each article contains at least two source links, but “two current verifiable facts per article” is **PARTIAL**, not PASS, because source accessibility and current-device/software freshness were not fully established for every claim.
- No unsupported statistics, search volumes, rankings, subscriber counts, guaranteed performance claims, fabricated hands-on tests, or fake reviews were found.
- Article language generally distinguishes provider/service access, player software, device compatibility, network conditions, and source-side behavior.
- No unverified broadcasting-rights claim was found. The copy avoids asserting official partnerships or rights.
- Dates are uniformly `2026-10-07`; this is a content date, not independently verified publication history. Date provenance is NOT VERIFIED.
- Procedures are cautiously written, but app menus, Fire OS/tvOS behavior, TV model availability, and store policies are time- and region-sensitive. Future refreshes should verify each platform-specific instruction against current official documentation.

## 10. Browser and technical SEO verification

Production-like local server was run with an explicit isolated test origin. Ten article URLs were checked at 390px and 1440px:

- 20/20 returned HTTP 200.
- 20/20 had exactly one H1.
- 20/20 rendered one table.
- 20/20 rendered three article images in the DOM.
- 20/20 had no horizontal overflow.
- 20/20 exposed BlogPosting, BreadcrumbList, and FAQPage JSON-LD.
- Console/page errors: none recorded.
- Rendered article-column counts (including article template, FAQ, source list, and article content) ranged from 2,698 to 2,821; these are not the strict editorial-only counts in Section 3.

Canonical and Open Graph implementation is present at `src/app/blog/[slug]/page.tsx:19-33`, but a real production domain is not configured. Local test-origin URLs must not be treated as live canonical URLs or submitted to Search Console.

## 11. Scoring

The requested requirements matrix contains 24 independently recorded requirement groups per article, 240 article-level rows in the CSV. Using the strict interpretation:

- PASS: 190
- PARTIAL: 30
- FAIL: 20
- NOT VERIFIED: 0 in the matrix rows; separate external/license/live-domain limitations are explicitly called out below.

This aggregate must not be read as “ready”: the 20 FAIL rows are the strict 2,500-word and one-image-per-H2 findings repeated across all 10 articles, and the PARTIAL rows include exact-H2-keyword, canonical/live-origin, and freshness/source-evidence limits.

## 12. Prioritized issues

| Priority | Issue | Evidence | Recommended correction |
|---|---|---|---|
| P1 | Strict article-only word count below 2,500 for all 10 | `src/data/blog.ts:593-700`; strict counts 2,385–2,491 | Add genuinely useful topic-specific depth or formally revise the editorial threshold; do not pad or count repeated FAQ/template text |
| P1 | Current source URLs include 404s | Stored Google TV, Google Home, and YouTube URLs; HTTP checks above | Replace with current official URLs after editorial review |
| P1 | Production domain absent | `src/lib/site.ts`; canonical/OG/schema require `NEXT_PUBLIC_SITE_ORIGIN` | Owner must provide the real HTTPS hostname; do not guess |
| P2 | Literal image per H2 requirement fails | 2 section images against 18–26 H2s/article | Replace the literal requirement with an editorial image-density rule, or explicitly accept the current two-section-image model |
| P2 | Exact primary keyword absent from H2 wording | Semantic H2 matches exist but no full phrase matches | Add exact phrase only where natural; avoid awkward repetition |
| P2 | Date provenance and platform freshness not independently established | Uniform 2026-10-07 dates; platform sources partly blocked/404 | Maintain source review dates and refresh time-sensitive instructions |
| P2 | Cannibalization adjacency | Firestick, Smart TV, buffering/EPG/hub clusters | Clarify parent/child intent, strengthen unique introductions, and avoid repeating full diagnostic sections |
| P3 | Lazy image completion not fully verified by scripted scroll | Section images remained lazy/unloaded in the automated pass | Run a production browser trace with incremental scrolling or verify via network trace; do not eagerly load every section image by default |

## 13. Tests and limitations

Executed:

- `npm run qa:blog:words` — 10/10 under the project’s broad count.
- `npm run qa:blog:forensics` — PASS.
- `npm run qa:blog:duplicates` — 0 substantial duplicate pairs.
- Asset dimensions/format/file-size audit with Sharp.
- Production-like Chromium render of all 10 article routes at 390px and 1440px.
- H1, H2/H3, table, image DOM, JSON-LD, internal-link, overflow, console-error checks.
- HTTP source checks for all unique stored source URLs.
- Official-source web lookup for Amazon Fire TV and current Google TV installation documentation.

Not verified:

- Google Search Console indexing, rankings, or rich-result eligibility on a live domain.
- True field freshness/accuracy of every platform procedure.
- License permission confirmation from the asset owner/source record.
- Search volume, competitor rankings, PAA, or external originality comparison.
- Fully loaded lazy-image network completion for every article in every viewport.

## 14. Final verdict

**NOT READY as fully compliant with the supplied article prompt.** The articles are technically well structured, internally linked, source-traceable, and distinct enough to be useful, but all 10 fail the strict meaningful-2,500-word requirement and all 10 fail the literal one-image-per-H2 requirement. Several stored source URLs need maintenance, and live domain/license/freshness verification remains external. The existing project word-count PASS should not be used as the final editorial compliance claim.
