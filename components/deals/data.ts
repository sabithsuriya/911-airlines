import type { QuickAction, DealOffer, WhyBookFeature } from "./types";

export const quickActions: QuickAction[] = [
  {
    id: "flight-tracker",
    label: "Flight Tracker",
    icon: "PlaneTakeoff",
    badge: "Pro",
    href: "/flight-tracker",
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: "CreditCard",
    badge: "Free",
    href: "/credit-card",
  },
  {
    id: "group-booking",
    label: "Group Booking",
    icon: "Users",
    badge: null,
    href: "/group-booking",
  },
  {
    id: "plan",
    label: "Plan",
    icon: "MapPinned",
    badge: null,
    href: "/plan",
  },
  {
    id: "fare-alerts",
    label: "Fare Alerts",
    icon: "BellRing",
    badge: null,
    href: "/fare-alerts",
  },
];

export const dealOffers: DealOffer[] = [
  {
    id: "icici-emi",
    category: "flights",
    brand: "ICICI Bank",
    brandLogoText: "ICICI Bank",
    headline: "Up to ₹7,500 Off",
    bullets: ["on Flights with ICICI Bank Credit Card EMI"],
    accent: "amber",
    footnote: "T&C Apply",
    href: "/deals/icici-emi",
  },
  {
    id: "hdfc-domestic",
    category: "flights",
    brand: "HDFC Bank",
    brandLogoText: "HDFC Bank",
    headline: "Get up to ₹2,000 Off",
    bullets: [
      "on Domestic Flights with HDFC Bank Credit Card + Interest Free EMI",
    ],
    accent: "rose",
    footnote: "T&C Apply",
    href: "/deals/hdfc-domestic",
  },
  {
    id: "axis-flat",
    category: "flights",
    brand: "Axis Bank",
    brandLogoText: "Axis Bank",
    headline: "Flat 12% Off",
    bullets: [
      "on Flights with Axis Bank Credit Cards + Interest Free EMI",
    ],
    accent: "sky",
    footnote: "T&C Apply",
    href: "/deals/axis-flat",
  },
  {
    id: "911-credit-card",
    category: "bankOffers",
    brand: "911 Airlines Credit Card",
    brandLogoText: "911 Airlines",
    headline: "911 Airlines Credit Card",
    bullets: [
      "Flat 10% Off on Flights",
      "₹1,500 joining bonus",
      "₹0 Forex Markup",
      "8 free domestic lounge visits",
    ],
    accent: "slate",
    footnote: "T&C Apply",
    href: "/deals/911-credit-card",
  },
  {
    id: "salaryse",
    category: "bankOffers",
    brand: "SalarySe",
    brandLogoText: "SalarySe",
    headline: "Flat 15% Off",
    bullets: ["on Flights with SalarySe Credit Cards"],
    accent: "violet",
    footnote: "T&C Apply",
    href: "/deals/salaryse",
  },
];

export const whyBookFeatures: WhyBookFeature[] = [
  {
    id: "tracking",
    title: "Track flight delays, boarding gate & baggage belt",
    description:
      "Live updates from departure to arrival, no refreshing needed.",
    icon: "PlaneTakeoff",
    accent: "indigo",
  },
  {
    id: "fare-alerts",
    title: "Save up to 40% with intelligent fare alerts",
    description: "Get notified the moment prices drop on your route.",
    icon: "BellRing",
    accent: "amber",
  },
  {
    id: "insurance",
    title: "Travel Stress-Free with Travel Insurance",
    description: "Optional cover for delays, cancellations, and more.",
    icon: "ShieldCheck",
    accent: "fuchsia",
  },
  {
    id: "refunds",
    title: "Instant & full refunds with Assured",
    description: "No waiting weeks — refunds processed right away.",
    icon: "BadgeCheck",
    accent: "blue",
  },
  {
    id: "lock-fare",
    title: "Lock Now, Pay Later with Fare Lock",
    description: "Reserve today's price and pay closer to your travel date.",
    icon: "Lock",
    accent: "orange",
  },
];
