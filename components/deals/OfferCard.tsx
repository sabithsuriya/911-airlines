import type { DealOffer } from "./types";

const ACCENT_STYLES: Record<DealOffer["accent"], string> = {
  amber: "bg-amber-50/95 backdrop-blur-md border border-amber-200/90 hover:bg-amber-100",
  rose: "bg-rose-50/95 backdrop-blur-md border border-rose-200/90 hover:bg-rose-100",
  sky: "bg-sky-50/95 backdrop-blur-md border border-sky-200/90 hover:bg-sky-100",
  slate: "bg-slate-900/95 backdrop-blur-md border border-slate-700/90 text-white hover:bg-slate-800",
  violet: "bg-violet-50/95 backdrop-blur-md border border-violet-200/90 hover:bg-violet-100",
};

const BRAND_BADGE_STYLES: Record<DealOffer["accent"], string> = {
  amber: "bg-orange-600 text-white",
  rose: "bg-red-700 text-white",
  sky: "bg-purple-800 text-white",
  slate: "bg-white/10 text-white",
  violet: "bg-indigo-700 text-white",
};

export default function OfferCard({ offer }: { offer: DealOffer }) {
  const isDark = offer.accent === "slate";

  return (
    <a
      href={offer.href}
      className={`group flex w-full flex-col justify-between rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full min-h-[250px] ${ACCENT_STYLES[offer.accent]}`}
    >
      <span
        className={`mb-4 inline-block w-fit rounded-lg px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-sm ${BRAND_BADGE_STYLES[offer.accent]}`}
      >
        {offer.brandLogoText}
      </span>

      <div className="space-y-2 my-auto">
        <p
          className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-amber-300" : "text-slate-900"}`}
        >
          {offer.headline}
        </p>
        {offer.bullets.map((bullet) => (
          <p
            key={bullet}
            className={`text-base font-semibold leading-relaxed ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {isDark ? `↗ ${bullet}` : bullet}
          </p>
        ))}
      </div>

      {offer.footnote && (
        <span
          className={`mt-4 text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {offer.footnote}
        </span>
      )}
    </a>
  );
}
