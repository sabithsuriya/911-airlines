import { QuickActionsBar, OffersSection, WhyBookSection } from '../components/deals';
import './Deals.css';

export default function Deals() {
  return (
    <div className="deals-page">
      <video autoPlay loop muted playsInline className="deals-bg-video">
        <source src="/videos/airline-bg.mp4" type="video/mp4" />
      </video>

      <div className="deals-overlay" />

      <main className="deals-content">
        <div className="deals-hero text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl">
            Do More With 911 Airlines
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-200/90 max-w-2xl mx-auto drop-shadow-md">
            Exclusive fares, rewards and travel deals made for your next journey.
          </p>
        </div>

        <div className="w-full">
          <QuickActionsBar />
        </div>

        <OffersSection />

        <WhyBookSection />
      </main>
    </div>
  );
}
