import React from 'react';
import './Footer.css';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateBook?: () => void;
  onNavigateManage?: () => void;
  onNavigateHelp?: () => void;
  onNavigateAbout?: () => void;
  brandName?: string;
  year?: number;
}

export default function Footer({
  onNavigateBook,
  onNavigateManage,
  onNavigateHelp,
  onNavigateAbout,
  brandName = '911 Airlines',
  year = 2026,
}: FooterProps) {
  const handleClick = (cb?: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (cb) cb();
  };

  return (
    <footer className="footer-911">
      {/* Sky gradient + dim overlay for text readability on clean plane */}
      <div className="footer-sky-overlay" />

      {/* Top Links + Columns */}
      <div className="footer-top-container">
        <div className="footer-grid">
          {/* COMPANY — 12 items, EXACT order from Image 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li><a href="#about" onClick={handleClick(onNavigateAbout)}>About us</a></li>
              <li><a href="#investors" onClick={handleClick()}>Investor Relations</a></li>
              <li><a href="#esg" onClick={handleClick()}>911 Green – ESG report</a></li>
              <li><a href="#diversity" onClick={handleClick()}>911 Embrace - Diversity, Equity &amp; Inclusion</a></li>
              <li><a href="#csr" onClick={handleClick()}>911Reach - Our CSR initiatives</a></li>
              <li><a href="#board" onClick={handleClick()}>Board of Directors</a></li>
              <li><a href="#leadership" onClick={handleClick()}>Leadership Team</a></li>
              <li><a href="#group" onClick={handleClick()}>911 Group Enterprises</a></li>
              <li><a href="#equal-opportunity" onClick={handleClick()}>RPWD - Equal Opportunity Policy</a></li>
              <li><a href="#transgender" onClick={handleClick()}>Transgender Persons Policy</a></li>
              <li><a href="#hiv-policy" onClick={handleClick()}>HIV/AIDS workplace policy</a></li>
              <li><a href="#aircraft-seat" onClick={handleClick()}>Seat/Aircraft information</a></li>
            </ul>
          </div>

          {/* SUPPORT — 15 items, EXACT order from Image 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">SUPPORT</h4>
            <ul className="footer-links">
              <li><a href="#plan-b" onClick={handleClick()}>Plan B</a></li>
              <li><a href="#disability" onClick={handleClick()}>Special/Disability Assistance</a></li>
              <li><a href="#medical" onClick={handleClick()}>Medical Assistance</a></li>
              <li><a href="#seat-select" onClick={handleClick()}>Seat Select</a></li>
              <li><a href="#911-eats" onClick={handleClick()}>911 Eats</a></li>
              <li><a href="#add-ons" onClick={handleClick()}>Add-ons &amp; Services</a></li>
              <li><a href="#baggage" onClick={handleClick()}>Baggage</a></li>
              <li><a href="#refund" onClick={handleClick()}>Refund Claim</a></li>
              <li><a href="#charter" onClick={handleClick()}>Charter Services</a></li>
              <li><a href="#hotels" onClick={handleClick()}>Hotels</a></li>
              <li><a href="#911-skai" onClick={handleClick()}>911skai</a></li>
              <li><a href="#contact" onClick={handleClick(onNavigateHelp)}>Contact Us</a></li>
              <li><a href="#cargo" onClick={handleClick()}>911 Cargo</a></li>
              <li><a href="#tax" onClick={handleClick()}>Tax exemption</a></li>
              <li><a href="#faqs" onClick={handleClick(onNavigateHelp)}>FAQ's</a></li>
            </ul>
          </div>

          {/* QUICK LINKS — 21 items, EXACT order from Image 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="#tariff" onClick={handleClick()}>Tariff Sheet</a></li>
              <li><a href="#developer" onClick={handleClick()}>Developer Portal</a></li>
              <li><a href="#offers" onClick={handleClick(onNavigateBook)}>Offers</a></li>
              <li><a href="#careers" onClick={handleClick()}>Careers</a></li>
              <li><a href="#advertise" onClick={handleClick()}>Advertise with us</a></li>
              <li><a href="#sitemap" onClick={handleClick()}>Sitemap</a></li>
              <li><a href="#destinations" onClick={handleClick(onNavigateAbout)}>Destinations</a></li>
              <li><a href="#blogs" onClick={handleClick()}>Blogs</a></li>
              <li><a href="#terms" onClick={handleClick()}>Terms and Conditions</a></li>
              <li><a href="#carriage" onClick={handleClick()}>Conditions of carriage</a></li>
              <li><a href="#cookies" onClick={handleClick()}>Manage your cookie preferences</a></li>
              <li><a href="#privacy" onClick={handleClick()}>Privacy Policy</a></li>
              <li><a href="#disclaimer" onClick={handleClick()}>Disclaimer</a></li>
              <li><a href="#travel-tips" onClick={handleClick()}>International Travel Tips</a></li>
              <li><a href="#web-checkin" onClick={handleClick(onNavigateManage)}>Web check-in advisory</a></li>
              <li><a href="#purchase" onClick={handleClick()}>Purchase requirement</a></li>
              <li><a href="#download-app" onClick={handleClick()}>Download app</a></li>
              <li><a href="#flight-status" onClick={handleClick(onNavigateManage)}>Flight status</a></li>
              <li><a href="#codeshare" onClick={handleClick()}>Codeshare Partners</a></li>
              <li><a href="#domestic" onClick={handleClick(onNavigateBook)}>Domestic Flights</a></li>
              <li><a href="#international" onClick={handleClick(onNavigateBook)}>International Flights</a></li>
            </ul>
          </div>

          {/* MEDIA — 5 items, EXACT order from Image 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">MEDIA</h4>
            <ul className="footer-links">
              <li><a href="#press" onClick={handleClick()}>Press releases</a></li>
              <li><a href="#awards" onClick={handleClick()}>Our awards</a></li>
              <li><a href="#testimonials" onClick={handleClick()}>Testimonials</a></li>
              <li><a href="#magazine" onClick={handleClick()}>Hello 911 Magazine</a></li>
              <li><a href="#inflight" onClick={handleClick()}>In-flight Entertainment</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Socials + Privacy/Terms */}
        <div className="footer-bottom-bar">
          <div className="footer-left">
            <span className="copyright">&copy; {brandName} {year}</span>
            <div className="social-icons">
              <a href="#linkedin" className="social-circle" aria-label="LinkedIn" onClick={handleClick()}>in</a>
              <a href="#x" className="social-circle" aria-label="X (Twitter)" onClick={handleClick()}>𝕏</a>
              <a href="#facebook" className="social-circle" aria-label="Facebook" onClick={handleClick()}>f</a>
              <a href="#instagram" className="social-circle" aria-label="Instagram" onClick={handleClick()}>ig</a>
            </div>
          </div>

          <div className="footer-right">
            <a href="#privacy" onClick={handleClick()}>Privacy policy</a>
            <a href="#terms" onClick={handleClick()}>Terms &amp; conditions</a>
          </div>
        </div>
      </div>

      {/* Giant 911 Airlines text at bottom, OVER the airplane */}
      <div className="footer-brand-container">
        <h1 className="giant-brand-text">{brandName}</h1>
      </div>
    </footer>
  );
}
