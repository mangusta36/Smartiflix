# Smartiflix Production and Google Search Console Readiness

Date: 2026-10-12

## Current status

**READY WITH EXTERNAL BLOCKERS.** The application is technically buildable and SEO URL generation is now centralized and guarded, but production deployment/indexing is blocked until the owner supplies the real HTTPS hostname.

## Domain configuration

- `NEXT_PUBLIC_SITE_ORIGIN` is the only accepted canonical-origin input.
- `src/lib/site.ts` normalizes trailing slashes, accepts HTTPS origins, permits localhost HTTP only for local development, and rejects malformed URLs, credentials, query/hash values, `.invalid`, `.example`, and unapproved test origins in release validation.
- Missing/invalid origin no longer emits the old `smartiflix-domain-unset.invalid` fallback. Local development uses `http://localhost:3000`; production release validation blocks without an explicit origin.
- `.env.example` documents the required variable with an unmistakable placeholder.
- `npm run build` now runs `npm run qa:origin` first.
- Isolated QA build used: `NEXT_PUBLIC_SITE_ORIGIN=https://smartiflix.localhost SMARTIFLIX_ALLOW_TEST_ORIGIN=1`.

## Local production-mode verification

With the explicit test origin, all checked canonical URLs began with `https://smartiflix.localhost`, robots pointed to `https://smartiflix.localhost/sitemap.xml`, and sitemap URLs contained no invalid fallback hostname. The sitemap contained the expected static and article URL set.

This test hostname is not the production domain and must not be submitted to Google.

## Not verifiable yet

- Real production hostname and DNS.
- Live HTTPS/TLS certificate.
- Apex/www redirect policy.
- Deployment availability and parity.
- Live security/cache headers.
- Google Search Console ownership, URL Inspection, sitemap submission, coverage, indexing, or rankings.

## Owner action required

Set `NEXT_PUBLIC_SITE_ORIGIN` to the real Smartiflix HTTPS origin in the deployment environment. Do not guess a domain from the brand name. Then run the release checks, inspect live canonical/robots/sitemap output, verify HTTPS and redirects, and submit the live sitemap in Search Console.

## Other release blockers / decisions

- Image ledger entries in `SMARTIFLIX_IMAGE_SOURCES.md` still require owner/license evidence confirmation before launch.
- Legal pages remain informational code content; jurisdiction, cancellation, refund, and commercial-policy decisions require owner/legal review and were not invented.
- No deployment or GSC access was performed.
