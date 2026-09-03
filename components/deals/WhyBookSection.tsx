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

export default function WhyBookSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="why-book-heading" className="w-full rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 id="why-book-heading" className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
          Why Book With 911 Airlines?
        </h2>
        <div className="hidden gap-2 lg:hidden sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-white/30 bg-white/20 p-2 text-white hover:bg-white/30 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="rounded-full border border-white/30 bg-white/20 p-2 text-white hover:bg-white/30 transition-all backdrop-blur-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 w-full items-stretch"
      >
        {whyBookFeatures.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.id}
              className="flex items-center gap-4 rounded-2xl p-5 bg-white/90 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 w-full h-full min-h-[96px]"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md ${ACCENT_STYLES[feature.accent]}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-sm font-bold leading-snug text-slate-900">
                {feature.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
