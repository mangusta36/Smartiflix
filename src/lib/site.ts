const LOCAL_ORIGIN = "http://localhost:3000";

function normalizeOrigin(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    const isLocalHttp = url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
    if (url.protocol !== "https:" && !isLocalHttp) return null;
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    return url.origin;
  } catch {
    return null;
  }
}

const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_ORIGIN);

export const site = {
  name: "Smartiflix",
  origin: configuredOrigin || LOCAL_ORIGIN,
  description: "Smartiflix offers IPTV subscription plans with device-count options, setup guidance, and WhatsApp support.",
};

export const isProductionDomainResolved = configuredOrigin?.startsWith("https://") === true
  && !configuredOrigin.endsWith(".localhost")
  && !configuredOrigin.endsWith(".test")
  && !configuredOrigin.includes(".invalid")
  && !configuredOrigin.includes(".example");

export function assertProductionOrigin() {
  const rawOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN;
  const origin = normalizeOrigin(rawOrigin);
  const isTestOrigin = origin?.endsWith(".localhost") || origin?.endsWith(".test");
  const allowTestOrigin = process.env.SMARTIFLIX_ALLOW_TEST_ORIGIN === "1";
  if (!origin || !origin.startsWith("https://") || origin.includes(".invalid") || origin.includes(".example") || (isTestOrigin && !allowTestOrigin)) {
    throw new Error("NEXT_PUBLIC_SITE_ORIGIN must be an explicit HTTPS production origin. Use SMARTIFLIX_ALLOW_TEST_ORIGIN=1 only for isolated local QA builds.");
  }
  return origin;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.origin).toString();
}
