"use client";

import { useRef } from "react";
import {
  PlaneTakeoff,
  BellRing,
  ShieldCheck,
  BadgeCheck,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ComponentType } from "react";
import type { WhyBookFeature } from "./types";
import { whyBookFeatures } from "./data";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  PlaneTakeoff,
  BellRing,
  ShieldCheck,
  BadgeCheck,
  Lock,
};

const ACCENT_STYLES: Record<WhyBookFeature["accent"], string> = {
  indigo: "bg-indigo-100 text-indigo-600",
  amber: "bg-amber-100 text-amber-600",
  fuchsia: "bg-fuchsia-100 text-fuchsia-600",
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
};

const CARD_BG: Record<WhyBookFeature["accent"], string> = {
  indigo: "bg-indigo-50/60",
  amber: "bg-amber-50/60",
  fuchsia: "bg-fuchsia-50/60",
  blue: "bg-blue-50/60",
  orange: "bg-orange-50/60",
};

export default function WhyBookSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="why-book-heading" className="mt-12">
      <div className="flex items-center justify-between">
        <h2 id="why-book-heading" className="text-xl font-bold text-slate-900">
          Why Book With 911 Airlines?
        </h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="rounded-full border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-5 flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {whyBookFeatures.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.id}
              className={`flex min-w-[280px] flex-1 items-center gap-4 rounded-2xl p-5 ${CARD_BG[feature.accent]}`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ACCENT_STYLES[feature.accent]}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-snug text-slate-800">
                {feature.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
