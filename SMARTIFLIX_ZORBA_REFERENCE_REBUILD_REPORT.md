# Smartiflix Zorba Reference Rebuild Report

## Reference Analyzed

Reference website: https://www.zorbatv.us/

Live reference was inspected at 1440px, 768px, and 390px. Reference screenshots were saved in `qa-zorba-reference/` as:

- `zorba-reference-1440.png`
- `zorba-reference-768.png`
- `zorba-reference-390.png`

Key observed reference traits:

- Header height: about 83px desktop, 71px tablet/mobile.
- Hero height: about 706px desktop, 662px tablet, 624px mobile.
- Desktop H1: about 78px, serif display, regular weight, tight line height.
- Tablet H1: about 55px.
- Mobile H1: about 47px.
- Section system: long dark homepage with alternating near-black and green-black surfaces.
- CTA system: compact tan buttons, thin borders, square/small-radius treatment.
- Pricing: uppercase label, large editorial heading, device selector, four bordered cards, trial CTA below.
- Cards/lists: thin borders, minimal iconography, dense copy, no SaaS-style decorative cards.
- Footer: dark, compact, multi-column link groups.

## Reference Homepage Section Order

1. Header
2. Hero
3. Subscriptions / pricing
4. Experience
5. What it is
6. Watch your way
7. Device compatibility
8. How it works
9. Players and logins
10. Why Zorba IPTV
11. Setup help
12. Live sports prep
13. Streaming quality
14. Setup paths
15. FAQ
16. Final CTA
17. Footer

## Smartiflix Final Section Order

1. Header
2. Hero
3. Pricing
4. Trial micro-CTA
5. Experience
6. What is Smartiflix?
7. Watch your way
8. Device compatibility
9. How Smartiflix works
10. Players and login formats
11. Why Smartiflix
12. Setup help
13. Viewing preparation
14. Streaming quality
15. Setup paths
16. FAQ
17. Final CTA
18. Footer

The sports/blog-dependent reference block was adapted into static Smartiflix viewing-preparation content because Smartiflix has zero published blog articles.

## Visual Similarities Intentionally Reproduced

- Dark commercial IPTV visual language.
- Serif display headings with large editorial scale.
- Tan primary CTA treatment.
- Thin bordered cards and link rows.
- Pricing placed high on the homepage.
- Long-form content depth and vertical rhythm.
- Alternating dark section surfaces.
- Numbered process treatment.
- Device/setup sections using compact editorial blocks.
- FAQ as a restrained bordered accordion.
- Footer as a dense dark link structure.

## Required Smartiflix Differences

- Brand remains Smartiflix.
- Copy is original Smartiflix prose, not copied reference prose.
- Pricing uses `src/data/pricing.ts`.
- WhatsApp uses `src/lib/whatsapp.ts`.
- Blog remains empty.
- No fake blog cards or article links were added.
- No Zorba assets were copied.

## Component and File Changes

- Rebuilt homepage: `src/app/page.tsx`
- Updated global visual system: `src/app/globals.css`
- Updated header/footer/brand/button/pricing/FAQ styling:
  - `src/components/Header.tsx`
  - `src/components/Footer.tsx`
  - `src/components/Brand.tsx`
  - `src/components/ButtonLink.tsx`
  - `src/components/PricingSelector.tsx`
  - `src/components/FaqAccordion.tsx`
- Updated image usage documentation: `SMARTIFLIX_IMAGE_SOURCES.md`

## Header Comparison

Reference uses a dark, compact header with small navigation and a tan CTA. Smartiflix now uses the same dark header rhythm, 83px desktop height, compact navigation, Smartiflix brand text, and a tan Free Trial CTA. Mobile uses the same compact menu behavior already present in the app.

## Hero Comparison

Reference has a dark hero, uppercase eyebrow, large serif H1, concise paragraph, two CTAs, and a large entertainment image to the right. Smartiflix now mirrors that hierarchy with original copy:

`Smartiflix for simple home streaming.`

The hero uses the local sourced living-room WebP instead of copying reference imagery.

## Pricing Comparison

Smartiflix pricing now follows the reference structure:

- Uppercase label.
- Large split editorial heading.
- Short explanatory paragraph.
- Device selector.
- Four bordered subscription cards.
- Trial micro-CTA beneath pricing.

Rendered browser pricing verification:

- 1 device: $27, $37, $47, $67
- 2 devices: $49, $67, $85, $121
- 3 devices: $73, $100, $127, $181
- 4 devices: $97, $133, $169, $241
- 5 devices: $122, $167, $212, $302

## Content-Depth Comparison

Reference is a substantial homepage, not a thin landing page. Smartiflix now has 15 main homepage sections plus header/footer, with approximately 1,689 visible words at 1440px and 1,682 visible words at 768px/390px.

