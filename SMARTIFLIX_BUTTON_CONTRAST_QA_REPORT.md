# Smartiflix Button Contrast QA Report

Date: 2026-10-12  
Browser: Chromium via Playwright  
Viewports: 320, 375, 390, 768, 1024, 1440, 1920px for homepage; representative routes at 390 and 1440px.

## Result

**FIXED.** The shared CTA regression was caused by the unlayered global `a { color: inherit }` rule in `globals.css` overriding Tailwind v4 utility-layer color rules. The reset now lives in `@layer base`, allowing `text-[#081412]` to apply.

The focus treatment now combines a gold outline with a dark outer ring, preserving visible keyboard focus against gold, ivory, and dark surfaces.

## Before / after measurements

Contrast was calculated from Chromium computed RGB colors using WCAG relative luminance.

| Variant/state | Before | After | Result |
|---|---:|---:|---|
| Primary default: light text on `#D6A756` | 1.85:1 | 8.51:1 | WCAG AA pass |
| Primary hover: light text on `#E2B96E` | unresolved light-text failure | 8.77:1 | WCAG AA pass |
| Primary active: light text on active gold | unresolved light-text failure | 10.11:1 | WCAG AA pass |
| Secondary default: light text on `#F6EFE2` | 1.04:1 | 16.41:1 | WCAG AA pass |
| Secondary hover | unresolved light-text failure | 16.41:1 | WCAG AA pass |
| Primary keyboard focus | gold outline blended with gold surface | dark outer ring plus gold outline | Focus visibly distinguishable |

The intended foreground is now computed as `rgb(8, 20, 18)` (`#081412`) for primary and secondary CTAs. Tested labels included Explore plans, Request a trial, Order Now, See Plans, Read FAQ, Become a Reseller, and WhatsApp Support.

## Focus and interaction QA

- Homepage CTA received keyboard focus with `:focus-visible` active.
- Computed focus styling included a 3px gold outline and dark outer box-shadow ring.
- Mobile menu opened with `aria-expanded="true"` and rendered `#mobile-menu`.
- FAQ keyboard/click interaction changed `aria-expanded` from false to true.
- Pricing selector click changed the selected device from `1 device` to `2 devices`.
- CTA tap heights remained approximately 40–42px.
- No console errors or page errors were recorded in the completed browser checks.

## Responsive route QA

Completed 26 route checks at 390px and 1440px across all static routes plus three representative article pages: all returned 200, had one H1, and had no horizontal overflow after DOM content loaded. Homepage overflow checks at 320, 375, 768, 1024, and 1920px also passed.

## Files changed

- `src/app/globals.css:33-43` — moved reset into base layer and added dual focus ring.
- `src/components/ButtonLink.tsx` — no variant redesign or pricing/WhatsApp behavior change; existing intended dark utility colors now apply correctly.

## Remaining limitation

This is lab QA, not field Core Web Vitals or assistive-technology certification. A final release should repeat the checks in the deployed browser matrix once the owner supplies the real production domain.
