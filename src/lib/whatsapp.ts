import { deviceLabel, type DeviceCount, getPlanPrice, type PlanDuration } from "@/data/pricing";

const WHATSAPP_NUMBER = "212753936672";
const base = `https://wa.me/${WHATSAPP_NUMBER}`;

export const whatsappNumber = WHATSAPP_NUMBER;

export type WhatsAppIntent = "trial" | "support" | "reseller" | "pricing";

export function whatsappUrl(message: string) {
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsappIntentUrl(intent: WhatsAppIntent) {
  const messages: Record<WhatsAppIntent, string> = {
    trial: "Hi Smartiflix, I'd like to request a free trial.",
    support: "Hi Smartiflix, I need some help.",
    reseller: "Hi Smartiflix, I'm interested in becoming a reseller.",
    pricing: "Hi Smartiflix, I have a question about your plans.",
  };
  return whatsappUrl(messages[intent]);
}

export function whatsappOrderUrl(duration: PlanDuration, devices: DeviceCount) {
  const price = getPlanPrice(duration, devices);
  return whatsappUrl(`Hi Smartiflix, I'd like the ${duration} plan for ${deviceLabel(devices)} ($${price}).`);
}
