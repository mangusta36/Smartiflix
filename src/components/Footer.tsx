import Link from "next/link";
import { Brand } from "@/components/Brand";
import { ButtonLink } from "@/components/ButtonLink";
import { whatsappIntentUrl } from "@/lib/whatsapp";

const groups = {
  "Smartiflix Explore": [["Pricing", "/pricing"], ["Blog", "/blog"], ["FAQ", "/faq"], ["Free Trial", whatsappIntentUrl("trial")]],
  "Smartiflix Company": [["Reseller", "/reseller"]],
  "Smartiflix Information": [["Privacy", "/privacy"], ["Terms", "/terms"], ["Refund", "/refund"], ["Disclaimer", "/disclaimer"]],
};

export function Footer() {
  return (
    <footer className="border-t border-[#233B35] bg-[#081412] py-14">
      <div className="container grid gap-10 lg:grid-cols-[1.4fr_2fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#9CAEA6]">Smartiflix keeps plan selection, device guidance, and support contact paths simple so customers can ask clear questions before they order.</p>
        </div>
        <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
          {Object.entries(groups).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-semibold text-[#F6EFE2]">{title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-[#9CAEA6]">
                {links.map(([label, href]) => <li key={href}><Link className="hover:text-[#D6A756]" href={href}>{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#F6EFE2]">Support</h2>
          <ButtonLink href={whatsappIntentUrl("support")} className="mt-4">WhatsApp Support</ButtonLink>
        </div>
      </div>
    </footer>
  );
}
