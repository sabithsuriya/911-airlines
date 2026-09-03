import { useState } from 'react';
import {
  Luggage,
  Search,
  ArrowLeft,
  CheckCircle2,
  Truck,
  FileText,
  DollarSign,
  Phone,
  Camera
} from 'lucide-react';
import './BaggageHelp.css';

interface BaggageHelpProps {
  onBack?: () => void;
}

export default function BaggageHelp({ onBack }: BaggageHelpProps) {
  const [pirCode, setPirCode] = useState('911BAG88421');
  const [lastName, setLastName] = useState('Smith');
  const [hasSearched, setHasSearched] = useState(true);
  const [activeTab, setActiveTab] = useState<'track' | 'report' | 'damaged' | 'compensation' | 'desks'>('track');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  return (
    <div className="baggagehelp-wrapper">
      {/* Hero Card */}
      <div className="baggagehelp-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <Luggage size={15} /> 911 Airlines WorldTracer Baggage Services
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Missing, Delayed &amp; Damaged Baggage Assistance</h2>
        <p className="intro-lead">
          Track your Property Irregularity Report (PIR) reference number in real-time, submit delayed bag
          delivery claims, or request emergency interim expense reimbursement.
        </p>

        {/* Tab Strip */}
        <div className="baggage-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => setActiveTab('track')}
          >
            <Search size={16} />
            <span>Live Bag Tracker</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            <FileText size={16} />
            <span>Report Delayed Bag</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'damaged' ? 'active' : ''}`}
            onClick={() => setActiveTab('damaged')}
          >
            <Camera size={16} />
            <span>Damaged Bag Claim</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'compensation' ? 'active' : ''}`}
            onClick={() => setActiveTab('compensation')}
          >
            <DollarSign size={16} />
            <span>Interim Expenses</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'desks' ? 'active' : ''}`}
            onClick={() => setActiveTab('desks')}
          >
            <Phone size={16} />
            <span>Airport Desks</span>
          </button>
        </div>
      </div>

      {/* Retrieval Search Card */}
      <div className="baggage-search-card">
        <div className="search-header">
          <Search size={22} className="search-icon" />
          <div>
            <h3>Search Property Irregularity Report (PIR)</h3>
            <p>Enter your 10-character reference number (e.g. 911BAG88421) and passenger surname.</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setHasSearched(true); }} className="baggage-form-grid">
          <div className="field-group">
            <label>PIR Reference Number</label>
            <input
              type="text"
              placeholder="e.g. 911BAG88421"
              value={pirCode}
              onChange={(e) => setPirCode(e.target.value.toUpperCase())}
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
            <button type="submit" className="btn-track-bag">
              <Search size={16} />
              <span>Track Luggage</span>
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="baggage-content-box">
          {/* TAB 1: TRACK */}
          {activeTab === 'track' && (
            <div className="tracker-view">
              <div className="tracker-status-card">
                <div className="tracker-head">
                  <div>
                    <span className="pir-label">FILE REFERENCE:</span>
                    <strong className="pir-val">{pirCode}</strong>
                  </div>
                  <span className="status-pill-green">Located · Out For Delivery</span>
                </div>

                <div className="bag-details-row">
                  <div>
                    <span>Passenger:</span> <strong>{lastName.toUpperCase()}, J.</strong>
                  </div>
                  <div>
                    <span>Flight:</span> <strong>911-408 (LHR ➔ JFK)</strong>
                  </div>
                  <div>
                    <span>Bag Tag:</span> <strong>0911482910</strong>
                  </div>
                  <div>
                    <span>Type:</span> <strong>Black Samsonite Spinner (28")</strong>
                  </div>
                </div>

                {/* Timeline */}
                <div className="tracking-timeline">
                  <div className="tl-step completed">
                    <div className="tl-circle"><CheckCircle2 size={16} /></div>
                    <div className="tl-info">
                      <h4>Report Filed at JFK Baggage Services</h4>
                      <span className="tl-time">Yesterday, 02:30 PM · JFK Terminal 8</span>
                      <p>Claim registered in global WorldTracer network.</p>
                    </div>
                  </div>

                  <div className="tl-step completed">
                    <div className="tl-circle"><CheckCircle2 size={16} /></div>
                    <div className="tl-info">
                      <h4>Bag Located at Heathrow Transfer Hub</h4>
                      <span className="tl-time">Yesterday, 06:15 PM · London LHR</span>
                      <p>Loaded onto next priority scheduled flight 911-412.</p>
                    </div>
                  </div>

                  <div className="tl-step completed">
                    <div className="tl-circle"><CheckCircle2 size={16} /></div>
                    <div className="tl-info">
                      <h4>Arrived at JFK &amp; Cleared Customs</h4>
                      <span className="tl-time">Today, 06:45 AM · New York JFK</span>
                      <p>Received by 911 Priority Baggage Courier partner.</p>
                    </div>
                  </div>

                  <div className="tl-step active">
                    <div className="tl-circle"><Truck size={16} /></div>
                    <div className="tl-info">
                      <h4>Out for Courier Delivery to Passenger Address</h4>
                      <span className="tl-time">Today, 08:30 AM · En Route</span>
                      <p>Estimated delivery window: 11:30 AM – 01:30 PM. Driver will call before arrival.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REPORT */}
          {activeTab === 'report' && (
            <div className="report-view">
              <div className="report-card">
                <h3>Submit Delayed Baggage Declaration</h3>
                <p>If your luggage did not arrive on the carousel, submit your baggage tag details below.</p>

                {reportSubmitted ? (
                  <div className="report-success">
                    <CheckCircle2 size={24} />
                    <div>
                      <strong>PIR Report Filed Successfully!</strong> Reference #911BAG{Math.floor(10000 + Math.random() * 90000)}. Our ground team has initiated automated WorldTracer recovery.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setReportSubmitted(true); }} className="report-form">
                    <div className="form-row-2">
                      <div className="field-group">
                        <label>Baggage Tag Barcode Number</label>
                        <input type="text" placeholder="e.g. 0911849201" required />
                      </div>
                      <div className="field-group">
                        <label>Flight Number &amp; Date</label>
                        <input type="text" placeholder="e.g. 911-408 / Today" required />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="field-group">
                        <label>Luggage Brand &amp; Color</label>
                        <input type="text" placeholder="e.g. Delsey Hardshell Navy Blue" required />
                      </div>
                      <div className="field-group">
                        <label>Delivery Address &amp; Hotel</label>
                        <input type="text" placeholder="Street Address, City, Zip Code" required />
                      </div>
                    </div>

                    <button type="submit" className="btn-submit-report">
                      Submit Delayed Baggage Report
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DAMAGED */}
          {activeTab === 'damaged' && (
            <div className="damaged-view">
              <div className="damaged-card">
                <Camera size={32} className="cam-icon" />
                <h3>Damaged Baggage Repair &amp; Replacement</h3>
                <p>
                  911 Airlines provides prompt repair or replacement for baggage damaged during transit
                  under our care.
                </p>
                <div className="dmg-steps-grid">
                  <div className="dmg-step">
                    <strong>1. File Within 7 Days:</strong> Report damage within 7 days of receiving your bag with photos.
                  </div>
                  <div className="dmg-step">
                    <strong>2. Authorised Repair:</strong> We arrange direct door-to-door courier pickup and authorized repair.
                  </div>
                  <div className="dmg-step">
                    <strong>3. Direct Replacement:</strong> If irreparable, a brand-new comparable suitcase is delivered.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPENSATION */}
          {activeTab === 'compensation' && (
            <div className="compensation-view">
              <div className="comp-card">
                <h3>Interim Expenses &amp; Passenger Rights</h3>
                <p>
                  If you are away from your home residence, 911 Airlines reimburses emergency essential
                  purchases (toiletries, necessary clothing) up to the limits set by the Montreal Convention.
                </p>
                <div className="comp-grid">
                  <div className="comp-box">
                    <h4>First &amp; Business Class</h4>
                    <span className="comp-amount">Up to $200 / day</span>
                    <p>Immediate advance for essential items during first 24 hours.</p>
                  </div>
                  <div className="comp-box">
                    <h4>Economy Class</h4>
                    <span className="comp-amount">Up to $100 / day</span>
                    <p>Reimbursed upon itemized receipt submission.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DESKS */}
          {activeTab === 'desks' && (
            <div className="desks-view">
              <div className="desks-grid">
                <div className="desk-card">
                  <h4>New York (JFK) Baggage Service Office</h4>
                  <p>Terminal 8, Arrivals Hall (Near Carousel 4)</p>
                  <span>Phone: +1 (718) 911-0400 · Open 24/7</span>
                </div>
                <div className="desk-card">
                  <h4>London Heathrow (LHR) Baggage Office</h4>
                  <p>Terminal 4, Ground Level Baggage Reclaim</p>
                  <span>Phone: +44 20 8911 4000 · Open 24/7</span>
                </div>
                <div className="desk-card">
                  <h4>Dubai International (DXB) Baggage Service</h4>
                  <p>Terminal 3, Concourse B Baggage Services</p>
                  <span>Phone: +971 4 911 3000 · Open 24/7</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
