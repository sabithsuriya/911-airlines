const fs = require('fs');

const columnsHTML = `
      <div class="footer-col">
        <h4>COMPANY</h4>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">911 Green – ESG report</a></li>
          <li><a href="#">911 Embrace - Diversity, Equity &amp; Inclusion</a></li>
          <li><a href="#">911Reach - Our CSR initiatives</a></li>
          <li><a href="#">Board of Directors</a></li>
          <li><a href="#">Leadership Team</a></li>
          <li><a href="#">911 Group Enterprises</a></li>
          <li><a href="#">RPWD - Equal Opportunity Policy</a></li>
          <li><a href="#">Transgender Persons Policy</a></li>
          <li><a href="#">HIV/AIDS workplace policy</a></li>
          <li><a href="#">Seat/Aircraft information</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>SUPPORT</h4>
        <ul>
          <li><a href="#">Plan B</a></li>
          <li><a href="#">Special/Disability Assistance</a></li>
          <li><a href="#">Medical Assistance</a></li>
          <li><a href="#">Seat Select</a></li>
          <li><a href="#">911 Eats</a></li>
          <li><a href="#">Add-ons &amp; Services</a></li>
          <li><a href="#">Baggage</a></li>
          <li><a href="#">Refund Claim</a></li>
          <li><a href="#">Charter Services</a></li>
          <li><a href="#">Hotels</a></li>
          <li><a href="#">911skai</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">911 Cargo</a></li>
          <li><a href="#">Tax exemption</a></li>
          <li><a href="#">FAQ's</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>QUICK LINKS</h4>
        <ul>
          <li><a href="#">Tariff Sheet</a></li>
          <li><a href="#">Developer Portal</a></li>
          <li><a href="#">Offers</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Advertise with us</a></li>
          <li><a href="#">Sitemap</a></li>
          <li><a href="#">Destinations</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Terms and Conditions</a></li>
          <li><a href="#">Conditions of carriage</a></li>
          <li><a href="#">Manage your cookie preferences</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
          <li><a href="#">International Travel Tips</a></li>
          <li><a href="#">Web check-in advisory</a></li>
          <li><a href="#">Purchase requirement</a></li>
          <li><a href="#">Download app</a></li>
          <li><a href="#">Flight status</a></li>
          <li><a href="#">Codeshare Partners</a></li>
          <li><a href="#">Domestic Flights</a></li>
          <li><a href="#">International Flights</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>MEDIA</h4>
        <ul>
          <li><a href="#">Press releases</a></li>
          <li><a href="#">Our awards</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">Hello 911 Magazine</a></li>
          <li><a href="#">In-flight Entertainment</a></li>
        </ul>
      </div>`;

const columnsJSX = `
          {/* COMPANY */}
          <div className="footer-col">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">911 Green – ESG report</a></li>
              <li><a href="#">911 Embrace - Diversity, Equity &amp; Inclusion</a></li>
              <li><a href="#">911Reach - Our CSR initiatives</a></li>
              <li><a href="#">Board of Directors</a></li>
              <li><a href="#">Leadership Team</a></li>
              <li><a href="#">911 Group Enterprises</a></li>
              <li><a href="#">RPWD - Equal Opportunity Policy</a></li>
              <li><a href="#">Transgender Persons Policy</a></li>
              <li><a href="#">HIV/AIDS workplace policy</a></li>
              <li><a href="#">Seat/Aircraft information</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="footer-col">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">Plan B</a></li>
              <li><a href="#">Special/Disability Assistance</a></li>
              <li><a href="#">Medical Assistance</a></li>
              <li><a href="#">Seat Select</a></li>
              <li><a href="#">911 Eats</a></li>
              <li><a href="#">Add-ons &amp; Services</a></li>
              <li><a href="#">Baggage</a></li>
              <li><a href="#">Refund Claim</a></li>
              <li><a href="#">Charter Services</a></li>
              <li><a href="#">Hotels</a></li>
              <li><a href="#">911skai</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">911 Cargo</a></li>
              <li><a href="#">Tax exemption</a></li>
              <li><a href="#">FAQ's</a></li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul>
              <li><a href="#">Tariff Sheet</a></li>
              <li><a href="#">Developer Portal</a></li>
              <li><a href="#">Offers</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Advertise with us</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Conditions of carriage</a></li>
              <li><a href="#">Manage your cookie preferences</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">International Travel Tips</a></li>
              <li><a href="#">Web check-in advisory</a></li>
              <li><a href="#">Purchase requirement</a></li>
              <li><a href="#">Download app</a></li>
              <li><a href="#">Flight status</a></li>
              <li><a href="#">Codeshare Partners</a></li>
              <li><a href="#">Domestic Flights</a></li>
              <li><a href="#">International Flights</a></li>
            </ul>
          </div>

          {/* MEDIA */}
          <div className="footer-col">
            <h4>MEDIA</h4>
            <ul>
              <li><a href="#">Press releases</a></li>
              <li><a href="#">Our awards</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Hello 911 Magazine</a></li>
              <li><a href="#">In-flight Entertainment</a></li>
            </ul>
          </div>`;

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const htmlRegex = /<div class="footer-col">[\s\S]*?<\/div>\s*<div class="newsletter">/;
html = html.replace(htmlRegex, columnsHTML + '\n\n      <div class="newsletter">');
fs.writeFileSync('index.html', html);

// Update Footer911.jsx
let jsx = fs.readFileSync('Footer911.jsx', 'utf8');
const jsxRegex = /\{\/\* Company \*\/\}[\s\S]*?<\/div>\s*\{\/\* Newsletter \*\/\}/;
jsx = jsx.replace(jsxRegex, columnsJSX + '\n\n          {/* Newsletter */}');
fs.writeFileSync('Footer911.jsx', jsx);

console.log('Update complete!');
