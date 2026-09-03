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
    <section aria-labelledby="offers-heading" className="w-full rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="offers-heading" className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
          Today&apos;s Flight Offers
        </h2>

        <div className="flex items-center gap-3">
          <div
            role="tablist"
            aria-label="Offer category"
            className="flex gap-2"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={true}
                className="rounded-full border border-blue-400/50 bg-blue-600/90 backdrop-blur-md px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-blue-600 transition-all hover:scale-105"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visibleOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {visibleOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-200">
          No offers available in this category right now — check back soon.
        </p>
      )}
    </section>
  );
}
