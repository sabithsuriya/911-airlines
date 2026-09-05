import React, { useState } from 'react';

export default function Footer911Tailwind() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#64a6d8] via-[#8bc5e5] to-[#9dd2ec] text-white relative overflow-hidden font-sans">
      {/* Top Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {/* Company */}
          <div className="flex flex-col">
            <h4 className="text-[13.5px] font-medium text-white/75 mb-5 tracking-wide">Company</h4>
            <ul className="space-y-3">
              {['About us', 'Our fleet', 'Passenger experience', 'Safety & reliability', 'Sustainability', 'Careers'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[14.5px] font-medium text-white/95 hover:text-white/75 hover:translate-x-0.5 transition-all inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col">
            <h4 className="text-[13.5px] font-medium text-white/75 mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {['Corporate travel', 'Cargo & logistics', 'Charter flights', 'Partnerships', 'Press & media'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[14.5px] font-medium text-white/95 hover:text-white/75 hover:translate-x-0.5 transition-all inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h4 className="text-[13.5px] font-medium text-white/75 mb-5 tracking-wide">Support</h4>
            <ul className="space-y-3">
              {['Contact us', 'Help center', 'FAQs', 'Accessibility services', 'Feedback'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[14.5px] font-medium text-white/95 hover:text-white/75 hover:translate-x-0.5 transition-all inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col lg:pl-3">
            <h3 className="text-2xl md:text-[27px] font-bold text-white leading-tight mb-3 tracking-tight">
              Your gateway to<br />911 updates.
            </h3>
            <p className="text-[13.5px] text-white/80 leading-relaxed mb-5 max-w-sm">
              Subscribe to 911 Airlines' newsletter for updates on routes, fleet innovations, and exclusive announcements.
            </p>

            <form onSubmit={handleSubmit} className="mb-3">
              <div className="flex items-center bg-white/20 border border-white/40 rounded-full p-1 pl-4.5 backdrop-blur-md focus-within:bg-white/30 focus-within:border-white/70 transition-all max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-white text-[13.5px] placeholder:text-white/70 py-1.5"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-white text-[#1a3b5c] font-semibold text-[13.5px] px-4.5 py-2 rounded-full hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm whitespace-nowrap"
                >
                  {subscribed ? 'Subscribed ✓' : (
                    <>
                      <span>Subscribe</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 16 16 12 12 8" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
            <p className="text-xs text-white/70">
              We respect your privacy. No spam — only meaningful updates.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-white/20 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm text-white/85">&copy;911 Airlines 2026</span>
            <div className="flex gap-2">
              {[
                { name: 'in', label: 'LinkedIn' },
                { name: '𝕏', label: 'Twitter' },
                { name: 'f', label: 'Facebook' },
                { name: 'ig', label: 'Instagram' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.label.toLowerCase()}`}
                  aria-label={social.label}
                  className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-xs text-white hover:bg-white/20 hover:scale-110 transition-all"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-5 text-xs md:text-sm text-white/85 font-medium">
            <a href="#privacy" className="hover:opacity-75 transition-opacity">Privacy policy</a>
            <a href="#terms" className="hover:opacity-75 transition-opacity">Terms &amp; conditions</a>
          </div>
        </div>
      </div>

      {/* Bottom Aircraft + Big Typography */}
      <div className="relative w-full h-[240px] md:h-[310px] overflow-hidden flex items-end justify-center bg-gradient-to-b from-transparent to-[#b8e0f5]/60">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src="https://raw.githubusercontent.com/sabithsuriya/911-airlines/Main/source/2a74f3e6bf36fab3e2c1ae223b3f1a4c.webp"
            alt="911 Airlines Fleet"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        <div className="absolute -bottom-6 w-full text-center z-10 pointer-events-none">
          <h1 className="text-[54px] sm:text-[90px] md:text-[130px] lg:text-[150px] font-black text-white/90 tracking-tighter leading-none select-none drop-shadow-[0_2px_25px_rgba(255,255,255,0.4)]">
            .911 Airlines
          </h1>
        </div>
      </div>
    </footer>
  );
}
