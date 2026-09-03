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
    <section aria-labelledby="offers-heading" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="offers-heading" className="text-xl font-bold text-slate-900">
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
                className="rounded-full border border-blue-600 bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visibleOffers.length > 0 ? (
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
          {visibleOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          No offers available in this category right now — check back soon.
        </p>
      )}
    </section>
  );
}
