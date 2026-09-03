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
      </section>

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
        <div className="scroll-indicator" onClick={() => scrollToSection(0)}>
          <div className="scroll-line" />
          <span>Scroll up to return to Home</span>
        </div>
      </section>
    </div>
  );
}
