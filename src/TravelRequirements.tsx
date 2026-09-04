import React, { useState } from 'react';
import {
  Globe,
  FileText,
  ShieldAlert,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  Compass,
  Plane,
  HeartPulse,
  BadgeDollarSign,
  Search,
  BookOpen,
  Building2,
  Users,
  ShieldCheck,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import './TravelRequirements.css';

interface TravelRequirementsProps {
  onBack?: () => void;
}

interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  visaStatus: string;
  visaType: 'free' | 'evisa' | 'voa' | 'required';
  passportValidity: string;
  blankPages: string;
  healthReq: string;
  customsRule: string;
  transitRule: string;
  advisoryLevel: 'normal' | 'caution' | 'warning';
  advisoryNote: string;
}

const COUNTRIES_DATA: CountryInfo[] = [
  {
    code: 'US',
    name: 'United States (New York / Los Angeles)',
    flag: '🇺🇸',
    visaStatus: 'ESTA (Visa Waiver Program) required for eligible nationals; B1/B2 Visa required for others.',
    visaType: 'evisa',
    passportValidity: 'Passport must be valid for at least 6 months beyond the intended period of stay (unless member of Six-Month Club).',
    blankPages: 'At least 1 blank visa page.',
    healthReq: 'No COVID-19 vaccine or test mandate. Comprehensive medical insurance highly advised.',
    customsRule: 'Currency over $10,000 must be declared on FinCEN Form 105. Fresh fruits, vegetables, and meat products are strictly prohibited.',
    transitRule: 'Transit through the US requires a valid ESTA or C-1 transit visa for all connecting international passengers.',
    advisoryLevel: 'normal',
    advisoryNote: 'Apply for ESTA at least 72 hours before 911 Airlines flight departure. Ensure passport biometric chip is readable.'
  },
  {
    code: 'GB',
    name: 'United Kingdom (London)',
    flag: '🇬🇧',
    visaStatus: 'UK ETA (Electronic Travel Authorisation) or standard visitor visa required based on citizenship.',
    visaType: 'evisa',
    passportValidity: 'Must be valid for the entire proposed duration of your stay in the UK.',
    blankPages: 'At least 1 blank page for stamps.',
    healthReq: 'No mandatory vaccines required. Comprehensive travel medical insurance strongly advised.',
    customsRule: 'Standard duty-free allowances: 42L of beer, 18L of still wine, £390 worth of other commercial goods.',
    transitRule: 'Direct Airside Transit Visa (DATV) may be required depending on passport nationality unless holding eligible exemption visas.',
    advisoryLevel: 'normal',
    advisoryNote: 'UK ETA is mandatory for eligible non-visa nationals. Apply at least 3 days prior to departure.'
  },
  {
    code: 'FR',
    name: 'France / Schengen Area (Paris)',
    flag: '🇫🇷',
    visaStatus: 'Visa-free for eligible non-EU nationals for up to 90 days in any 180-day period (ETIAS launching). Schengen visa required for non-exempt.',
    visaType: 'free',
    passportValidity: 'Must be valid for at least 3 months after intended departure from the Schengen area and issued within the past 10 years.',
    blankPages: 'At least 2 blank pages.',
    healthReq: 'Travel medical insurance with minimum €30,000 emergency medical and repatriation coverage is mandatory for visa holders.',
    customsRule: 'Declare cash, traveler cheques or valuables exceeding €10,000. Standard EU duty-free limits apply.',
    transitRule: 'Airport Transit Visa (ATV) required for certain nationalities when transiting through French airport international zones.',
    advisoryLevel: 'caution',
    advisoryNote: 'Ensure your passport was issued within 10 years of your entry date. Enhanced security checks during peak seasonal travel.'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates (Dubai / Abu Dhabi)',
    flag: '🇦🇪',
    visaStatus: '30-day or 90-day Visa on Arrival for eligible citizens; tourist eVisa available for other passport holders.',
    visaType: 'voa',
    passportValidity: 'Must have at least 6 months remaining validity from the date of arrival.',
    blankPages: 'At least 2 blank pages.',
    healthReq: 'Certain prescription medications require prior UAE Ministry of Health and Prevention (MOHAP) online permit.',
    customsRule: 'Prohibited items include narcotic substances, certain banned medications, and counterfeit currencies. Currency declaration limit: AED 60,000.',
    transitRule: 'Airside transit at DXB and AUH is visa-free for up to 24 hours with confirmed onward 911 Airlines ticket.',
    advisoryLevel: 'normal',
    advisoryNote: 'Smart Gates accessible at Dubai International Airport for pre-registered and eligible passport holders.'
  },
  {
    code: 'QA',
    name: 'Qatar (Doha)',
    flag: '🇶🇦',
    visaStatus: 'Visa-free entry available for citizens of 100+ countries for up to 30 or 90 days.',
    visaType: 'free',
    passportValidity: 'Minimum 3 months remaining validity from date of arrival (6 months recommended).',
    blankPages: 'At least 1 blank visa page.',
    healthReq: 'Mandatory health insurance policy approved by MOPH for stays exceeding 30 days. No mandatory yellow fever unless traveling from endemic areas.',
    customsRule: 'Alcohol cannot be imported into Qatar. Max QAR 50,000 / $10,000 currency declaration threshold.',
    transitRule: 'Airside transit at Hamad International Airport (DOH) is visa-free for up to 24 hours with confirmed onward booking on 911 Airlines partner flights.',
    advisoryLevel: 'normal',
    advisoryNote: 'Automated Smart Gates available for eligible e-Passport holders.'
  },
  {
    code: 'JP',
    name: 'Japan (Tokyo)',
    flag: '🇯🇵',
    visaStatus: 'Visa-exempt for up to 90 days for 70+ jurisdictions (tourism/business). eVisa available for select non-exempt countries.',
    visaType: 'free',
    passportValidity: 'Valid for the full duration of planned stay in Japan (machine-readable or IC passport recommended).',
    blankPages: 'At least 1 blank page.',
    healthReq: 'Visit Japan Web registration recommended for fast-track immigration and customs clearance.',
    customsRule: 'Meat products and certain plant products strictly prohibited. Cash over JPY 1,000,000 must be declared.',
    transitRule: 'Same-day airside transit allowed without visa at Haneda (HND) and Narita (NRT) within operating hours.',
    advisoryLevel: 'normal',
    advisoryNote: 'Complete digital immigration & customs via Visit Japan Web QR codes before departure for express processing.'
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    visaStatus: 'Visa-free entry for up to 30 or 90 days for most nationalities. SG Arrival Card submission mandatory.',
    visaType: 'free',
    passportValidity: 'Minimum 6 months remaining validity from arrival date.',
    blankPages: 'At least 2 blank pages.',
    healthReq: 'SG Arrival Card with electronic health declaration must be submitted within 3 days prior to arrival.',
    customsRule: 'Chewing gum, e-cigarettes/vapes, and weapon replicas are strictly prohibited. Zero duty-free concession on tobacco products.',
    transitRule: 'Changi Airport (SIN) allows sterile airside transit without visa if booked on connecting itinerary.',
    advisoryLevel: 'normal',
    advisoryNote: 'Ensure SG Arrival Card is completed online before reaching Changi Airport checkpoints.'
  },
  {
    code: 'AU',
    name: 'Australia (Sydney / Melbourne)',
    flag: '🇦🇺',
    visaStatus: 'All non-citizens must obtain an ETA (subclass 601), eVisitor (subclass 651), or Visitor visa (subclass 600) prior to travel.',
    visaType: 'evisa',
    passportValidity: 'Valid for duration of intended stay; minimum 6 months validity strongly recommended.',
    blankPages: 'At least 1 blank page.',
    healthReq: 'Strict biosecurity laws. Yellow fever certificate required if arriving within 6 days of visiting an infected country.',
    customsRule: 'Declare all food, plant material, wooden items and animal products on Incoming Passenger Card upon arrival.',
    transitRule: 'Transit without visa (TWOV) allowed for eligible nationalities for layovers under 8 hours without leaving transit lounge.',
    advisoryLevel: 'normal',
    advisoryNote: 'Apply for Australian ETA via the official Australian ETA smartphone app well in advance.'
  },
  {
    code: 'TH',
    name: 'Thailand (Bangkok)',
    flag: '🇹🇭',
    visaStatus: '60-day visa exemption scheme for eligible countries; Visa on Arrival (15 days) or eVisa for others.',
    visaType: 'free',
    passportValidity: 'Must have at least 6 months validity from date of entry.',
    blankPages: 'At least 2 blank pages.',
    healthReq: 'Proof of health insurance may be requested for certain visa categories. Digital arrival registration when required.',
    customsRule: 'E-cigarettes and vape devices are illegal in Thailand. Cash over USD 20,000 must be declared.',
    transitRule: 'Airside transit allowed for layovers under 12 hours with confirmed onward boarding passes at Suvarnabhumi Airport (BKK).',
    advisoryLevel: 'caution',
    advisoryNote: 'Possession of electronic cigarettes/vapes is punishable by fines or detention. Keep prescriptions with original packaging.'
  },
  {
    code: 'CA',
    name: 'Canada (Toronto / Vancouver)',
    flag: '🇨🇦',
    visaStatus: 'Electronic Travel Authorization (eTA) required for visa-exempt foreign nationals flying to Canada; Visitor Visa for others.',
    visaType: 'evisa',
    passportValidity: 'Must be valid for the duration of stay in Canada.',
    blankPages: 'At least 1 blank page.',
    healthReq: 'No mandatory vaccinations. Medical insurance recommended. Advance Declaration via ArriveCAN available.',
    customsRule: 'Declare all food, plants, and animal products. Currency exceeding CAD 10,000 must be declared.',
    transitRule: 'Transit through Canada requires an eTA or Transit Visa depending on passport nationality (unless eligible under TWOV program).',
    advisoryLevel: 'normal',
    advisoryNote: 'Submit your Advance Declaration using the ArriveCAN portal up to 72 hours before arrival at major airports.'
  },
  {
    code: 'IN',
    name: 'India (Delhi / Mumbai)',
    flag: '🇮🇳',
    visaStatus: 'Indian e-Visa (Tourist, Business, Medical) required prior to travel for most nationalities; Regular visa for others.',
    visaType: 'evisa',
    passportValidity: 'Must have at least 6 months validity from the date of arrival in India.',
    blankPages: 'At least 2 blank pages for stamping by immigration officer.',
    healthReq: 'Yellow Fever and Polio vaccination certificate required if arriving from or transiting through endemic countries.',
    customsRule: 'Declare foreign currency notes above USD 5,000 or total currency instruments above USD 10,000. Drones prohibited without DGCA license.',
    transitRule: 'Direct airside transit permitted for layovers under 24 hours if baggage is checked through to final destination.',
    advisoryLevel: 'normal',
    advisoryNote: 'Apply for Indian e-Visa only on the official government website at least 4 business days before departure.'
  }
];

