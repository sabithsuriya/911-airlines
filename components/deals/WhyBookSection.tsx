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
  indigo: "bg-indigo-100/80 text-indigo-600",
  amber: "bg-amber-100/80 text-amber-600",
  fuchsia: "bg-fuchsia-100/80 text-fuchsia-600",
  blue: "bg-blue-100/80 text-blue-600",
  orange: "bg-orange-100/80 text-orange-600",
};

export default function WhyBookSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  // Slice first 4 features to match reference desktop layout perfectly
  const featuresToDisplay = whyBookFeatures.slice(0, 4);

  return (
    <section aria-labelledby="why-book-heading" className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="why-book-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
          Why Book With 911 Airlines?
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-white/60 bg-white/40 p-1.5 text-slate-700 hover:bg-white/80 transition-colors backdrop-blur-xs shadow-2xs"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="rounded-full border border-white/60 bg-white/40 p-1.5 text-slate-700 hover:bg-white/80 transition-colors backdrop-blur-xs shadow-2xs"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
      >
        {featuresToDisplay.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.id}
              className="flex items-center gap-3.5 rounded-2xl p-4 bg-white/75 backdrop-blur-sm border border-white/70 shadow-xs hover:shadow-sm hover:bg-white/90 transition-all min-h-[96px]"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-2xs ${ACCENT_STYLES[feature.accent]}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs sm:text-sm font-semibold leading-snug text-slate-800">
                {feature.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

