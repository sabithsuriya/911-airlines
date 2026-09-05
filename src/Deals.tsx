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
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Do More With 911 Airlines
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-700">
            Exclusive fares, rewards and travel deals made for your next journey.
          </p>
        </div>

        <QuickActionsBar />

        <OffersSection />

        <WhyBookSection />
      </main>
    </div>
  );
}


