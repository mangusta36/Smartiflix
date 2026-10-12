"use client";

import { useState } from "react";
import { deviceCounts, deviceLabel, formatPrice, getEligiblePaymentPrice, plans, type DeviceCount } from "@/data/pricing";
import { whatsappIntentUrl, whatsappOrderUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ButtonLink";

const includedFeatures = [
  "IPTV subscription access",
  "Compatible device setup guidance",
  "Common Smart TV setup guidance",
  "Fire TV / Firestick guidance",
  "Android TV / Google TV guidance",
  "Apple TV compatibility guidance",
  "Mobile, tablet, and computer options",
  "Xtream Codes / M3U guidance where applicable",
  "EPG guidance where applicable",
  "Playback troubleshooting guidance",
  "Direct WhatsApp support inquiry",
  "Multiple device plan options",
];

export function PricingSelector({ compact = false }: { compact?: boolean }) {
  const [devices, setDevices] = useState<DeviceCount>(1);
  return (
    <div>
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-[#F6EFE2]">Select devices</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose number of devices">
          {deviceCounts.map((count) => (
            <button key={count} type="button" onClick={() => setDevices(count)} className={`min-h-10 rounded-sm border px-4 text-sm font-semibold transition ${devices === count ? "border-[#D6A756] bg-[#D6A756] text-[#081412]" : "border-[#314942] bg-[#10231F] text-[#D7E0DB] hover:border-[#D6A756]"}`} aria-pressed={devices === count}>
              {deviceLabel(count)}
            </button>
          ))}
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? "md:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-4"}`}>
        {plans.map((plan, index) => {
          const basePrice = plan.prices[devices];
          const eligiblePrice = getEligiblePaymentPrice(basePrice);
          const features = compact ? includedFeatures.slice(0, 6) : includedFeatures;
          return (
            <article key={plan.duration} className={`flex flex-col rounded-none border bg-[#10231F] p-5 ${index === 2 ? "border-[#D6A756]" : "border-[#233B35]"}`}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-[#F6EFE2]">{plan.duration} Plan</h3>
                <span className="text-xs text-[#D6A756]">↗</span>
              </div>
              <p className="mt-2 text-sm text-[#9CAEA6]">for {deviceLabel(devices)}</p>
              <p className="mt-5 text-4xl font-semibold text-[#F6EFE2]">{formatPrice(basePrice)}</p>
              <p className={`mt-4 border-t border-[#233B35] pt-4 text-sm leading-6 text-[#9CAEA6] ${compact ? "min-h-24" : "min-h-16"}`}>{plan.note}</p>
              <div className="mt-4 border-y border-[#233B35] py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D6A756]">Included</p>
                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#B8C7C0]">
                  {features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
              </div>
              <div className="mt-4 bg-[#0B1916] p-3 text-xs leading-5 text-[#B8C7C0]">
                <p className="font-semibold text-[#F6EFE2]">Eligible payment method: save 10%</p>
                <p className="mt-1">{formatPrice(eligiblePrice)} with eligible payment method.</p>
              </div>
              <ButtonLink href={whatsappOrderUrl(plan.duration, devices)} className="mt-5 w-full">Order Now</ButtonLink>
            </article>
          );
        })}
      </div>
      <div className="mt-5 border border-[#233B35] bg-[#10231F] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#D6A756]">Payment savings</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#B8C7C0]">Save 10% with eligible payment methods. Eligible payment methods without the applicable added payment charge qualify for a 10% reduction from the listed plan price. Confirm the eligible payment option when ordering.</p>
        <ButtonLink href={whatsappIntentUrl("pricing")} variant="plain" className="mt-3 inline-block">Ask About Payment Options</ButtonLink>
      </div>
    </div>
  );
}