const CITIZENSHIPS = [
  'United States of America',
  'United Kingdom',
  'Qatar',
  'United Arab Emirates',
  'Saudi Arabia',
  'Germany',
  'France',
  'Italy',
  'Canada',
  'Australia',
  'Japan',
  'Singapore',
  'India',
  'China',
  'South Africa',
  'Brazil',
  'Switzerland',
  'Netherlands',
  'Spain',
  'New Zealand'
];

const DEPARTURES = [
  'United States (New York - JFK)',
  'United Kingdom (London Heathrow - LHR)',
  'United States (Los Angeles - LAX)',
  'France (Paris Charles de Gaulle - CDG)',
  'United Arab Emirates (Dubai - DXB)',
  'Germany (Frankfurt - FRA)',
  'Singapore (Changi - SIN)',
  'Japan (Tokyo Haneda - HND)',
  'Australia (Sydney Kingsford - SYD)',
  'Canada (Toronto Pearson - YYZ)',
  'India (Delhi Indira Gandhi - DEL)',
  'Saudi Arabia (Riyadh - RUH)',
  'Qatar (Hamad International - DOH)'
];

const DOCUMENT_TYPES = [
  'Passport: Normal',
  'Passport: Diplomatic',
  'Passport: Official / Service',
  "Alien's Passport / Refugee Travel Document",
  'Emergency Travel Document',
  'National Identity Card / Residence Permit'
];

