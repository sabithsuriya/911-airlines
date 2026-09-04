import React, { useState } from 'react';
import Header, { type PageType } from './Header';
import Footer from './Footer';
import { Search, Plane, Luggage, Utensils, ShieldCheck, RefreshCw, Armchair } from 'lucide-react';
import './ManageBooking.css';

interface ManageBookingProps {
  onNavigate: (page: PageType, sectionIndex?: number) => void;
}

export default function ManageBooking({ onNavigate }: ManageBookingProps) {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnr && lastName) {
      setSearched(true);
    }
  };

  const services = [
    {
      title: 'Seat Selection',
      desc: 'Pick your preferred extra-legroom window or aisle seat.',
      icon: <Armchair className="svc-icon" />
    },
    {
      title: 'Extra Baggage',
      desc: 'Pre-book additional baggage allowance at up to 40% discount.',
      icon: <Luggage className="svc-icon" />
    },
    {
      title: 'Gourmet Meals',
      desc: 'Customize dietary preferences and pre-order chef-curated meals.',
      icon: <Utensils className="svc-icon" />
    },
    {
      title: 'Flight Changes & Dates',
      desc: 'Modify departure dates or upgrade cabin class effortlessly.',
      icon: <RefreshCw className="svc-icon" />
    },
    {
      title: 'Travel Insurance',
      desc: 'Add comprehensive trip protection and baggage coverage.',
      icon: <ShieldCheck className="svc-icon" />
    },
    {
      title: 'Check-in Online',
      desc: 'Available 48 hours before departure. Get mobile boarding pass.',
      icon: <Plane className="svc-icon" />
    }
  ];

  return (
    <div className="manage-container">
      <Header currentPage="manage" onNavigate={onNavigate} />

      <header className="manage-hero">
        <video className="video-bg" autoPlay muted loop playsInline>
          <source src="/assets/overallbg.mp4" type="video/mp4" />
          <source src="/assets/bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim"></div>

        <div className="manage-hero-content">
          <p className="eyebrow">Manage Booking</p>
          <h1>Your itinerary, in your control</h1>
          <p>
            Retrieve your trip to choose seats, add baggage, request special assistance, or check in online.
          </p>
        </div>
      </header>

      {/* Booking Form Card */}
      <section className="manage-form-section">
        <div className="booking-card">
          <h2>Retrieve your booking</h2>
          <p className="form-desc">
            Enter your 6-character booking reference (e.g. 911ABC) and the passenger surname.
          </p>
          <form className="booking-form-grid" onSubmit={handleSearch}>
            <div className="form-field">
              <label htmlFor="pnr-input">Booking Reference (PNR)</label>
              <input
                id="pnr-input"
                type="text"
                placeholder="e.g. 911ABC"
                value={pnr}
                onChange={(e) => setPnr(e.target.value.toUpperCase())}
                maxLength={6}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastname-input">Passenger Last Name</label>
              <input
                id="lastname-input"
                type="text"
                placeholder="e.g. Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-find-booking">
              <Search size={18} />
              <span>Find Booking</span>
            </button>
          </form>

          {searched && (
            <div style={{ marginTop: '20px', padding: '16px', borderRadius: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
              <strong>Booking Reference {pnr}:</strong> Flight details found for passenger {lastName}. Ready for online check-in &amp; seat selection.
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="manage-services-section">
        <h2>Enhance your journey</h2>
        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.title} className="service-card">
              {svc.icon}
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer
        onNavigateHome={() => onNavigate('home', 0)}
        onNavigateBook={() => onNavigate('book')}
        onNavigateManage={() => onNavigate('manage')}
        onNavigateHelp={() => onNavigate('help')}
        onNavigateAbout={() => onNavigate('home', 1)}
      />
    </div>
  );
}