## Device-Section Comparison

Reference uses device setup paths as compact cards/links. Smartiflix now includes:

- Smartiflix on Firestick and Fire TV
- Smartiflix on Smart TVs
- Smartiflix on Android TV and Google TV
- Smartiflix on mobile, tablet and computer

All link to `/devices`, not fake blog posts.

## How-It-Works Comparison

Reference uses numbered editorial steps. Smartiflix now uses:

1. Choose your Smartiflix subscription plan
2. Review your order details
3. Prepare your device and compatible player
4. Complete the applicable setup

## FAQ Comparison

Reference uses a dark FAQ section with bordered accordion rows. Smartiflix now uses the same visual direction while pulling from existing Smartiflix FAQ data.

## Footer Comparison

Reference footer is compact, dark, and multi-column. Smartiflix footer now uses:

- Smartiflix Explore
- Smartiflix Company
- Smartiflix Information
- Support

No fake socials or Zorba URLs were added.

## Image Replacements and Source Evidence

No Zorba images were copied. Existing sourced Smartiflix WebP images were reused because they are local, optimized, and already documented.

- `public/images/smartiflix-living-room.webp`
  - Source: https://www.pexels.com/photo/modern-living-room-with-tv-5490300/
  - Use: hero and entertainment image role.
- `public/images/smartiflix-remote.webp`
  - Source: https://www.pexels.com/photo/hand-holding-a-black-remote-control-5207535/
  - Use: secondary entertainment/device image role.

## Original-Copy Confirmation

Smartiflix copy was written from scratch around Smartiflix plans, devices, players, setup, WhatsApp support, and empty-blog constraints. It was not generated by global-search-replacing the reference brand.

## Blog Verification

- `/blog` exists.
- Published articles remain 0.
- Homepage fake blog links: 0.
- Fake article slugs: 0.
- Sitemap includes `/blog` only, not article URLs.

## Cross-Brand Scan

Customer-facing source/output scan targets:

- Zorba
- ZorbaTV
- Zorba IPTV
- zorbatv.us
- zorba.network
- Wizard TV
- Wizard IPTV
- FreeGoTV
- EagleCast
- ChannelMoa
- MoaTV
- KroozTV

Result in `src` and `public`: 0 customer-facing references.

The reference URL appears only in this report as the requested design reference.

## WhatsApp Verification

Official Smartiflix number remains:

`212753936672`

Verified WhatsApp links use Smartiflix messages for:

- Free Trial
- Pricing/order actions
- Support
- Reseller

Wrong WhatsApp numbers: 0.

## Screenshots

Final Smartiflix screenshots:

- `qa-zorba-reference/smartiflix-final-1440.png`
- `qa-zorba-reference/smartiflix-final-768.png`
- `qa-zorba-reference/smartiflix-final-390.png`

Comparison rounds completed:

- Round 1: structure and proportions.
- Round 2: typography, footer hierarchy, content depth.
- Round 3: responsive polish, final content depth, final screenshots.

## Technical Validation

- `npm run lint`: PASS
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- `npm run qa:pricing`: PASS, 20/20 correct
- `npm run qa:links`: PASS
  - broken internal links: 0
  - `href="#"`: 0
  - empty links: 0
  - placeholder links: 0

## Production Domain Status

Production domain remains: UNRESOLVED

## SMARTIFLIX — ZORBATV REFERENCE REBUILD VERIFICATION

Reference analyzed live: PASS
Homepage architecture matched: PASS
Visual direction matched: PASS
Header matched closely: PASS
Hero matched closely: PASS
Pricing presentation matched closely: PASS
Content density comparable: PASS
Device presentation comparable: PASS
Process/setup presentation comparable: PASS
FAQ presentation comparable: PASS
Footer presentation comparable: PASS

Smartiflix branding original: PASS
Smartiflix copy original: PASS
Zorba customer-facing references: 0
Other cross-brand leakage: 0

Published blog articles: 0
Fake blog/article links: 0
Zorba article slugs copied: 0

Pricing: 20/20 correct
Pricing centralized: PASS
WhatsApp regression: PASS
Wrong WhatsApp numbers: 0

Homepage visible words: 1689 desktop / 1682 tablet-mobile
Unsupported claims: 0
Fake reviews/testimonials/statistics: 0

1440px comparison: PASS
768px comparison: PASS
390px comparison: PASS
Horizontal overflow: 0

Broken internal links: 0
href="#": 0

Lint: PASS
TypeScript: PASS
Production build: PASS

Production domain: UNRESOLVED

FINAL VERDICT:

REFERENCE REBUILD READY FOR OWNER REVIEW
