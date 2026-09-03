import Link from "next/link";
import type { DealOffer } from "./types";

const ACCENT_STYLES: Record<DealOffer["accent"], string> = {
  amber: "bg-amber-50 hover:bg-amber-100",
  rose: "bg-rose-50 hover:bg-rose-100",
  sky: "bg-sky-50 hover:bg-sky-100",
  slate: "bg-slate-900 text-white hover:bg-slate-800",
  violet: "bg-violet-50 hover:bg-violet-100",
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
    <Link
      href={offer.href}
      className={`flex min-w-[260px] flex-1 flex-col justify-between rounded-2xl p-6 transition-colors ${ACCENT_STYLES[offer.accent]}`}
    >
      <span
        className={`mb-4 inline-block w-fit rounded-md px-2 py-1 text-xs font-bold ${BRAND_BADGE_STYLES[offer.accent]}`}
      >
        {offer.brandLogoText}
      </span>

      <div className="space-y-1">
        <p
          className={`text-xl font-extrabold ${isDark ? "text-amber-300" : "text-slate-900"}`}
        >
          {offer.headline}
        </p>
        {offer.bullets.map((bullet) => (
          <p
            key={bullet}
            className={`text-sm leading-snug ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {isDark ? `↗ ${bullet}` : bullet}
          </p>
        ))}
      </div>

      {offer.footnote && (
        <span
          className={`mt-4 text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {offer.footnote}
        </span>
      )}
    </Link>
  );
}
