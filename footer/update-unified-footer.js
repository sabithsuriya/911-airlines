const fs = require('fs');

const b64 = fs.readFileSync('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/plane-base64.txt', 'utf8').trim();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>911 Airlines — Official Footer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  :root {
    --blue-top: #6aaed6;
    --blue-mid: #7db9dd;
    --blue-deep: #8ec5e4;
    --line: rgba(255, 255, 255, 0.28);
    --text: rgba(255, 255, 255, 0.95);
    --text-dim: rgba(255, 255, 255, 0.75);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #eef4f8;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
  }

  /* ---------------- Single Continuous Footer with Plane Background ---------------- */
  footer.site-footer {
    position: relative;
    overflow: hidden;
    width: 100%;
    /* Single continuous background: Sky blue gradient multiply-blended over clean nose-on Boeing */
    background-color: #6baed6;
    background-image: 
      linear-gradient(180deg, 
        rgba(106, 174, 214, 0.96) 0%, 
        rgba(125, 185, 221, 0.90) 30%, 
        rgba(142, 197, 228, 0.72) 55%, 
        rgba(160, 209, 235, 0.35) 75%, 
        rgba(175, 218, 240, 0.50) 100%
      ),
      url("${b64}");
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-blend-mode: multiply, normal;
    color: var(--text-dim);
    padding: 56px 56px 0;
    box-shadow: 0 -10px 40px rgba(50, 100, 150, 0.1);
  }

  .footer-inner {
    position: relative;
    z-index: 5;
    max-width: 1240px;
    margin: 0 auto;
  }

  .footer-top {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
    padding-bottom: 36px;
  }

  .footer-col {
    flex: 1 1 150px;
    min-width: 140px;
  }

  .footer-col h4 {
    color: rgba(255, 255, 255, 0.72);
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 18px;
    letter-spacing: 0.3px;
  }

  .footer-col ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  .footer-col a {
    color: var(--text);
    text-decoration: none;
    font-size: 14.5px;
    font-weight: 500;
    transition: opacity 0.2s, transform 0.2s;
    display: inline-block;
  }

  .footer-col a:hover {
    color: #fff;
    opacity: 0.8;
    transform: translateX(2px);
  }

  .newsletter {
    flex: 1 1 340px;
    min-width: 280px;
    text-align: right;
  }

  .newsletter h3 {
    color: #fff;
    font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
    font-size: 29px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
  }

  .newsletter p {
    font-size: 13.5px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.55;
    margin: 0 0 18px;
    max-width: 380px;
    margin-left: auto;
  }

  .subscribe-row {
    display: flex;
    gap: 8px;
    max-width: 400px;
    margin-left: auto;
  }

  .subscribe-row input {
    flex: 1;
    background: rgba(255, 255, 255, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 30px;
    padding: 10px 18px;
    color: #fff;
    font-size: 13.5px;
    font-family: inherit;
    outline: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.2s;
  }

  .subscribe-row input::placeholder {
    color: rgba(255, 255, 255, 0.75);
  }

  .subscribe-row input:focus {
    background: rgba(255, 255, 255, 0.32);
    border-color: rgba(255, 255, 255, 0.8);
  }

  .subscribe-row button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    color: #1a3b5c;
    border: none;
    border-radius: 30px;
    padding: 10px 22px;
    font-size: 13.5px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .subscribe-row button:hover {
    background: #f4f8fc;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }

  .privacy-note {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 12px;
    max-width: 380px;
    margin-left: auto;
    line-height: 1.45;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 22px 0 10px;
    border-top: 1px solid var(--line);
  }

  .bottom-left {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.88);
  }

  .social-row {
    display: flex;
    gap: 8px;
  }

  .social-row a {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .social-row a:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.08);
  }

  .bottom-right {
    display: flex;
    gap: 24px;
    font-size: 13px;
  }

  .bottom-right a {
    color: rgba(255, 255, 255, 0.88);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .bottom-right a:hover {
    opacity: 0.7;
  }

  /* ---------------- .brand-band (Comfortable Vertical Spacing, No Clipping) ---------------- */
  .brand-band {
    position: relative;
    width: 100%;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0 45px 0;
    overflow: visible;
    z-index: 10;
  }

  .brand-band .brand-text {
    position: relative;
    font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
    font-size: clamp(68px, 13vw, 170px);
    font-weight: 900;
    color: #ffffff;
    white-space: nowrap;
    letter-spacing: -4px;
    line-height: 1;
    text-align: center;
    pointer-events: none;
    user-select: none;
    opacity: 0.96;
    margin: 0;
    padding: 0;
    /* Comfortable elevation above engines, perfect breathing room */
    text-shadow: 
      0 4px 30px rgba(50, 115, 175, 0.5), 
      0 0 60px rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 780px) {
    footer.site-footer { 
      padding: 44px 20px 0; 
      background-position: center bottom 20px;
    }
    .newsletter { text-align: left; }
    .newsletter p, .subscribe-row, .privacy-note { margin-left: 0; }
    .subscribe-row { max-width: 100%; }
    .footer-bottom { 
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
    .brand-band { 
      min-height: 140px; 
      padding: 20px 0 35px 0; 
    }
    .brand-band .brand-text { 
      font-size: clamp(48px, 14vw, 75px); 
      letter-spacing: -2px;
    }
  }
</style>
</head>
<body>

<footer class="site-footer">
  <div class="footer-inner">

    <div class="footer-top">

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#about">About us</a></li>
          <li><a href="#fleet">Our fleet</a></li>
          <li><a href="#experience">Passenger experience</a></li>
          <li><a href="#safety">Safety &amp; reliability</a></li>
          <li><a href="#sustainability">Sustainability</a></li>
          <li><a href="#careers">Careers</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="#corporate">Corporate travel</a></li>
          <li><a href="#cargo">Cargo &amp; logistics</a></li>
          <li><a href="#charter">Charter flights</a></li>
          <li><a href="#partnerships">Partnerships</a></li>
          <li><a href="#press">Press &amp; media</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="#contact">Contact us</a></li>
          <li><a href="#help">Help center</a></li>
          <li><a href="#faqs">FAQs</a></li>
          <li><a href="#accessibility">Accessibility services</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </div>

      <div class="newsletter">
        <h3>Your gateway to<br>911 updates.</h3>
        <p>Subscribe to 911 Airlines&rsquo; newsletter for updates on routes, fleet innovations, and exclusive announcements.</p>
        <div class="subscribe-row">
          <input type="email" placeholder="Enter your email address" aria-label="Email address">
          <button type="button">
            <span>Subscribe</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 16 16 12 12 8"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </button>
        </div>
        <p class="privacy-note">We respect your privacy. No spam &mdash; only meaningful updates.</p>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="bottom-left">
        <span>&copy;911 Airlines 2026</span>
        <div class="social-row">
          <a href="#linkedin" aria-label="LinkedIn">in</a>
          <a href="#x" aria-label="X">𝕏</a>
          <a href="#facebook" aria-label="Facebook">f</a>
          <a href="#instagram" aria-label="Instagram">ig</a>
        </div>
      </div>
      <div class="bottom-right">
        <a href="#privacy">Privacy policy</a>
        <a href="#terms">Terms &amp; conditions</a>
      </div>
    </div>

  </div>

  <!-- Seamless Brand Band with Perfectly Positioned .911 Airlines Text -->
  <div class="brand-band">
    <h1 class="brand-text">.911 Airlines</h1>
  </div>

</footer>

</body>
</html>`;

fs.writeFileSync('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/index.html', html);
console.log('index.html successfully updated with unified background and perfect vertical positioning!');