const TRANSIT_OPTIONS = [
  'None (Direct Flight / No Transit)',
  '911 Global Hub (New York - JFK)',
  '911 Global Hub (London Heathrow - LHR)',
  '911 Global Hub (Dubai - DXB)',
  '911 Global Hub (Frankfurt - FRA)',
  '911 Global Hub (Singapore - SIN)',
  'Doha International Airport (DOH)'
];

export default function TravelRequirements({ onBack }: TravelRequirementsProps) {
  const [destinationCode, setDestinationCode] = useState('US');
  const [citizenship, setCitizenship] = useState('United States of America');
  const [departure, setDeparture] = useState('United Kingdom (London Heathrow - LHR)');
  const [residence, setResidence] = useState('United States of America');
  const [documentType, setDocumentType] = useState('Passport: Normal');
  const [transit, setTransit] = useState('None (Direct Flight / No Transit)');
  const [activeTab, setActiveTab] = useState<'checker' | 'more-info' | 'links' | 'advisories'>('checker');
  const [requirementSection, setRequirementSection] = useState<'all' | 'passport' | 'visa' | 'health' | 'customs' | 'transit'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const selectedCountry = COUNTRIES_DATA.find((c) => c.code === destinationCode) || COUNTRIES_DATA[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 400);
  };

  return (
    <div className="travel-req-wrapper">
      {/* Top Banner Notice */}
      <div className="travel-req-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <Globe size={16} /> Official Entry Guidance
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Preparing for your next journey?</h2>
        <p className="intro-lead">
          Before booking your flight with 911 Airlines, we recommend that you check the latest
          information on entry requirements to ensure you have the necessary documents at the time of
          travel.
        </p>

        {/* Tab Navigation */}
        <div className="travel-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
            onClick={() => setActiveTab('checker')}
          >
            <Compass size={17} />
            <span>Check Requirements</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'more-info' ? 'active' : ''}`}
            onClick={() => setActiveTab('more-info')}
          >
            <BookOpen size={17} />
            <span>More Information</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`}
            onClick={() => setActiveTab('links')}
          >
            <ExternalLink size={17} />
            <span>Helpful Links</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'advisories' ? 'active' : ''}`}
            onClick={() => setActiveTab('advisories')}
          >
            <ShieldAlert size={17} />
            <span>Travel Advisories</span>
            <span className="live-pill">Live</span>
          </button>
        </div>
      </div>

      {/* Courtesy Disclaimer Banner 1 */}
      <div className="courtesy-banner">
        <Info size={20} className="courtesy-icon" />
        <div className="courtesy-text">
          <strong>Notice:</strong> This information is provided by 911 Airlines as a courtesy.
          Although it is updated regularly, please check back frequently as travel conditions can
          change. It is recommended that you verify travel and entry requirements through independent
          inquiries before your trip.
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CHECKER */}
      {activeTab === 'checker' && (
        <div className="checker-container">
          <div className="checker-form-card">
            <div className="checker-header">
              <div className="icon-wrap">
                <FileText size={22} />
              </div>
              <div>
                <h3>Check your travel requirements</h3>
                <p>
                  Enter your information below to learn the latest on passport, visa, health and
                  customs requirements of your destination.
                </p>
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="req-form-grid">
              {/* Destination */}
              <div className="field-group">
                <label htmlFor="req-destination">
                  <MapPin size={15} /> Destination
                </label>
                <select
                  id="req-destination"
                  value={destinationCode}
                  onChange={(e) => setDestinationCode(e.target.value)}
                  className="custom-select"
                >
                  {COUNTRIES_DATA.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Citizenship */}
              <div className="field-group">
                <label htmlFor="req-citizenship">
                  <Globe size={15} /> Citizenship
                </label>
                <select
                  id="req-citizenship"
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                  className="custom-select"
                >
                  {CITIZENSHIPS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country of departure */}
              <div className="field-group">
                <label htmlFor="req-departure">
                  <Plane size={15} /> Country of departure
                </label>
                <select
                  id="req-departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="custom-select"
                >
                  {DEPARTURES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country of residence */}
              <div className="field-group">
                <label htmlFor="req-residence">
                  <Building2 size={15} /> Country of residence
                </label>
                <select
                  id="req-residence"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  className="custom-select"
                >
                  {CITIZENSHIPS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document type */}
              <div className="field-group">
                <label htmlFor="req-doc-type">
                  <FileText size={15} /> Document type
                </label>
                <select
                  id="req-doc-type"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="custom-select"
                >
                  {DOCUMENT_TYPES.map((dt) => (
                    <option key={dt} value={dt}>
                      {dt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transit country/region */}
              <div className="field-group">
                <label htmlFor="req-transit">
                  <Compass size={15} /> Transit country/region
                </label>
                <select
                  id="req-transit"
                  value={transit}
                  onChange={(e) => setTransit(e.target.value)}
                  className="custom-select"
                >
                  {TRANSIT_OPTIONS.map((tr) => (
                    <option key={tr} value={tr}>
                      {tr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn-check-req" disabled={isSearching}>
                  <Search size={17} />
                  <span>{isSearching ? 'Checking databases...' : 'Check Requirements'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results Display */}
          {hasSearched && (
            <div className="results-summary-card">
              <div className="results-hero-header">
                <div className="dest-flag-badge">
                  <span className="flag-emoji">{selectedCountry.flag}</span>
                  <div>
                    <h4>{selectedCountry.name}</h4>
                    <span className="route-sub">
                      Traveling from {departure.split('(')[0]} · Citizen of {citizenship}
                    </span>
                  </div>
                </div>

                <div className="doc-pill-info">
                  <span className="pill-item">
                    <strong>Document:</strong> {documentType}
                  </span>
                  <span className="pill-item">
                    <strong>Transit:</strong> {transit.split('(')[0]}
                  </span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="category-filter-bar">
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'all' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('all')}
                >
                  Overview (All)
                </button>
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'passport' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('passport')}
                >
                  Passport &amp; Documents
                </button>
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'visa' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('visa')}
                >
                  Visa &amp; Entry
                </button>
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'health' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('health')}
                >
                  Health &amp; Medical
                </button>
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'customs' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('customs')}
                >
                  Customs &amp; Duty
                </button>
                <button
                  type="button"
                  className={`cat-pill ${requirementSection === 'transit' ? 'active' : ''}`}
                  onClick={() => setRequirementSection('transit')}
                >
                  Transit Rules
                </button>
              </div>

              {/* Requirement Cards Grid */}
              <div className="req-cards-grid">
                {/* 1. Passport */}
                {(requirementSection === 'all' || requirementSection === 'passport') && (
                  <div className="req-card">
                    <div className="req-card-head">
                      <div className="req-icon-box passport">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h5>Passport &amp; Document Validity</h5>
                        <span className="status-tag tag-verified">Mandatory Standard</span>
                      </div>
                    </div>
                    <div className="req-card-body">
                      <div className="bullet-point">
                        <CheckCircle2 size={16} className="bullet-icon check" />
                        <div>
                          <strong>Validity Period:</strong> {selectedCountry.passportValidity}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <CheckCircle2 size={16} className="bullet-icon check" />
                        <div>
                          <strong>Blank Visa Pages:</strong> {selectedCountry.blankPages}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <Info size={16} className="bullet-icon info" />
                        <div>
                          <strong>Document Condition:</strong> Must be intact, undamaged, and
                          machine-readable. Biometric / e-Passports are eligible for Smart Gates.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Visa */}
                {(requirementSection === 'all' || requirementSection === 'visa') && (
                  <div className="req-card">
                    <div className="req-card-head">
                      <div className="req-icon-box visa">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h5>Visa &amp; Entry Permission</h5>
                        <span className="status-tag tag-info">Entry Authorization</span>
                      </div>
                    </div>
                    <div className="req-card-body">
                      <div className="bullet-point">
                        <CheckCircle2 size={16} className="bullet-icon check" />
                        <div>
                          <strong>Entry Status:</strong> {selectedCountry.visaStatus}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <Info size={16} className="bullet-icon info" />
                        <div>
                          <strong>Return/Onward Ticket:</strong> A confirmed return or onward flight
                          ticket is required by immigration authorities at check-in.
                        </div>
                      </div>
                      <div className="bullet-point">
                        <Info size={16} className="bullet-icon info" />
                        <div>
                          <strong>Proof of Accommodation:</strong> Hotel reservation, host address, or
                          residence details must be provided on arrival.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Health */}
                {(requirementSection === 'all' || requirementSection === 'health') && (
                  <div className="req-card">
                    <div className="req-card-head">
                      <div className="req-icon-box health">
                        <HeartPulse size={20} />
                      </div>
                      <div>
                        <h5>Health &amp; Vaccination</h5>
                        <span className="status-tag tag-health">Medical Guidelines</span>
                      </div>
                    </div>
                    <div className="req-card-body">
                      <div className="bullet-point">
                        <CheckCircle2 size={16} className="bullet-icon check" />
                        <div>
                          <strong>Vaccination Status:</strong> {selectedCountry.healthReq}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <ShieldCheck size={16} className="bullet-icon shield" />
                        <div>
                          <strong>Travel Health Insurance:</strong> International emergency medical &amp;
                          evacuation coverage is highly recommended.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Customs */}
                {(requirementSection === 'all' || requirementSection === 'customs') && (
                  <div className="req-card">
                    <div className="req-card-head">
                      <div className="req-icon-box customs">
                        <BadgeDollarSign size={20} />
                      </div>
                      <div>
                        <h5>Customs &amp; Currency Rules</h5>
                        <span className="status-tag tag-customs">Border Control</span>
                      </div>
                    </div>
                    <div className="req-card-body">
                      <div className="bullet-point">
                        <AlertTriangle size={16} className="bullet-icon alert" />
                        <div>
                          <strong>Currency &amp; Goods:</strong> {selectedCountry.customsRule}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <Info size={16} className="bullet-icon info" />
                        <div>
                          <strong>Prescription Medications:</strong> Carry medications in original
                          labeled containers alongside an official doctor prescription in English.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Transit */}
                {(requirementSection === 'all' || requirementSection === 'transit') && (
                  <div className="req-card">
                    <div className="req-card-head">
                      <div className="req-icon-box transit">
                        <Compass size={20} />
                      </div>
                      <div>
                        <h5>Transit Regulations</h5>
                        <span className="status-tag tag-transit">Transfer Hub</span>
                      </div>
                    </div>
                    <div className="req-card-body">
                      <div className="bullet-point">
                        <CheckCircle2 size={16} className="bullet-icon check" />
                        <div>
                          <strong>Layover Rules:</strong> {selectedCountry.transitRule}
                        </div>
                      </div>
                      <div className="bullet-point">
                        <Info size={16} className="bullet-icon info" />
                        <div>
                          <strong>Baggage Through-Check:</strong> Baggage is automatically transferred
                          when traveling on single e-ticket bookings via 911 Airlines and partner
                          carriers.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MORE INFORMATION */}
      {activeTab === 'more-info' && (
        <div className="more-info-container">
          <div className="section-intro">
            <h3>Essential Travel Requirements &amp; Document Guidelines</h3>
            <p>
              Detailed documentation criteria, rules for minors, dual nationality, and essential
              pre-departure verification.
            </p>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-header">
                <Users className="info-icon" />
                <h4>Travelling with Minors &amp; Children</h4>
              </div>
              <p>
                Children under 18 traveling alone or with only one parent/legal guardian may require
                supplementary documentation including:
              </p>
              <ul>
                <li>Original or certified copy of full birth certificate.</li>
                <li>
                  Notarized consent letter / travel authorization signed by both non-accompanying
                  parents.
                </li>
                <li>Copies of the parents&apos; passports / national identity documents.</li>
                <li>Court orders or custody documentation where applicable.</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <Globe className="info-icon" />
                <h4>Dual Citizenship &amp; Multiple Passports</h4>
              </div>
              <p>
                If you hold multiple citizenships, adhere to international immigration protocol:
              </p>
              <ul>
                <li>
                  Always depart and enter your home country on that nation&apos;s valid passport.
                </li>
                <li>
                  Ensure the passport used for booking matches the passport presented at check-in
                  and immigration.
                </li>
                <li>Verify whether your transit country requires visas for your specific passport.</li>
                <li>Ensure both passports meet minimum validity periods.</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <ShieldCheck className="info-icon" />
                <h4>Passport Condition &amp; Validity Integrity</h4>
              </div>
              <p>
                Airlines and border control officers will refuse boarding if your travel document is
                compromised:
              </p>
              <ul>
                <li>Water damage, torn pages, or stained covers are grounds for denial.</li>
                <li>Laminates must not be lifting from the biographical identification page.</li>
                <li>Ensure sufficient consecutive blank visa pages remain for border stamps.</li>
                <li>
                  Check the 10-year rule: Many regions (e.g. EU Schengen) require passports to be
                  issued within 10 years.
                </li>
              </ul>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <BadgeDollarSign className="info-icon" />
                <h4>Return Tickets &amp; Proof of Sufficient Funds</h4>
              </div>
              <p>
                Immigration authorities frequently request travelers to demonstrate self-sufficiency
                for the duration of their visit:
              </p>
              <ul>
                <li>Confirmed return or onward e-ticket ticket within the allowed visa duration.</li>
                <li>Recent bank statements, active international credit cards, or cash currency.</li>
                <li>Confirmed lodging reservation or letter of sponsorship from host.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HELPFUL LINKS */}
      {activeTab === 'links' && (
        <div className="helpful-links-container">
          <div className="section-intro">
            <h3>Authoritative Government &amp; Global Aviation Portals</h3>
            <p>
              Direct links to official immigration, customs, and travel health authorities worldwide.
            </p>
          </div>

          <div className="links-grid">
            <a
              href="https://www.iatatravelcentre.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-header">
                <Globe className="link-icon" />
                <div>
                  <h4>IATA Travel Centre</h4>
                  <span className="link-category">Global Passport &amp; Visa Database</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                Official International Air Transport Association passenger intelligence portal for
                personalized visa and passport checks.
              </p>
            </a>

            <a
              href="https://esta.cbp.dhs.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-header">
                <ShieldCheck className="link-icon" />
                <div>
                  <h4>US Customs &amp; Border Protection (ESTA)</h4>
                  <span className="link-category">United States Immigration</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                Official US Department of Homeland Security Electronic System for Travel
                Authorization for Visa Waiver Program travelers.
              </p>
            </a>

            <a
              href="https://www.gov.uk/check-uk-visa"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-header">
                <Building2 className="link-icon" />
                <div>
                  <h4>UK Visas and Immigration (GOV.UK)</h4>
                  <span className="link-category">United Kingdom Entry Rules</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                Official UK government portal to check visa eligibility, ETA application, and transit
                exemptions through UK airports.
              </p>
            </a>

            <a
              href="https://travel-europe.europa.eu/etias_en"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-header">
                <Compass className="link-icon" />
                <div>
                  <h4>European Union ETIAS &amp; Schengen</h4>
                  <span className="link-category">European Union Border System</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                Official European Union portal for the European Travel Information and Authorisation
                System (ETIAS) for 30 European countries.
              </p>
            </a>

            <a
              href="#concierge"
              onClick={(e) => e.preventDefault()}
              className="link-card"
            >
              <div className="link-card-header">
                <ShieldCheck className="link-icon" />
                <div>
                  <h4>911 Airlines Travel Concierge &amp; Visa Hub</h4>
                  <span className="link-category">911 Global Passenger Services</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                Dedicated 911 Airlines passenger support for expedited entry assistance, visa advisory
                checks, and global partner airport guidance.
              </p>
            </a>

            <a
              href="https://www.who.int/travel-advice"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-header">
                <HeartPulse className="link-icon" />
                <div>
                  <h4>World Health Organization (WHO)</h4>
                  <span className="link-category">Global Health &amp; Vaccines</span>
                </div>
                <ExternalLink size={16} className="ext-icon" />
              </div>
              <p>
                International travel health guidance, yellow fever endemic country lists, and disease
                prevention recommendations.
              </p>
            </a>
          </div>
        </div>
      )}

      {/* TAB 4: TRAVEL ADVISORIES */}
      {activeTab === 'advisories' && (
        <div className="advisories-container">
          <div className="section-intro">
            <h3>Live Regional Travel Advisories &amp; Operational Bulletins</h3>
            <p>
              Stay updated on weather notices, terminal procedures, electronic device rules, and
              international security advisories.
            </p>
          </div>

          <div className="advisories-list">
            <div className="advisory-alert-card normal">
              <div className="advisory-badge-row">
                <span className="level-badge normal">Level 1: Normal Precautions</span>
                <span className="adv-date">Updated Today</span>
              </div>
              <h4>911 Airlines Biometric Smart Gates &amp; Express Boarding</h4>
              <p>
                Eligible e-Passport holders flying on 911 Airlines international routes can utilize
                biometric Smart Gates for expedited immigration and boarding clearance at
                participating international gateway terminals without counter queues.
              </p>
            </div>

            <div className="advisory-alert-card caution">
              <div className="advisory-badge-row">
                <span className="level-badge caution">Level 2: Exercise Caution</span>
                <span className="adv-date">Active Advisory</span>
              </div>
              <h4>Electronic Baggage &amp; Lithium Battery Security Regulations</h4>
              <p>
                Spare lithium-ion batteries, power banks, and portable electronic devices (PEDs) must
                be carried exclusively in carry-on cabin baggage. Spare power banks exceeding 100Wh
                require prior airline carrier approval and cannot be placed in checked luggage.
              </p>
            </div>

            <div className="advisory-alert-card normal">
              <div className="advisory-badge-row">
                <span className="level-badge normal">Operational Notice</span>
                <span className="adv-date">Rolling Notice</span>
              </div>
              <h4>UK &amp; European Biometric Border Digitalization</h4>
              <p>
                The United Kingdom and European Schengen Area are progressing automated electronic
                entry authorisations (UK ETA and EU ETIAS/EES). Travelers are advised to ensure their
                passports contain readable biometric chips and are valid for at least 3 months after
                departure.
              </p>
            </div>

            <div className="advisory-alert-card caution">
              <div className="advisory-badge-row">
                <span className="level-badge caution">Airport Operational Advisory</span>
                <span className="adv-date">Peak Travel Advisory</span>
              </div>
              <h4>Recommended Check-in &amp; Airport Arrival Times</h4>
              <p>
                For international departures, we recommend arriving at the airport at least 3 to 4
                hours prior to scheduled departure time to allow ample time for document
                verification, security screening, and boarding gate attendance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Courtesy Disclaimer Banner 2 */}
      <div className="courtesy-banner footer-courtesy">
        <Info size={20} className="courtesy-icon" />
        <div className="courtesy-text">
          <strong>Official Courtesy Notice:</strong> This information is provided by 911 Airlines as a
          courtesy. Although it is updated regularly, please check back frequently as travel
          conditions can change. It is recommended that you verify travel and entry requirements through
          independent inquiries before your trip.
        </div>
      </div>
    </div>
  );
}
