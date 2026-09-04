import { useState } from 'react';
import {
  Plane,
  Calendar,
  Search,
  ArrowLeft,
  Armchair,
  Utensils,
  Luggage,
  CheckCircle2,
  QrCode,
  Download,
  Clock,
  FileText
} from 'lucide-react';
import './MyTripsHelp.css';

interface MyTripsHelpProps {
  onBack?: () => void;
  onNavigateManage?: () => void;
}

export default function MyTripsHelp({ onBack, onNavigateManage }: MyTripsHelpProps) {
  const [pnr, setPnr] = useState('911NYC');
  const [lastName, setLastName] = useState('Smith');
  const [hasSearched, setHasSearched] = useState(true);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'seats' | 'boarding' | 'dining' | 'faqs'>('itinerary');
  const [selectedSeat, setSelectedSeat] = useState('Suite 2A');
  const [selectedMeal, setSelectedMeal] = useState('Chef Signature Grilled Salmon');
  const [checkInDone, setCheckInDone] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnr && lastName) {
      setHasSearched(true);
    }
  };

  return (
    <div className="mytrips-wrapper">
      {/* Intro Banner */}
      <div className="mytrips-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <Plane size={15} /> 911 Airlines Trip Management
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Manage My Trips &amp; Online Check-in</h2>
        <p className="intro-lead">
          View your complete flight schedule, choose preferred seats, download mobile boarding passes,
          pre-order gourmet in-flight dining, and add extra baggage with 911 Airlines.
        </p>

        {/* Tab Strip */}
        <div className="trip-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            <Calendar size={16} />
            <span>Flight Itinerary</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'seats' ? 'active' : ''}`}
            onClick={() => setActiveTab('seats')}
          >
            <Armchair size={16} />
            <span>Seat &amp; Upgrades</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'boarding' ? 'active' : ''}`}
            onClick={() => setActiveTab('boarding')}
          >
            <QrCode size={16} />
            <span>Boarding Pass</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'dining' ? 'active' : ''}`}
            onClick={() => setActiveTab('dining')}
          >
            <Utensils size={16} />
            <span>In-Flight Dining</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <FileText size={16} />
            <span>Trip FAQs</span>
          </button>
        </div>
      </div>

      {/* Retrieval Search Card */}
      <div className="trip-search-card">
        <div className="search-header">
          <Search size={22} className="search-icon" />
          <div>
            <h3>Retrieve Your Flight Reservation</h3>
            <p>Enter your 6-character booking reference (e.g. 911NYC) and passenger surname.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="trip-form-grid">
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
              <span>Retrieve Trip</span>
            </button>
          </div>
        </form>
      </div>

      {/* Dynamic Results & Tabs */}
      {hasSearched && (
        <div className="trip-content-box">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="itinerary-view">
              <div className="flight-status-card">
                <div className="status-top-bar">
                  <div className="pnr-badge">
                    <span>PNR:</span> <strong>{pnr}</strong>
                  </div>
                  <span className="live-status-pill confirmed">Confirmed &amp; On Schedule</span>
                </div>

                <div className="flight-route-display">
                  <div className="airport-col">
                    <span className="iata-code">LHR</span>
                    <span className="city-name">London Heathrow</span>
                    <span className="time-val">10:30 AM · Terminal 4</span>
                  </div>

                  <div className="flight-path-middle">
                    <span className="duration-text">7h 45m · Non-stop</span>
                    <div className="flight-graphic">
                      <div className="path-line"></div>
                      <Plane className="plane-icon" size={20} />
                    </div>
                    <span className="aircraft-text">911 Airlines Flight 911-408 · Boeing 787-9 Dreamliner</span>
                  </div>

                  <div className="airport-col right">
                    <span className="iata-code">JFK</span>
                    <span className="city-name">New York JFK</span>
                    <span className="time-val">01:15 PM · Terminal 8</span>
                  </div>
                </div>

                <div className="flight-meta-grid">
                  <div className="meta-card">
                    <Clock size={16} className="meta-icon" />
                    <div>
                      <span className="meta-lbl">Boarding Time</span>
                      <strong>09:45 AM (Gate 14B)</strong>
                    </div>
                  </div>
                  <div className="meta-card">
                    <Armchair size={16} className="meta-icon" />
                    <div>
                      <span className="meta-lbl">Assigned Seat</span>
                      <strong>{selectedSeat} (First Suite)</strong>
                    </div>
                  </div>
                  <div className="meta-card">
                    <Luggage size={16} className="meta-icon" />
                    <div>
                      <span className="meta-lbl">Checked Baggage</span>
                      <strong>2 × 32kg Included</strong>
                    </div>
                  </div>
                  <div className="meta-card">
                    <Utensils size={16} className="meta-icon" />
                    <div>
                      <span className="meta-lbl">Selected Meal</span>
                      <strong>{selectedMeal}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEATS & UPGRADES */}
          {activeTab === 'seats' && (
            <div className="seats-view">
              <div className="seats-header">
                <h3>Select Your Preferred Cabin Seat</h3>
                <p>Enjoy extra legroom, direct aisle access, and lie-flat comfort on 911 Airlines.</p>
              </div>

              <div className="seat-options-grid">
                {[
                  { id: 'Suite 2A', type: 'First Class Private Suite', price: 'Included', desc: 'Full lie-flat privacy suite, sliding door, 32" 4K screen.' },
                  { id: 'Suite 2K', type: 'First Class Window Suite', price: '+ $0 (Complimentary)', desc: 'Unobstructed horizon cloud view, personal wardrobe.' },
                  { id: 'Seat 10A', type: 'Business Extra Legroom', price: '+ $75', desc: 'Dedicated aisle access with 48-inch legroom.' },
                  { id: 'Seat 14C', type: 'Economy Comfort Plus', price: '+ $35', desc: 'Forward cabin exit row with priority deplaning.' }
                ].map((st) => (
                  <div
                    key={st.id}
                    className={`seat-card ${selectedSeat === st.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSeat(st.id)}
                  >
                    <div className="seat-card-top">
                      <div className="seat-id-badge">{st.id}</div>
                      <span className="seat-price">{st.price}</span>
                    </div>
                    <h4>{st.type}</h4>
                    <p>{st.desc}</p>
                    <button type="button" className="btn-select-seat">
                      {selectedSeat === st.id ? '✓ Selected' : 'Choose Seat'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BOARDING PASS */}
          {activeTab === 'boarding' && (
            <div className="boarding-view">
              <div className="boarding-pass-card">
                <div className="bp-header">
                  <div className="bp-brand">911 AIRLINES</div>
                  <div className="bp-class">FIRST CLASS SUITE</div>
                </div>

                <div className="bp-body">
                  <div className="bp-row">
                    <div>
                      <span className="bp-lbl">PASSENGER</span>
                      <span className="bp-val">{lastName.toUpperCase()}, J. MR</span>
                    </div>
                    <div>
                      <span className="bp-lbl">FLIGHT</span>
                      <span className="bp-val">911-408</span>
                    </div>
                    <div>
                      <span className="bp-lbl">GATE</span>
                      <span className="bp-val">14B</span>
                    </div>
                    <div>
                      <span className="bp-lbl">SEAT</span>
                      <span className="bp-val">{selectedSeat}</span>
                    </div>
                  </div>

                  <div className="bp-route">
                    <div>
                      <span className="bp-city">LHR</span>
                      <span className="bp-time">10:30 AM</span>
                    </div>
                    <div className="bp-arrow">✈</div>
                    <div>
                      <span className="bp-city">JFK</span>
                      <span className="bp-time">01:15 PM</span>
                    </div>
                  </div>

                  <div className="bp-footer">
                    <div className="qr-sim">
                      <QrCode size={80} />
                      <span>Scan at Gate &amp; Lounge</span>
                    </div>
                    <div className="bp-actions">
                      <button
                        type="button"
                        className="btn-download-bp"
                        onClick={() => setCheckInDone(true)}
                      >
                        <Download size={16} /> Download Mobile Pass
                      </button>
                      {checkInDone && (
                        <div className="bp-success-text">
                          <CheckCircle2 size={16} /> Boarding pass saved to device.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DINING */}
          {activeTab === 'dining' && (
            <div className="dining-view">
              <div className="seats-header">
                <h3>Pre-Order Chef-Curated In-Flight Dining</h3>
                <p>Crafted by Michelin-starred culinary partners with organic farm ingredients.</p>
              </div>

              <div className="meals-grid">
                {[
                  {
                    name: 'Chef Signature Grilled Salmon',
                    cal: '540 kcal',
                    desc: 'Wild Atlantic salmon with saffron risotto, asparagus, and citrus beurre blanc.'
                  },
                  {
                    name: 'Prime Wagyu Beef Tenderloin',
                    cal: '680 kcal',
                    desc: 'Truffled potato puree, glazed baby carrots, and rosemary demi-glace.'
                  },
                  {
                    name: 'Mediterranean Stuffed Bell Pepper (Vegan)',
                    cal: '420 kcal',
                    desc: 'Organic quinoa, pine nuts, sun-dried tomatoes, and basil coulis.'
                  },
                  {
                    name: 'Pan-Seared Lobster Ravioli',
                    cal: '590 kcal',
                    desc: 'Maine lobster medallions with tarragon cream and caviar garnish.'
                  }
                ].map((meal) => (
                  <div
                    key={meal.name}
                    className={`meal-card ${selectedMeal === meal.name ? 'selected' : ''}`}
                    onClick={() => setSelectedMeal(meal.name)}
                  >
                    <div className="meal-head">
                      <h4>{meal.name}</h4>
                      <span className="meal-cal">{meal.cal}</span>
                    </div>
                    <p>{meal.desc}</p>
                    <button type="button" className="btn-select-seat">
                      {selectedMeal === meal.name ? '✓ Selected for Flight' : 'Select Meal'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="faqs-view">
              <div className="faq-item">
                <h4>When does online check-in open for 911 Airlines flights?</h4>
                <p>
                  Online check-in opens 48 hours prior to scheduled departure and closes 90 minutes
                  before international flight departures.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I add extra baggage online?</h4>
                <p>
                  Yes, you can pre-book additional baggage allowance up to 3 hours before departure at
                  a 35% discount compared to airport counter rates.
                </p>
              </div>
              {onNavigateManage && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <button
                    type="button"
                    className="btn-find-trip"
                    onClick={onNavigateManage}
                  >
                    Open Full Manage Booking Portal →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
