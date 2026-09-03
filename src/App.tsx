import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './index.css';
import { BookingWidget, type SearchParams } from './components/BookingWidget';
import { FlightResults } from './components/FlightResults';
import { PassengerForm } from './components/PassengerForm';
import { BookingConfirmation } from './components/BookingConfirmation';
import { type Flight, type BookingDetails } from './data/mockFlights';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [bookingStep, setBookingStep] = useState<'widget' | 'results' | 'passenger' | 'confirmation'>('widget');
  
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<Flight | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeSection) {
      setActiveSection(index);
    }
  };

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    const clientHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: clientHeight * index,
      behavior: 'smooth'
    });
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setBookingStep('results');
  };

  const handleSelectFlight = (outbound: Flight, returnFlight?: Flight) => {
    setSelectedOutbound(outbound);
    setSelectedReturn(returnFlight || null);
    setBookingStep('passenger');
  };

  const handleConfirmBooking = (booking: BookingDetails) => {
    setConfirmedBooking(booking);
    setBookingStep('confirmation');
  };

  const handleResetBooking = () => {
    setBookingStep('widget');
    setSearchParams(null);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setConfirmedBooking(null);
  };

  return (
    <div className="main-container" ref={containerRef} onScroll={handleScroll}>
      {/* Global Header */}
      <header className="global-header">
        <a href="#" className="header-logo-wrapper" onClick={() => scrollToSection(0)}>
          <img src="/assets/logo.png" alt="911 Airlines Logo" className="header-logo" />
        </a>
        <nav>
          <ul className="header-menu">
            <li>
              <a
                href="#home"
                className={`nav-item ${activeSection === 0 ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(0); }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#book"
                className={`nav-item ${activeSection === 1 ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(1); }}
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="#manage-booking"
                className="nav-item"
                onClick={(e) => { e.preventDefault(); scrollToSection(1); }}
              >
                Manage booking
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-item ${activeSection === 2 ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(2); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#help"
                className="nav-item"
                onClick={(e) => { e.preventDefault(); scrollToSection(2); }}
              >
                Help
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <a href="#tariff" className="tariff-link" onClick={(e) => e.preventDefault()}>
            Tariff sheet
            <ArrowUpRight size={14} />
          </a>
          <button className="login-btn">Login</button>
        </div>
      </header>

      {/* Section 0: Home Hero */}
      <section className="page-section" id="home">
        <div className="video-bg-wrapper">
          <video src="/assets/bg.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="hero-text-container">
          <h1 className="hero-main-title">Your World. Your Way.</h1>
          <p className="hero-sub-title">It’s time to fly</p>
        </div>
      </section>

      {/* Section 1: DEDICATED BOOKING PAGE SECTION */}
      <section className="page-section booking-section-page" id="book">
        <div className="video-bg-wrapper">
          <video src="/assets/overallbg.mp4" autoPlay loop muted playsInline />
        </div>

        <div className="booking-page-content-wrapper">
          <div className="booking-widget-container">
            <BookingWidget onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Section 2: About Page */}
      <section className="page-section" id="about">
        <div className="video-bg-wrapper">
          <video src="/assets/overallbg.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="section2-content">
          <h2 className="section2-title">Redefining Horizon &amp; Sky</h2>
          <p className="section2-desc">
            Fly in absolute comfort to top destinations across the globe with 911 Airlines.
          </p>
        </div>
      </section>

      {/* Full Page Overlay for Booking Search Results, Passenger Details, Boarding Pass */}
      {bookingStep !== 'widget' && (
        <div className="booking-page-overlay">
          <div className="booking-overlay-container">
            {bookingStep === 'results' && searchParams && (
              <FlightResults
                searchParams={searchParams}
                onBack={() => setBookingStep('widget')}
                onSelectFlight={handleSelectFlight}
              />
            )}

            {bookingStep === 'passenger' && searchParams && selectedOutbound && (
              <PassengerForm
                searchParams={searchParams}
                outboundFlight={selectedOutbound}
                returnFlight={selectedReturn || undefined}
                onBack={() => setBookingStep('results')}
                onConfirmBooking={handleConfirmBooking}
              />
            )}

            {bookingStep === 'confirmation' && confirmedBooking && (
              <BookingConfirmation
                booking={confirmedBooking}
                onReset={handleResetBooking}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
