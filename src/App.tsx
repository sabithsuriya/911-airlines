import { useState, useRef } from 'react';
import Header, { type PageType } from './Header';
import HelpCenter from './HelpCenter';
import ManageBooking from './ManageBooking';
import Deals from './Deals';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeSection, setActiveSection] = useState(0);
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
      // Navigate to Home section 0 (or booking widget)
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

  if (currentPage === 'deals') {
    return (
      <div className="deals-main-wrapper">
        <Header
          currentPage={currentPage}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
        <Deals />
      </div>
    );
  }

  return (
    <div className="main-container" ref={containerRef} onScroll={handleScroll}>
      <Header
        currentPage={currentPage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <section className="page-section" id="home">
        <div className="video-bg-wrapper">
          <video src="/assets/bg.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="hero-text-container">
          <h1 className="hero-main-title">Your World. Your Way.</h1>
          <p className="hero-sub-title">It’s time to fly</p>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection(1)}>
          <div className="scroll-line" />
          <span>Scroll to explore overall view</span>
        </div>

        {/* Color-matched Atmospheric Edge Overlay */}
        <div className="flight-transition-bottom-overlay" aria-hidden="true" />

        {/* Flight Journey Vector Route & Animated Airplane (Section 1 Bottom) */}
        <div className="flight-journey-container" aria-hidden="true">
          <svg className="flight-journey-svg" viewBox="0 0 1440 280" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flightPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="30%" stopColor="#60a5fa" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#93c5fd" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Dashed Route Line */}
            <path
              d="M 100,50 C 450,10 820,180 1340,250"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />

            {/* Glowing Active Route Line */}
            <path
              className="flight-active-line"
              d="M 100,50 C 450,10 820,180 1340,250"
              fill="none"
              stroke="url(#flightPathGrad)"
              strokeWidth="2"
              strokeDasharray="8 8"
              filter="url(#routeGlow)"
            />

            {/* Waypoint Departure Dot */}
            <circle cx="100" cy="50" r="4" fill="#60a5fa" opacity="0.95" />
            <circle cx="100" cy="50" r="10" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="4;14;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Waypoint Destination Dot */}
            <circle cx="1340" cy="250" r="4" fill="#93c5fd" opacity="0.95" />
            <circle cx="1340" cy="250" r="10" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="4;14;4" dur="3s" begin="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Animated Airplane Icon */}
            <g className="airplane-group">
              <path
                d="M 14 0 L 17 8 L 25 10 L 17 12 L 15 20 L 13 14 L 6 15 L 9 10 L 3 8 Z"
                fill="#ffffff"
                transform="scale(0.85) translate(-14, -10)"
                filter="drop-shadow(0 2px 6px rgba(59, 130, 246, 0.7))"
              />
              <animateMotion
                path="M 100,50 C 450,10 820,180 1340,250"
                dur="10s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>
          </svg>
        </div>
      </section>

      <section className="page-section" id="about">
        <div className="video-bg-wrapper">
          <video src="/videos/911airhero.mp4" autoPlay loop muted playsInline />
        </div>

        {/* Color-matched Atmospheric Edge Overlay */}
        <div className="flight-transition-top-overlay" aria-hidden="true" />

        {/* Flight Journey Continuation Route (Section 2 Top) */}
        <div className="flight-journey-container-top" aria-hidden="true">
          <svg className="flight-journey-svg" viewBox="0 0 1440 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flightPathGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Continuation Dashed Route Line */}
            <path
              d="M 100,10 C 380,80 720,140 1340,190"
              fill="none"
              stroke="url(#flightPathGradTop)"
              strokeWidth="1.8"
              strokeDasharray="6 6"
            />

            {/* Destination Node */}
            <circle cx="1340" cy="190" r="4" fill="#60a5fa" opacity="0.9" />
            <circle cx="1340" cy="190" r="9" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="4;12;4" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* Second Subtle Airplane Icon for Flight Journey Continuity */}
            <g className="airplane-group-top">
              <path
                d="M 14 0 L 17 8 L 25 10 L 17 12 L 15 20 L 13 14 L 6 15 L 9 10 L 3 8 Z"
                fill="#ffffff"
                transform="scale(0.85) translate(-14, -10)"
                filter="drop-shadow(0 2px 6px rgba(59, 130, 246, 0.7))"
              />
              <animateMotion
                path="M 100,10 C 380,80 720,140 1340,190"
                dur="10s"
                begin="5s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>
          </svg>
        </div>

        <div className="section2-content">
          <h2 className="section2-title">Redefining Horizon &amp; Sky</h2>
          <p className="section2-desc">
            Fly in absolute comfort to top destinations across the globe with 911 Airlines.
          </p>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection(0)}>
          <div className="scroll-line" />
          <span>Scroll up to return to Home</span>
        </div>
      </section>
    </div>
  );
}
