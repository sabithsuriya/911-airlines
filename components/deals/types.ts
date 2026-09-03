export type QuickActionBadge = "Pro" | "Free" | null;

export interface QuickAction {
  id: string;
  label: string;
  icon: string; // lucide-react icon name, resolved in QuickActionsBar
  badge: QuickActionBadge;
  href: string;
}

export type OfferCategory = "flights" | "hotels" | "bankOffers" | "trains";

export interface DealOffer {
  id: string;
  category: OfferCategory;
  brand: string;
  brandLogoText: string; // fallback text badge if no logo asset
  headline: string;
  bullets: string[];
  accent: "amber" | "rose" | "sky" | "slate" | "violet";
  footnote?: string;
  href: string;
}

export interface WhyBookFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: "indigo" | "amber" | "fuchsia" | "blue" | "orange";
}
