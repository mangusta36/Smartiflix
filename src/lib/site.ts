/**
 * The public identity of the site must not depend on a deployment hostname or
 * request Host header. This constant is intentionally used in local builds too:
 * local pages remain browsable while their SEO output describes production.
 */
export const CANONICAL_ORIGIN = "https://www.tvsmartiflix.online";

export const site = {
  name: "Smartiflix",
  origin: CANONICAL_ORIGIN,
  description: "Smartiflix offers IPTV subscription plans with device-count options, setup guidance, and WhatsApp support.",
};

export function assertProductionOrigin() {
  const origin = new URL(CANONICAL_ORIGIN);
  if (origin.protocol !== "https:" || origin.hostname !== "www.tvsmartiflix.online" || origin.pathname !== "/") {
    throw new Error("The canonical origin must remain https://www.tvsmartiflix.online");
  }
  return origin.origin;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.origin).toString();
}
