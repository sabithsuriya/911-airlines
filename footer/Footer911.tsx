import React, { useState, FormEvent } from 'react';
import './Footer911.css';

interface Footer911Props {
  brandName?: string;
  year?: number;
}

export const Footer911: React.FC<Footer911Props> = ({
  brandName = '911 Airlines',
  year = 2026,
}) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer-911">
      {/* Top Links & Newsletter Section */}
      <div className="footer-top-container">
        <div className="footer-grid">
          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About us</a></li>
              <li><a href="#fleet">Our fleet</a></li>
              <li><a href="#experience">Passenger experience</a></li>
              <li><a href="#safety">Safety &amp; reliability</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#corporate">Corporate travel</a></li>
              <li><a href="#cargo">Cargo &amp; logistics</a></li>
              <li><a href="#charter">Charter flights</a></li>
              <li><a href="#partnerships">Partnerships</a></li>
              <li><a href="#press">Press &amp; media</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact us</a></li>
              <li><a href="#help">Help center</a></li>
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#accessibility">Accessibility services</a></li>
              <li><a href="#feedback">Feedback</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col">
            <h3 className="newsletter-title">
              Your gateway to<br />911 updates.
            </h3>
            <p className="newsletter-subtitle">
              Subscribe to {brandName}' newsletter for updates on routes, fleet innovations, and exclusive announcements.
            </p>
            
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email Address"
                />
                <button type="submit" className="subscribe-btn">
                  {subscribed ? 'Subscribed ✓' : (
                    <>
                      <span>Subscribe</span>
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 16 16 12 12 8"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
            <p className="privacy-text">
              We respect your privacy. No spam — only meaningful updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Policy */}
        <div className="footer-bottom-bar">
          <div className="footer-left">
            <span className="copyright">&copy;{brandName} {year}</span>
            <div className="social-icons">
              <a href="#linkedin" className="social-circle" aria-label="LinkedIn">in</a>
              <a href="#x" className="social-circle" aria-label="X (Twitter)">𝕏</a>
              <a href="#facebook" className="social-circle" aria-label="Facebook">f</a>
              <a href="#instagram" className="social-circle" aria-label="Instagram">ig</a>
            </div>
          </div>

          <div className="footer-right">
            <a href="#privacy">Privacy policy</a>
            <a href="#terms">Terms &amp; conditions</a>
          </div>
        </div>
      </div>

      {/* Bottom Aircraft & Large Brand Typography Section */}
      <div className="footer-plane-section">
        {/* Airplane Image (Front-Facing White Jetliner) */}
        <div className="airplane-wrapper">
          <img 
            src="https://raw.githubusercontent.com/sabithsuriya/911-airlines/Main/source/2a74f3e6bf36fab3e2c1ae223b3f1a4c.webp" 
            alt={`${brandName} Fleet`}
            className="footer-airplane-img"
          />
        </div>

        {/* Giant Overlay Brand Text */}
        <div className="brand-overlay-container">
          <h1 className="giant-brand-text">.{brandName}</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer911;
