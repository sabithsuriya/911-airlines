import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './index.css';

export default function App() {
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
    if (!containerRef.current) return;
    const clientHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: clientHeight * index,
      behavior: 'smooth'
    });
  };

  return (
    <div className="main-container" ref={containerRef} onScroll={handleScroll}>
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
                className="nav-item"
                onClick={(e) => { e.preventDefault(); scrollToSection(0); }}
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="#manage-booking"
                className="nav-item"
                onClick={(e) => { e.preventDefault(); scrollToSection(0); }}
              >
                Manage booking
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-item ${activeSection === 1 ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(1); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#help"
                className="nav-item"
                onClick={(e) => { e.preventDefault(); scrollToSection(1); }}
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
