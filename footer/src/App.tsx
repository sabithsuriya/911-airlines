import { useState, useRef } from 'react';
import Header, { type PageType } from './Header';
import HelpCenter from './HelpCenter';
import ManageBooking from './ManageBooking';
import './index.css';
import { BookingWidget, type SearchParams } from './components/BookingWidget';
import { FlightResults } from './components/FlightResults';
import { PassengerForm } from './components/PassengerForm';
import { BookingConfirmation } from './components/BookingConfirmation';
import { type Flight, type BookingDetails } from './data/mockFlights';
import Footer from './Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
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
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (!containerRef.current) return;
        const clientHeight = containerRef.current.clientHeight;
        containerRef.current.scrollTo({
          top: clientHeight * index,
          behavior: 'smooth'
        });
      }, 50);
      return;
    }

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

  const handleNavigate = (page: PageType, sectionIndex?: number) => {
    if (page === 'home') {
      if (typeof sectionIndex === 'number') {
        scrollToSection(sectionIndex);
      } else {
        scrollToSection(0);
      }
      return;
    }

    if (page === 'about') {
      scrollToSection(1);
      return;
    }

    if (page === 'book') {
      scrollToSection(0);
      return;
    }

    setCurrentPage(page);
  };

  if (currentPage === 'help') {
    return <HelpCenter onNavigate={handleNavigate} />;
  }

  if (currentPage === 'manage') {
    return <ManageBooking onNavigate={handleNavigate} />;
  }

  return (
    <div className="main-container" ref={containerRef} onScroll={handleScroll}>
      <Header
        currentPage={currentPage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

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

      {/* Section 3: Footer */}
      <section className="page-section" id="footer-section">
        <Footer
          onNavigateHome={() => scrollToSection(0)}
          onNavigateBook={() => scrollToSection(1)}
          onNavigateManage={() => handleNavigate('manage')}
          onNavigateHelp={() => handleNavigate('help')}
          onNavigateAbout={() => scrollToSection(2)}
        />
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
