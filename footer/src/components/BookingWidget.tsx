import { useState, useRef, useEffect } from 'react';
import { Plane, Hotel, Car, Compass, ArrowRight, ChevronDown, Calendar } from 'lucide-react';
import { AIRPORTS, type Airport } from '../data/airportsData';

export interface SearchParams {
  fromAirport: Airport;
  toAirport: Airport;
  departDate: string;
  returnDate: string;
  tripType: 'Return trip' | 'One way' | 'Multi-city';
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
}

interface BookingWidgetProps {
  onSearch: (params: SearchParams) => void;
}

export function BookingWidget({ onSearch }: BookingWidgetProps) {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotel' | 'car' | 'multicity'>('flights');

  // Search Form State
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');

  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState<'Return trip' | 'One way' | 'Multi-city'>('Return trip');
  
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business' | 'First Class'>('Economy');

  // Dropdown UI toggles
  const [openFromDropdown, setOpenFromDropdown] = useState(false);
  const [openToDropdown, setOpenToDropdown] = useState(false);
  const [openPassengerDropdown, setOpenPassengerDropdown] = useState(false);
  const [openClassDropdown, setOpenClassDropdown] = useState(false);
  const [openTripTypeDropdown, setOpenTripTypeDropdown] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const tripTypeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) setOpenFromDropdown(false);
      if (toRef.current && !toRef.current.contains(event.target as Node)) setOpenToDropdown(false);
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) setOpenPassengerDropdown(false);
      if (classRef.current && !classRef.current.contains(event.target as Node)) setOpenClassDropdown(false);
      if (tripTypeRef.current && !tripTypeRef.current.contains(event.target as Node)) setOpenTripTypeDropdown(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const getPassengerSummaryText = () => {
    if (totalPassengers === 1 && passengers.adults === 1) return '1 Adult';
    const parts = [];
    if (passengers.adults > 0) parts.push(`${passengers.adults} Adult${passengers.adults > 1 ? 's' : ''}`);
    if (passengers.children > 0) parts.push(`${passengers.children} Child${passengers.children > 1 ? 'ren' : ''}`);
    if (passengers.infants > 0) parts.push(`${passengers.infants} Infant${passengers.infants > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const filteredFromAirports = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToAirports = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(toQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveFrom = fromAirport || AIRPORTS[0]; // fallback Dhaka
    const effectiveTo = toAirport || AIRPORTS[1]; // fallback Sydney
    onSearch({
      fromAirport: effectiveFrom,
      toAirport: effectiveTo,
      departDate: departDate || '2025-01-09',
      returnDate: tripType === 'Return trip' ? (returnDate || '2025-01-15') : '',
      tripType,
      passengers,
      cabinClass
    });
  };

  return (
    <div className="boo-widget-card">
      {/* Top Bar with Pill Tabs & Right Link */}
      <div className="widget-top-bar">
        <div className="pill-tabs-group">
          <button
            type="button"
            className={`pill-tab ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            <Plane size={16} />
            <span>Flights</span>
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            <Hotel size={16} />
            <span>Flight + Hotel</span>
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === 'car' ? 'active' : ''}`}
            onClick={() => setActiveTab('car')}
          >
            <Car size={16} />
            <span>Flight + Car</span>
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === 'multicity' ? 'active' : ''}`}
            onClick={() => setActiveTab('multicity')}
          >
            <Compass size={16} />
            <span>Multi-city</span>
          </button>
        </div>

        <a href="#car" className="find-car-link" onClick={(e) => e.preventDefault()}>
          Find a car <ArrowRight size={14} />
        </a>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSearchSubmit} className="boo-form-layout">
        {/* Row 1: Trip type | From | To */}
        <div className="boo-form-row">
          {/* Trip Type Dropdown */}
          <div className="input-box-wrapper trip-type-wrapper" ref={tripTypeRef} onClick={() => setOpenTripTypeDropdown(!openTripTypeDropdown)}>
            <label className="input-box-label">Trip type</label>
            <div className="input-box-trigger">
              <span className="trigger-value">{tripType}</span>
              <ChevronDown size={16} className="trigger-chevron" />
            </div>

            {openTripTypeDropdown && (
              <div className="widget-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {(['Return trip', 'One way', 'Multi-city'] as const).map((type) => (
                  <div
                    key={type}
                    className={`dropdown-menu-item ${tripType === type ? 'selected' : ''}`}
                    onClick={() => {
                      setTripType(type);
                      setOpenTripTypeDropdown(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* From Input */}
          <div className="input-box-wrapper from-input-wrapper" ref={fromRef}>
            <label className="input-box-label">From</label>
            <input
              type="text"
              className="text-input-field"
              placeholder="Departure city"
              value={fromQuery}
              onChange={(e) => {
                setFromQuery(e.target.value);
                setOpenFromDropdown(true);
              }}
              onFocus={() => setOpenFromDropdown(true)}
            />

            {openFromDropdown && (
              <div className="widget-dropdown-menu airport-menu" onClick={(e) => e.stopPropagation()}>
                <div className="menu-scroll-list">
                  {filteredFromAirports.map((ap) => (
                    <div
                      key={ap.code}
                      className="dropdown-menu-item ap-item"
                      onClick={() => {
                        setFromAirport(ap);
                        setFromQuery(`${ap.city} (${ap.code})`);
                        setOpenFromDropdown(false);
                      }}
                    >
                      <span className="ap-code-tag">{ap.code}</span>
                      <div className="ap-text-meta">
                        <span className="ap-city-title">{ap.city}, {ap.country}</span>
                        <span className="ap-name-sub">{ap.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* To Input */}
          <div className="input-box-wrapper to-input-wrapper" ref={toRef}>
            <label className="input-box-label">To</label>
            <input
              type="text"
              className="text-input-field"
              placeholder="Where can we take you?"
              value={toQuery}
              onChange={(e) => {
                setToQuery(e.target.value);
                setOpenToDropdown(true);
              }}
              onFocus={() => setOpenToDropdown(true)}
            />

            {openToDropdown && (
              <div className="widget-dropdown-menu airport-menu" onClick={(e) => e.stopPropagation()}>
                <div className="menu-scroll-list">
                  {filteredToAirports.map((ap) => (
                    <div
                      key={ap.code}
                      className="dropdown-menu-item ap-item"
                      onClick={() => {
                        setToAirport(ap);
                        setToQuery(`${ap.city} (${ap.code})`);
                        setOpenToDropdown(false);
                      }}
                    >
                      <span className="ap-code-tag">{ap.code}</span>
                      <div className="ap-text-meta">
                        <span className="ap-city-title">{ap.city}, {ap.country}</span>
                        <span className="ap-name-sub">{ap.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Depart | Return | Travel class | Select passengers */}
        <div className="boo-form-row">
          {/* Depart Date */}
          <div className="input-box-wrapper date-input-wrapper">
            <label className="input-box-label">Depart</label>
            <div className="date-input-container">
              <input
                type="date"
                className="date-input-field"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
              />
              <Calendar size={18} className="calendar-icon-indicator" />
            </div>
          </div>

          {/* Return Date */}
          <div className={`input-box-wrapper date-input-wrapper ${tripType === 'One way' ? 'disabled' : ''}`}>
            <label className="input-box-label">Return</label>
            <div className="date-input-container">
              <input
                type="date"
                className="date-input-field"
                disabled={tripType === 'One way'}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              <Calendar size={18} className="calendar-icon-indicator" />
            </div>
          </div>

          {/* Travel Class Dropdown */}
          <div className="input-box-wrapper class-input-wrapper" ref={classRef} onClick={() => setOpenClassDropdown(!openClassDropdown)}>
            <label className="input-box-label">Travel class</label>
            <div className="input-box-trigger">
              <span className="trigger-value">{cabinClass}</span>
              <ChevronDown size={16} className="trigger-chevron" />
            </div>

            {openClassDropdown && (
              <div className="widget-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {(['Economy', 'Premium Economy', 'Business', 'First Class'] as const).map((cls) => (
                  <div
                    key={cls}
                    className={`dropdown-menu-item ${cabinClass === cls ? 'selected' : ''}`}
                    onClick={() => {
                      setCabinClass(cls);
                      setOpenClassDropdown(false);
                    }}
                  >
                    {cls}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Select Passengers Dropdown */}
          <div className="input-box-wrapper passenger-input-wrapper" ref={passengerRef} onClick={() => setOpenPassengerDropdown(!openPassengerDropdown)}>
            <label className="input-box-label">Select passengers</label>
            <div className="input-box-trigger">
              <span className="trigger-value">{getPassengerSummaryText()}</span>
              <ChevronDown size={16} className="trigger-chevron" />
            </div>

            {openPassengerDropdown && (
              <div className="widget-dropdown-menu passenger-menu" onClick={(e) => e.stopPropagation()}>
                <div className="p-row">
                  <div className="p-info">
                    <span className="p-title">Adults</span>
                    <span className="p-sub">Age 12+</span>
                  </div>
                  <div className="counter-btn-group">
                    <button
                      type="button"
                      disabled={passengers.adults <= 1}
                      onClick={() => setPassengers({ ...passengers, adults: passengers.adults - 1 })}
                    >
                      -
                    </button>
                    <span>{passengers.adults}</span>
                    <button
                      type="button"
                      disabled={passengers.adults >= 9}
                      onClick={() => setPassengers({ ...passengers, adults: passengers.adults + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-row">
                  <div className="p-info">
                    <span className="p-title">Children</span>
                    <span className="p-sub">Age 2-11</span>
                  </div>
                  <div className="counter-btn-group">
                    <button
                      type="button"
                      disabled={passengers.children <= 0}
                      onClick={() => setPassengers({ ...passengers, children: passengers.children - 1 })}
                    >
                      -
                    </button>
                    <span>{passengers.children}</span>
                    <button
                      type="button"
                      disabled={passengers.children >= 6}
                      onClick={() => setPassengers({ ...passengers, children: passengers.children + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-row">
                  <div className="p-info">
                    <span className="p-title">Infants</span>
                    <span className="p-sub">Under 2</span>
                  </div>
                  <div className="counter-btn-group">
                    <button
                      type="button"
                      disabled={passengers.infants <= 0}
                      onClick={() => setPassengers({ ...passengers, infants: passengers.infants - 1 })}
                    >
                      -
                    </button>
                    <span>{passengers.infants}</span>
                    <button
                      type="button"
                      disabled={passengers.infants >= passengers.adults}
                      onClick={() => setPassengers({ ...passengers, infants: passengers.infants + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="done-p-btn"
                  onClick={() => setOpenPassengerDropdown(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="boo-action-row">
          <button type="submit" className="find-flights-btn">
            Find flights
          </button>
        </div>
      </form>
    </div>
  );
}
