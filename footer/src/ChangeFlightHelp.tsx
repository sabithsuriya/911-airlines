import { useState } from 'react';
import {
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Plane,
  BadgePercent,
  Search,
  FileText,
  ShieldCheck
} from 'lucide-react';
import './ChangeFlightHelp.css';

interface ChangeFlightHelpProps {
  onBack?: () => void;
}

export default function ChangeFlightHelp({ onBack }: ChangeFlightHelpProps) {
  const [pnr, setPnr] = useState('911NYC');
  const [lastName, setLastName] = useState('Smith');
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState('911-412');
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'rebook' | 'flexibility' | 'disruption' | 'faqs'>('rebook');

  const availableFlights = [
    {
      id: '911-404',
      departTime: '07:15 AM',
      arriveTime: '10:00 AM',
      from: 'LHR',
      to: 'JFK',
      aircraft: 'Boeing 787-9',
      fareDiff: '+ $0 (Zero Change Fee)',
      cabin: 'First Class'
    },
    {
      id: '911-412',
      departTime: '02:30 PM',
      arriveTime: '05:15 PM',
      from: 'LHR',
      to: 'JFK',
      aircraft: 'Airbus A350-1000',
      fareDiff: '+ $0 (Included in Flex Fare)',
      cabin: 'First Class'
    },
    {
      id: '911-420',
      departTime: '08:00 PM',
      arriveTime: '10:45 PM',
      from: 'LHR',
      to: 'JFK',
      aircraft: 'Boeing 777-300ER',
      fareDiff: '+ $45 (Fare Difference)',
      cabin: 'First Class'
    }
  ];

  return (
    <div className="changeflight-wrapper">
      {/* Hero Card */}
      <div className="changeflight-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <RefreshCw size={15} /> 911 Airlines Flight Flexibility
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Change Flight &amp; Date Rescheduling</h2>
        <p className="intro-lead">
          Modify your departure date, switch to earlier or later flights on the same day, upgrade cabin
          classes, or reroute your journey with zero change fees on 911 Flex Fares.
        </p>

        {/* Tab Strip */}
        <div className="change-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'rebook' ? 'active' : ''}`}
            onClick={() => setActiveTab('rebook')}
          >
            <RefreshCw size={16} />
            <span>Select New Flight</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'flexibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('flexibility')}
          >
            <BadgePercent size={16} />
            <span>Fare Flexibility Rules</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'disruption' ? 'active' : ''}`}
            onClick={() => setActiveTab('disruption')}
          >
            <ShieldCheck size={16} />
            <span>Disruption Rebooking</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <FileText size={16} />
            <span>Change FAQs</span>
          </button>
        </div>
      </div>

      {/* Retrieval Card */}
      <div className="change-search-card">
        <div className="search-header">
          <RefreshCw size={22} className="search-icon" />
          <div>
            <h3>Search Booking to Modify Flights</h3>
            <p>Enter your 6-character PNR reference and passenger surname.</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setHasSearched(true); }} className="change-form-grid">
          <div className="field-group">
            <label>Booking Reference (PNR)</label>
            <input
              type="text"
              placeholder="e.g. 911NYC"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              maxLength={6}
              required
            />
          </div>
          <div className="field-group">
            <label>Passenger Last Name</label>
            <input
              type="text"
              placeholder="e.g. Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="submit-field">
            <button type="submit" className="btn-find-trip">
              <Search size={16} />
              <span>Find Itinerary</span>
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="change-content-box">
          {/* TAB 1: REBOOK */}
          {activeTab === 'rebook' && (
            <div className="rebook-view">
              <div className="current-ticket-pill">
                <strong>Current Flight:</strong> 911-408 · LHR ➔ JFK (10:30 AM Departure) · Passenger: {lastName.toUpperCase()}, J. MR
              </div>

              <h3>Choose Your Preferred Alternative Departure</h3>
              <p className="sub-text">All flights below include your original baggage allowance and lounge privileges.</p>

              <div className="flights-list">
                {availableFlights.map((fl) => (
                  <div
                    key={fl.id}
                    className={`flight-change-card ${selectedFlight === fl.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFlight(fl.id)}
                  >
                    <div className="fl-head">
                      <div className="fl-id-badge">{fl.id}</div>
                      <span className="fl-aircraft">{fl.aircraft} · {fl.cabin}</span>
                      <span className="fl-fare-diff">{fl.fareDiff}</span>
                    </div>

                    <div className="fl-times">
                      <div className="time-point">
                        <span className="time-val">{fl.departTime}</span>
                        <span className="iata-val">{fl.from} (London)</span>
                      </div>
                      <div className="arrow-sep">
                        <Plane size={18} />
                        <span className="direct-label">Non-stop</span>
                      </div>
                      <div className="time-point right">
                        <span className="time-val">{fl.arriveTime}</span>
                        <span className="iata-val">{fl.to} (New York)</span>
                      </div>
                    </div>

                    <div className="fl-action-row">
                      <button type="button" className="btn-select-flight">
                        {selectedFlight === fl.id ? '✓ Selected Flight' : 'Select Flight'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="confirm-change-bar">
                <div>
                  <h4>Ready to confirm flight change?</h4>
                  <p>New flight: {selectedFlight} on your requested date. No change fee applies.</p>
                </div>
                <button
                  type="button"
                  className="btn-confirm-rebook"
                  onClick={() => setChangeSuccess(true)}
                >
                  Confirm Flight Modification →
                </button>
              </div>

              {changeSuccess && (
                <div className="change-success-alert">
                  <CheckCircle2 size={24} />
                  <div>
                    <strong>Flight Change Successful!</strong> Your updated e-ticket has been sent to your registered email. Updated booking reference: {pnr}.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FLEXIBILITY RULES */}
          {activeTab === 'flexibility' && (
            <div className="flex-rules-view">
              <div className="flex-grid">
                <div className="flex-card">
                  <h4>Flex &amp; First Suites</h4>
                  <span className="flex-badge zero">Zero Change Fee</span>
                  <ul>
                    <li>Unlimited date &amp; time changes up to 2 hours before departure.</li>
                    <li>Complimentary same-day flight standby.</li>
                    <li>Full refundability with 0% penalty.</li>
                  </ul>
                </div>

                <div className="flex-card">
                  <h4>Classic Fare</h4>
                  <span className="flex-badge low">$35 Change Fee</span>
                  <ul>
                    <li>Date change allowed up to 4 hours before departure.</li>
                    <li>Fare difference applies if new flight fare is higher.</li>
                    <li>Ticket refundable as 911 SkyVoucher (+10% bonus).</li>
                  </ul>
                </div>

                <div className="flex-card">
                  <h4>Saver Fare</h4>
                  <span className="flex-badge standard">$75 Change Fee</span>
                  <ul>
                    <li>Changes permitted up to 24 hours prior to departure.</li>
                    <li>Route changes subject to fare recalculation.</li>
                    <li>Converted to SkyVoucher upon voluntary cancellation.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISRUPTION */}
          {activeTab === 'disruption' && (
            <div className="disruption-view">
              <div className="disruption-card">
                <ShieldCheck size={32} className="shield-icon" />
                <h3>911 Airlines Schedule Protection Guarantee</h3>
                <p>
                  If your flight is rescheduled or delayed by more than 60 minutes due to weather,
                  air traffic control, or operational conditions, you are entitled to:
                </p>
                <div className="protection-grid">
                  <div className="prot-item">
                    <strong>100% Free Rebooking:</strong> Choose any alternative 911 Airlines flight within 14 days with zero fees.
                  </div>
                  <div className="prot-item">
                    <strong>Full Fare Refund:</strong> Request immediate full cash refund to original payment or SkyVoucher with 10% bonus.
                  </div>
                  <div className="prot-item">
                    <strong>Complimentary Lounge &amp; Hotel:</strong> Provided for layovers exceeding 6 hours due to airline schedule disruptions.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS */}
          {activeTab === 'faqs' && (
            <div className="faqs-view">
              <div className="faq-item">
                <h4>How late before departure can I change my flight?</h4>
                <p>
                  Flight changes can be made online up to 2 hours prior to scheduled flight departure.
                </p>
              </div>
              <div className="faq-item">
                <h4>What happens if the new flight is cheaper?</h4>
                <p>
                  If the new flight fare is lower than your original ticket, the difference will be
                  issued as a 911 Airlines SkyVoucher valid for 24 months.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I change the passenger name on my ticket?</h4>
                <p>
                  Minor spelling corrections (up to 3 characters) are free. Complete ticket transfers
                  to another individual are not permitted under international aviation security rules.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
