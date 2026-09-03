import type { Metadata } from "next";
import { QuickActionsBar, OffersSection, WhyBookSection } from "@/components/deals";

export const metadata: Metadata = {
  title: "Exclusive Deals | 911 Airlines",
  description:
    "Bank offers, credit card perks, and fare deals on 911 Airlines flights.",
};

export default function ExclusiveDealsPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover -z-20 pointer-events-none"
      >
        <source src="/videos/airline-bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle Dark Overlay */}
      <div className="fixed inset-0 bg-black/30 -z-10 pointer-events-none" />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Do More With 911 Airlines
        </h1>

        <div className="mt-4">
          <QuickActionsBar />
        </div>

        <OffersSection />

        <WhyBookSection />
      </main>
    </div>
  );
}
