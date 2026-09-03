import React, { useState } from 'react';
import {
  Globe,
  Mail,
  Plane,
  CheckCircle2,
  Smartphone,
  Send
} from 'lucide-react';
import './Footer.css';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateBook?: () => void;
  onNavigateManage?: () => void;
  onNavigateHelp?: () => void;
  onNavigateAbout?: () => void;
}

export default function Footer({
  onNavigateHome,
  onNavigateBook,
  onNavigateManage,
  onNavigateHelp,
  onNavigateAbout
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="global-footer">
      {/* Newsletter Strip */}
      <div className="footer-newsletter-wrap">
        <div className="footer-newsletter-content">
          <div className="newsletter-text">
            <h3>Stay connected with 911 Airlines</h3>
            <p>Subscribe to receive private fares, horizon travel inspirations, and route updates.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <Mail size={18} className="newsletter-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="newsletter-submit-btn">
              {subscribed ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Subscribed
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={15} /> Join Club
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo" onClick={onNavigateHome}>
            <span className="num">911</span> AIRLINES
            <span className="name">Fly further.</span>
          </div>
          <p className="footer-brand-desc">
            Redefining luxury and reliability across global skies. Seamless bookings, world-class cabin comfort, and round-the-clock support.
          </p>
          <button type="button" className="footer-locale-btn" onClick={(e) => e.preventDefault()}>
            <Globe size={16} />
            <span>English (US) · USD ($)</span>
          </button>
        </div>

        {/* Explore & Book */}
        <div className="footer-col">
          <h4>Explore &amp; Book</h4>
          <ul>
            <li>
              <button type="button" onClick={onNavigateBook || onNavigateHome}>
                Book a Flight
              </button>
            </li>
            <li>
              <a href="#destinations" onClick={(e) => e.preventDefault()}>
                Global Destinations <span className="footer-badge">New</span>
              </a>
            </li>
            <li>
              <a href="#tariff" onClick={(e) => e.preventDefault()}>
                Tariff Sheet
              </a>
            </li>
            <li>
              <a href="#charter" onClick={(e) => e.preventDefault()}>
                Private Jet Charter
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => e.preventDefault()}>
                First &amp; Business Suites
              </a>
            </li>
          </ul>
        </div>

        {/* Manage & Support */}
        <div className="footer-col">
          <h4>Manage &amp; Help</h4>
          <ul>
            <li>
              <button type="button" onClick={onNavigateManage || onNavigateHome}>
                Manage My Booking
              </button>
            </li>
            <li>
              <a href="#checkin" onClick={(e) => e.preventDefault()}>
                Online Check-in
              </a>
            </li>
            <li>
              <a href="#flight-status" onClick={(e) => e.preventDefault()}>
                Flight Status &amp; Radar
              </a>
            </li>
            <li>
              <button type="button" onClick={onNavigateHelp}>
                Help Centre
              </button>
            </li>
            <li>
              <a href="#baggage" onClick={(e) => e.preventDefault()}>
                Baggage Allowance
              </a>
            </li>
            <li>
              <a href="#refund" onClick={(e) => e.preventDefault()}>
                Refunds &amp; Claims
              </a>
            </li>
          </ul>
        </div>

        {/* About 911 Airlines */}
        <div className="footer-col">
          <h4>About 911</h4>
          <ul>
            <li>
              <button type="button" onClick={onNavigateAbout || onNavigateHome}>
                Our Story &amp; Fleet
              </button>
            </li>
            <li>
              <a href="#sustainability" onClick={(e) => e.preventDefault()}>
                SkyGreen Sustainability
              </a>
            </li>
            <li>
              <a href="#safety" onClick={(e) => e.preventDefault()}>
                Safety &amp; Compliance
              </a>
            </li>
            <li>
              <a href="#careers" onClick={(e) => e.preventDefault()}>
                Careers &amp; Crew
              </a>
            </li>
            <li>
              <a href="#press" onClick={(e) => e.preventDefault()}>
                Press &amp; Media Kit
              </a>
            </li>
          </ul>
        </div>

        {/* App & Social */}
        <div className="footer-col">
          <h4>Get the App</h4>
          <div className="footer-app-box">
            <p>Book flights on the go and get live gate alerts.</p>
            <div className="app-buttons">
              <a href="#appstore" className="app-btn" onClick={(e) => e.preventDefault()}>
                <Smartphone size={15} />
                <span>App Store</span>
              </a>
              <a href="#playstore" className="app-btn" onClick={(e) => e.preventDefault()}>
                <Plane size={15} />
                <span>Google Play</span>
              </a>
            </div>
          </div>

          <div className="social-links">
            <a href="#twitter" className="social-icon-btn" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#instagram" className="social-icon-btn" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#facebook" className="social-icon-btn" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} 911 Airlines Inc. All rights reserved. Registered International Carrier.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a>
            <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Preferences</a>
            <a href="#tariff" onClick={(e) => e.preventDefault()}>Passenger Tariff</a>
            <a href="#accessibility" onClick={(e) => e.preventDefault()}>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
