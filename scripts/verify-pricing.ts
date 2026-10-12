import { deviceCounts, getPlanPrice, plans } from "../src/data/pricing";
import { whatsappOrderUrl } from "../src/lib/whatsapp";

const expected = {
  "1 Month": [27, 49, 73, 97, 122],
  "3 Months": [37, 67, 100, 133, 167],
  "6 Months": [47, 85, 127, 169, 212],
  "12 Months": [67, 121, 181, 241, 302],
} as const;

let correct = 0;
let total = 0;

for (const plan of plans) {
  deviceCounts.forEach((devices, index) => {
    total += 1;
    const price = getPlanPrice(plan.duration, devices);
    const expectedPrice = expected[plan.duration][index];
    const orderUrl = decodeURIComponent(whatsappOrderUrl(plan.duration, devices));
    const label = `${devices} ${devices === 1 ? "device" : "devices"}`;
    const ok = price === expectedPrice && orderUrl.includes(`${plan.duration} plan for ${label} ($${expectedPrice}).`);
    if (ok) correct += 1;
    else console.error(`Mismatch: ${plan.duration}, ${label}, got ${price}, expected ${expectedPrice}`);
  });
}

console.log(`Pricing verification: ${correct}/${total} correct`);
if (correct !== 20 || total !== 20) process.exit(1);
