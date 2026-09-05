import type { Metadata } from "next";
import { QuickActionsBar, OffersSection, WhyBookSection } from "@/components/deals";
import "@/src/Deals.css";

export const metadata: Metadata = {
  title: "Exclusive Deals | 911 Airlines",
  description:
    "Bank offers, credit card perks, and fare deals on 911 Airlines flights.",
};

export default function ExclusiveDealsPage() {
  return (
    <div className="deals-page">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="deals-bg-video"
      >
        <source src="/videos/911airhero.mp4" type="video/mp4" />
      </video>

      {/* Subtle Dark Overlay */}
      <div className="deals-overlay" />

      {/* Main Content */}
      <main className="deals-content">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Do More With 911 Airlines
        </h1>

        <QuickActionsBar />

        <OffersSection />

        <WhyBookSection />
      </main>
    </div>
  );
}

