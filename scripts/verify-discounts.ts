import { getEligiblePaymentPrice, plans, type DeviceCount } from "../src/data/pricing";

const expected: Record<string, Record<DeviceCount, number>> = {
  "1 Month": { 1: 24.3, 2: 44.1, 3: 65.7, 4: 87.3, 5: 109.8 },
  "3 Months": { 1: 33.3, 2: 60.3, 3: 90, 4: 119.7, 5: 150.3 },
  "6 Months": { 1: 42.3, 2: 76.5, 3: 114.3, 4: 152.1, 5: 190.8 },
  "12 Months": { 1: 60.3, 2: 108.9, 3: 162.9, 4: 216.9, 5: 271.8 },
};

let checked = 0;

for (const plan of plans) {
  for (const [device, basePrice] of Object.entries(plan.prices)) {
    const deviceCount = Number(device) as DeviceCount;
    const actual = Number(getEligiblePaymentPrice(basePrice).toFixed(2));
    const wanted = expected[plan.duration][deviceCount];
    checked += 1;
    if (actual !== wanted) {
      throw new Error(`${plan.duration} ${deviceCount} device discount expected ${wanted}, received ${actual}`);
    }
  }
}

console.log(`Discount verification: ${checked}/20 correct`);
