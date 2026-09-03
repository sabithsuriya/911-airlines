import { useState } from 'react';
import { ArrowLeft, Plane, Filter, ArrowRight } from 'lucide-react';
import { type Flight, MOCK_FLIGHTS } from '../data/mockFlights';
import type { SearchParams } from './BookingWidget';

interface FlightResultsProps {
  searchParams: SearchParams;
  onBack: () => void;
  onSelectFlight: (outbound: Flight, returnFlight?: Flight) => void;
}

export function FlightResults({ searchParams, onBack, onSelectFlight }: FlightResultsProps) {
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<Flight | null>(null);
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | '1stop'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  let outboundFlights = MOCK_FLIGHTS.filter(
    (f) => f.fromCode === searchParams.fromAirport.code && f.toCode === searchParams.toAirport.code
  );

  if (outboundFlights.length === 0) {
    outboundFlights = [
      {
        id: 'fl-gen-1',
        flightNumber: `911-${Math.floor(100 + Math.random() * 899)}`,
        fromCode: searchParams.fromAirport.code,
        toCode: searchParams.toAirport.code,
        departureTime: '08:30',
        arrivalTime: '19:45',
        duration: '11h 15m',
        stops: 0,
        aircraft: 'Boeing 787-9 Dreamliner',
        priceEconomy: 850,
        priceBusiness: 2450,
        priceFirst: 4800,
        availableSeats: 18
      },
      {
        id: 'fl-gen-2',
        flightNumber: `911-${Math.floor(100 + Math.random() * 899)}`,
        fromCode: searchParams.fromAirport.code,
        toCode: searchParams.toAirport.code,
        departureTime: '14:15',
        arrivalTime: '03:30',
        duration: '13h 15m',
        stops: 1,
        stopCity: 'Dubai (DXB)',
        aircraft: 'Airbus A350-900',
        priceEconomy: 720,
        priceBusiness: 2100,
        priceFirst: 4100,
        availableSeats: 10
      }
    ];
  }

  let returnFlights = MOCK_FLIGHTS.filter(
    (f) => f.fromCode === searchParams.toAirport.code && f.toCode === searchParams.fromAirport.code
  );

  if (searchParams.tripType === 'Return trip' && returnFlights.length === 0) {
    returnFlights = [
      {
        id: 'fl-gen-ret-1',
        flightNumber: `911-${Math.floor(100 + Math.random() * 899)}`,
        fromCode: searchParams.toAirport.code,
        toCode: searchParams.fromAirport.code,
        departureTime: '11:00',
        arrivalTime: '21:30',
        duration: '12h 30m',
        stops: 0,
        aircraft: 'Boeing 787-9 Dreamliner',
        priceEconomy: 890,
        priceBusiness: 2500,
        priceFirst: 4900,
        availableSeats: 22
      }
    ];
  }

  if (filterStops === 'direct') {
    outboundFlights = outboundFlights.filter((f) => f.stops === 0);
    returnFlights = returnFlights.filter((f) => f.stops === 0);
  } else if (filterStops === '1stop') {
    outboundFlights = outboundFlights.filter((f) => f.stops >= 1);
    returnFlights = returnFlights.filter((f) => f.stops >= 1);
  }

  const getPriceForClass = (f: Flight) => {
    switch (searchParams.cabinClass) {
      case 'Business': return f.priceBusiness;
      case 'First Class': return f.priceFirst;
      default: return f.priceEconomy;
    }
  };

  outboundFlights.sort((a, b) => {
    if (sortBy === 'price') return getPriceForClass(a) - getPriceForClass(b);
    return a.duration.localeCompare(b.duration);
  });

  return (
    <div className="results-container">
      <div className="results-header-card">
        <button type="button" className="back-link-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Edit Search
        </button>

        <div className="route-title-meta">
          <h2>
            {searchParams.fromAirport.city} ({searchParams.fromAirport.code}){' '}
            <ArrowRight size={20} className="inline-arrow" />{' '}
            {searchParams.toAirport.city} ({searchParams.toAirport.code})
          </h2>
          <div className="sub-meta-pills">
            <span className="pill">{searchParams.tripType}</span>
            <span className="pill">{searchParams.departDate} {searchParams.returnDate ? ` - ${searchParams.returnDate}` : ''}</span>
            <span className="pill">{searchParams.passengers.adults + searchParams.passengers.children} Passenger(s)</span>
            <span className="pill badge-accent">{searchParams.cabinClass}</span>
          </div>
        </div>
      </div>

      <div className="filter-toolbar">
        <div className="filter-group">
          <Filter size={16} />
          <span className="filter-label">Stops:</span>
          <button
            type="button"
            className={`filter-chip ${filterStops === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStops('all')}
          >
            All Flights
          </button>
          <button
            type="button"
            className={`filter-chip ${filterStops === 'direct' ? 'active' : ''}`}
            onClick={() => setFilterStops('direct')}
          >
            Non-stop
          </button>
          <button
            type="button"
            className={`filter-chip ${filterStops === '1stop' ? 'active' : ''}`}
            onClick={() => setFilterStops('1stop')}
          >
            1 Stop
          </button>
        </div>

        <div className="filter-group">
          <span className="filter-label">Sort by:</span>
          <button
            type="button"
            className={`filter-chip ${sortBy === 'price' ? 'active' : ''}`}
            onClick={() => setSortBy('price')}
          >
            Lowest Price
          </button>
          <button
            type="button"
            className={`filter-chip ${sortBy === 'duration' ? 'active' : ''}`}
            onClick={() => setSortBy('duration')}
          >
            Flight Duration
          </button>
        </div>
      </div>

      <div className="flight-section-block">
        <h3 className="section-subtitle">
          <Plane size={18} /> Outbound Flight &bull; {searchParams.fromAirport.city} to {searchParams.toAirport.city}
        </h3>

        <div className="flights-cards-list">
          {outboundFlights.map((flight) => {
            const isSelected = selectedOutbound?.id === flight.id;
            const price = getPriceForClass(flight);

            return (
              <div key={flight.id} className={`flight-card ${isSelected ? 'selected' : ''}`}>
                <div className="flight-card-main">
                  <div className="airline-meta">
                    <img src="/assets/logo.png" alt="911 Airlines" className="flight-logo" />
                    <div>
                      <div className="flight-num">{flight.flightNumber}</div>
                      <div className="aircraft-name">{flight.aircraft}</div>
                    </div>
                  </div>

                  <div className="flight-schedule">
                    <div className="time-block">
                      <div className="time-large">{flight.departureTime}</div>
                      <div className="ap-code-sub">{flight.fromCode}</div>
                    </div>

                    <div className="duration-line-container">
                      <div className="duration-text">{flight.duration}</div>
                      <div className="visual-line">
                        <span className="dot start"></span>
                        <span className="line-bar"></span>
                        <span className="dot end"></span>
                      </div>
                      <div className="stops-text">
                        {flight.stops === 0 ? 'Direct Non-stop' : `1 Stop via ${flight.stopCity}`}
                      </div>
                    </div>

                    <div className="time-block">
                      <div className="time-large">{flight.arrivalTime}</div>
                      <div className="ap-code-sub">{flight.toCode}</div>
                    </div>
                  </div>

                  <div className="flight-pricing-block">
                    <div className="price-tag">
                      <span className="curr">$</span>
                      <span className="amount">{price}</span>
                      <span className="per-person">/ person</span>
                    </div>
                    <button
                      type="button"
                      className={`select-flight-btn ${isSelected ? 'selected-btn' : ''}`}
                      onClick={() => setSelectedOutbound(flight)}
                    >
                      {isSelected ? 'Selected ✓' : 'Select Outbound'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {searchParams.tripType === 'Return trip' && (
        <div className="flight-section-block">
          <h3 className="section-subtitle">
            <Plane size={18} className="transform-180" /> Return Flight &bull; {searchParams.toAirport.city} to {searchParams.fromAirport.city}
          </h3>

          <div className="flights-cards-list">
            {returnFlights.map((flight) => {
              const isSelected = selectedReturn?.id === flight.id;
              const price = getPriceForClass(flight);

              return (
                <div key={flight.id} className={`flight-card ${isSelected ? 'selected' : ''}`}>
                  <div className="flight-card-main">
                    <div className="airline-meta">
                      <img src="/assets/logo.png" alt="911 Airlines" className="flight-logo" />
                      <div>
                        <div className="flight-num">{flight.flightNumber}</div>
                        <div className="aircraft-name">{flight.aircraft}</div>
                      </div>
                    </div>

                    <div className="flight-schedule">
                      <div className="time-block">
                        <div className="time-large">{flight.departureTime}</div>
                        <div className="ap-code-sub">{flight.fromCode}</div>
                      </div>

                      <div className="duration-line-container">
                        <div className="duration-text">{flight.duration}</div>
                        <div className="visual-line">
                          <span className="dot start"></span>
                          <span className="line-bar"></span>
                          <span className="dot end"></span>
                        </div>
                        <div className="stops-text">
                          {flight.stops === 0 ? 'Direct Non-stop' : `1 Stop via ${flight.stopCity}`}
                        </div>
                      </div>

                      <div className="time-block">
                        <div className="time-large">{flight.arrivalTime}</div>
                        <div className="ap-code-sub">{flight.toCode}</div>
                      </div>
                    </div>

                    <div className="flight-pricing-block">
                      <div className="price-tag">
                        <span className="curr">$</span>
                        <span className="amount">{price}</span>
                        <span className="per-person">/ person</span>
                      </div>
                      <button
                        type="button"
                        className={`select-flight-btn ${isSelected ? 'selected-btn' : ''}`}
                        onClick={() => setSelectedReturn(flight)}
                      >
                        {isSelected ? 'Selected ✓' : 'Select Return'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="results-footer-bar">
        <div className="selected-summary">
          {selectedOutbound ? (
            <span>
              Selected: <strong>{selectedOutbound.flightNumber}</strong>
              {searchParams.tripType === 'Return trip' && selectedReturn
                ? ` & ${selectedReturn.flightNumber}`
                : ''}
            </span>
          ) : (
            <span>Please select an outbound flight to proceed</span>
          )}
        </div>

        <button
          type="button"
          className="find-flights-btn footer-cta"
          disabled={!selectedOutbound || (searchParams.tripType === 'Return trip' && !selectedReturn)}
          onClick={() => onSelectFlight(selectedOutbound!, selectedReturn || undefined)}
        >
          Continue to Passenger Info &rarr;
        </button>
      </div>
    </div>
  );
}
