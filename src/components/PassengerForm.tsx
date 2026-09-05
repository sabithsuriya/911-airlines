import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Luggage, Armchair, Shield } from 'lucide-react';
import type { Flight, BookingDetails } from '../data/mockFlights';
import type { SearchParams } from './BookingWidget';

interface PassengerFormProps {
  searchParams: SearchParams;
  outboundFlight: Flight;
  returnFlight?: Flight;
  onBack: () => void;
  onConfirmBooking: (booking: BookingDetails) => void;
}

export function PassengerForm({
  searchParams,
  outboundFlight,
  returnFlight,
  onBack,
  onConfirmBooking
}: PassengerFormProps) {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 555 019 2831');
  const [selectedSeat, setSelectedSeat] = useState('14B');
  const [baggageOption, setBaggageOption] = useState<'standard' | 'extra'>('standard');
  const [mealPreference, setMealPreference] = useState('Standard Gourmet Menu');

  const availableSeats = ['12A', '12B', '14A', '14B', '15C', '16D', '18F', '21A', '22B'];

  const calculatePrice = () => {
    const getBasePrice = (f: Flight) => {
      switch (searchParams.cabinClass) {
        case 'Business': return f.priceBusiness;
        case 'First Class': return f.priceFirst;
        default: return f.priceEconomy;
      }
    };

    const outPrice = getBasePrice(outboundFlight);
    const retPrice = returnFlight ? getBasePrice(returnFlight) : 0;
    const totalPassengers = searchParams.passengers.adults + searchParams.passengers.children;
    const baggageExtra = baggageOption === 'extra' ? 75 : 0;

    const baseFareTotal = (outPrice + retPrice) * totalPassengers;
    const taxesAndFees = Math.round(baseFareTotal * 0.12);
    const grandTotal = baseFareTotal + taxesAndFees + baggageExtra;

    return { baseFareTotal, taxesAndFees, baggageExtra, grandTotal };
  };

  const pricing = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnrCode = `911-${Math.floor(10000 + Math.random() * 89999)}`;

    const newBooking: BookingDetails = {
      pnr: pnrCode,
      passengerName: `${firstName} ${lastName}`,
      email,
      phone,
      flightOutbound: outboundFlight,
      flightReturn: returnFlight,
      departureDate: searchParams.departDate,
      returnDate: searchParams.returnDate,
      passengers: searchParams.passengers,
      cabinClass: searchParams.cabinClass,
      seats: [selectedSeat],
      totalPrice: pricing.grandTotal,
      status: 'Confirmed',
      gate: 'B14',
      terminal: 'Terminal 2'
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="passenger-form-container">
      <button type="button" className="back-link-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Search Results
      </button>

      <div className="form-layout-grid">
        <form className="form-main-content" onSubmit={handleSubmit}>
          <h2 className="form-section-title">Passenger Information</h2>

          <div className="form-card-block">
            <div className="card-block-title">
              <User size={18} /> Lead Passenger Details
            </div>

            <div className="input-fields-row">
              <div className="form-input-group">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-fields-row">
              <div className="form-input-group">
                <label><Mail size={14} className="inline-icon" /> Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-input-group">
                <label><Phone size={14} className="inline-icon" /> Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-card-block">
            <div className="card-block-title">
              <Armchair size={18} /> Select Preferred Seat
            </div>

            <p className="block-sub-text">Choose your seat for flight {outboundFlight.flightNumber}</p>

            <div className="seat-grid-picker">
              {availableSeats.map((seat) => (
                <button
                  type="button"
                  key={seat}
                  className={`seat-chip ${selectedSeat === seat ? 'selected' : ''}`}
                  onClick={() => setSelectedSeat(seat)}
                >
                  {seat} {selectedSeat === seat && '✓'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-card-block">
            <div className="card-block-title">
              <Luggage size={18} /> Baggage &amp; Meal Options
            </div>

            <div className="baggage-options-list">
              <label
                className={`option-tile ${baggageOption === 'standard' ? 'selected' : ''}`}
                onClick={() => setBaggageOption('standard')}
              >
                <input
                  type="radio"
                  name="baggage"
                  checked={baggageOption === 'standard'}
                  onChange={() => setBaggageOption('standard')}
                />
                <div className="tile-content">
                  <div className="tile-title">Standard Checked Bag (Included)</div>
                  <div className="tile-desc">1 Carry-on (10kg) + 1 Checked Bag (23kg)</div>
                </div>
                <div className="tile-price">FREE</div>
              </label>

              <label
                className={`option-tile ${baggageOption === 'extra' ? 'selected' : ''}`}
                onClick={() => setBaggageOption('extra')}
              >
                <input
                  type="radio"
                  name="baggage"
                  checked={baggageOption === 'extra'}
                  onChange={() => setBaggageOption('extra')}
                />
                <div className="tile-content">
                  <div className="tile-title">Extra Allowance Package</div>
                  <div className="tile-desc">2 Checked Bags (32kg each) + Priority Baggage Delivery</div>
                </div>
                <div className="tile-price">+$75</div>
              </label>
            </div>

            <div className="form-input-group margin-top-md">
              <label>Special Meal Preference</label>
              <select value={mealPreference} onChange={(e) => setMealPreference(e.target.value)}>
                <option>Standard Gourmet Menu</option>
                <option>Vegetarian / Vegan</option>
                <option>Halal Certified Menu</option>
                <option>Kosher Certified Menu</option>
                <option>Gluten-Free Special</option>
                <option>Child Friendly Meal</option>
              </select>
            </div>
          </div>

          <button type="submit" className="find-flights-btn full-width-btn">
            Complete Reservation &amp; Generate E-Ticket &rarr;
          </button>
        </form>

        <div className="form-sidebar-summary">
          <div className="sidebar-card">
            <h3>Fare Summary</h3>

            <div className="summary-flight-brief">
              <div className="flight-brief-row">
                <span className="bold">{outboundFlight.fromCode} &rarr; {outboundFlight.toCode}</span>
                <span>{outboundFlight.flightNumber}</span>
              </div>
              <div className="flight-sub-date">{searchParams.departDate} &bull; {searchParams.cabinClass}</div>
            </div>

            {returnFlight && (
              <div className="summary-flight-brief">
                <div className="flight-brief-row">
                  <span className="bold">{returnFlight.fromCode} &rarr; {returnFlight.toCode}</span>
                  <span>{returnFlight.flightNumber}</span>
                </div>
                <div className="flight-sub-date">{searchParams.returnDate} &bull; {searchParams.cabinClass}</div>
              </div>
            )}

            <hr className="summary-divider" />

            <div className="cost-breakdown-list">
              <div className="cost-row">
                <span>Base Airfare</span>
                <span>${pricing.baseFareTotal}</span>
              </div>
              <div className="cost-row">
                <span>Taxes &amp; Airline Charges</span>
                <span>${pricing.taxesAndFees}</span>
              </div>
              {pricing.baggageExtra > 0 && (
                <div className="cost-row">
                  <span>Extra Baggage Fee</span>
                  <span>${pricing.baggageExtra}</span>
                </div>
              )}
              <hr className="summary-divider" />
              <div className="cost-row total-row">
                <span>Total Amount Payable</span>
                <span className="total-amount">${pricing.grandTotal}</span>
              </div>
            </div>

            <div className="security-notice">
              <Shield size={14} /> Instant Confirmation &amp; E-Ticket Issued
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
