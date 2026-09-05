"use client";

import type { OfferCategory } from "./types";
import { dealOffers } from "./data";
import OfferCard from "./OfferCard";

const TABS: { id: OfferCategory; label: string }[] = [
  { id: "flights", label: "Flights" },
];

export default function OffersSection() {
  const visibleOffers = dealOffers.filter(
    (offer) => offer.category === "flights",
  );

  return (
    <section aria-labelledby="offers-heading" className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="offers-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
          Today&apos;s Flight Offers
        </h2>

        <div className="flex items-center gap-2">
          {TABS.map((tab) => (
            <span
              key={tab.id}
              className="rounded-full bg-blue-600 px-4 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm"
            >
              {tab.label}
            </span>
          ))}
        </div>
      </div>

      {visibleOffers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
          {visibleOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          No offers available in this category right now — check back soon.
        </p>
      )}
    </section>
  );
}

