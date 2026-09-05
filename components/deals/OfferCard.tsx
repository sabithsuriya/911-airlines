import type { DealOffer } from "./types";

const ACCENT_STYLES: Record<DealOffer["accent"], string> = {
  amber: "bg-[#fffbeb] hover:bg-[#fef3c7]/60 border border-amber-100/70",
  rose: "bg-[#fdf2f8] hover:bg-[#fce7f3]/60 border border-rose-100/70",
  sky: "bg-[#eff6ff] hover:bg-[#dbeafe]/60 border border-sky-100/70",
  slate: "bg-slate-900 text-white hover:bg-slate-800",
  violet: "bg-violet-50 hover:bg-violet-100 border border-violet-100",
};

const BRAND_BADGE_STYLES: Record<DealOffer["accent"], string> = {
  amber: "bg-[#f59e0b] text-white",
  rose: "bg-[#db2777] text-white",
  sky: "bg-[#2563eb] text-white",
  slate: "bg-white/10 text-white",
  violet: "bg-indigo-600 text-white",
};

export default function OfferCard({ offer }: { offer: DealOffer }) {
  const isDark = offer.accent === "slate";

  return (
    <a
      href={offer.href}
      className={`group flex w-full flex-col justify-between rounded-[18px] shadow-xs hover:shadow-sm transition-shadow h-[215px] box-border ${ACCENT_STYLES[offer.accent]}`}
      style={{ padding: "24px" }}
    >
      <div className="flex flex-col">
        <span
          className={`inline-block w-fit rounded-md px-2.5 py-1 text-[12px] font-bold tracking-wide mb-4 shadow-2xs ${BRAND_BADGE_STYLES[offer.accent]}`}
        >
          {offer.brandLogoText}
        </span>

        <h3
          className={`text-xl font-bold tracking-tight mb-2 leading-tight ${isDark ? "text-amber-300" : "text-slate-900"}`}
        >
          {offer.headline}
        </h3>

        {offer.bullets.map((bullet) => (
          <p
            key={bullet}
            className={`text-[13px] font-medium leading-relaxed ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {isDark ? `↗ ${bullet}` : bullet}
          </p>
        ))}
      </div>

      {offer.footnote && (
        <span
          className={`text-[11px] font-normal pt-3 mt-auto ${isDark ? "text-slate-400" : "text-slate-400"}`}
        >
          {offer.footnote}
        </span>
      )}
    </a>
  );
}



