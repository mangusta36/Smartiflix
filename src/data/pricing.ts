export type DeviceCount = 1 | 2 | 3 | 4 | 5;
export type PlanDuration = "1 Month" | "3 Months" | "6 Months" | "12 Months";

export const deviceCounts: DeviceCount[] = [1, 2, 3, 4, 5];

export const plans: { duration: PlanDuration; prices: Record<DeviceCount, number>; note: string }[] = [
  { duration: "1 Month", prices: { 1: 27, 2: 49, 3: 73, 4: 97, 5: 122 }, note: "A short plan for trying Smartiflix on the devices you use most." },
  { duration: "3 Months", prices: { 1: 37, 2: 67, 3: 100, 4: 133, 5: 167 }, note: "A balanced option for households that know their viewing setup." },
  { duration: "6 Months", prices: { 1: 47, 2: 85, 3: 127, 4: 169, 5: 212 }, note: "A longer plan for stable device arrangements." },
  { duration: "12 Months", prices: { 1: 67, 2: 121, 3: 181, 4: 241, 5: 302 }, note: "The longest Smartiflix subscription option currently shown." },
];

export function deviceLabel(count: DeviceCount) {
  return `${count} ${count === 1 ? "device" : "devices"}`;
}

export function getPlanPrice(duration: PlanDuration, devices: DeviceCount) {
  const plan = plans.find((item) => item.duration === duration);
  if (!plan) throw new Error(`Unknown plan duration: ${duration}`);
  return plan.prices[devices];
}

export function getEligiblePaymentPrice(basePrice: number) {
  return basePrice * 0.9;
}

export function formatPrice(price: number) {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}
