export const faqGroups = [
  {
    title: "Smartiflix basics",
    items: [
      { q: "What is Smartiflix?", a: "Smartiflix is a subscription service for IPTV viewing across compatible devices. The site shows plan lengths, device-count options, setup expectations, and the WhatsApp path for trial, order, and support inquiries." },
      { q: "Is the brand Smartiflix or Smartiflix IPTV?", a: "The visible brand is Smartiflix. People may search for Smartiflix IPTV when looking for the service category, but the company name shown on this website remains Smartiflix." },
    ],
  },
  {
    title: "Plans and devices",
    items: [
      { q: "How do device counts work?", a: "Choose the number of devices you want covered by the plan. If you use one television only, one device may be enough. If several household devices need access, select the matching count before ordering." },
      { q: "Can I ask a pricing question before ordering?", a: "Yes. Use the pricing question or support WhatsApp action if you are unsure which plan or device count fits your setup." },
    ],
  },
  {
    title: "Setup and support",
    items: [
      { q: "Which devices can I use?", a: "Common options include Fire TV or Firestick, Android TV, Google TV, Samsung Smart TV, LG Smart TV, Apple TV, phones, tablets, and computers. Compatibility can depend on the model, operating system, available player, login format, app-store access, and network environment." },
      { q: "How does setup usually work?", a: "Choose a plan and device count, contact Smartiflix, receive the applicable access and setup information, configure a compatible player or device, and contact support if help is required." },
      { q: "What should I do if playback is not working as expected?", a: "Check the device, player app, network connection, and any setup details you received. If the issue remains, contact Smartiflix support through WhatsApp with your device type and a clear description of the problem." },
    ],
  },
  {
    title: "Reseller inquiries",
    items: [
      { q: "Does Smartiflix accept reseller inquiries?", a: "Smartiflix provides a reseller inquiry path through WhatsApp. Specific terms, pricing, and operational details are not published on this website and should be discussed directly." },
    ],
  },
];

export const allFaqItems = faqGroups.flatMap((group) => group.items);
