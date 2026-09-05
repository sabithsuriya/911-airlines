import type { BookingDetails } from '../data/mockFlights';
import { CheckCircle2, Printer, Download, Plane, QrCode } from 'lucide-react';

interface BookingConfirmationProps {
  booking: BookingDetails;
  onReset: () => void;
}

export function BookingConfirmation({ booking, onReset }: BookingConfirmationProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-banner">
        <CheckCircle2 size={48} className="success-icon" />
        <h2>Booking Confirmed!</h2>
        <p className="confirmation-sub">
          Your flight with 911 Airlines has been successfully booked. Electronic ticket details have been sent to <strong>{booking.email}</strong>.
        </p>
        <div className="pnr-badge-box">
          <span className="pnr-label">Booking Reference (PNR):</span>
          <span className="pnr-code">{booking.pnr}</span>
        </div>
      </div>

      <div className="action-buttons-row no-print">
        <button type="button" className="action-btn" onClick={handlePrint}>
          <Printer size={16} /> Print Boarding Pass
        </button>
        <button type="button" className="action-btn" onClick={handlePrint}>
          <Download size={16} /> Download E-Ticket (PDF)
        </button>
        <button type="button" className="action-btn primary" onClick={onReset}>
          Book Another Flight
        </button>
      </div>

      <div className="e-ticket-card">
        <div className="ticket-header">
          <div className="ticket-logo-brand">
            <img src="/assets/logo.png" alt="911 Airlines" className="ticket-logo" />
            <span className="ticket-brand-text">911 AIRLINES BOARDING PASS</span>
          </div>
          <div className="ticket-cabin-badge">{booking.cabinClass}</div>
        </div>

        <div className="ticket-body">
          <div className="ticket-info-grid">
            <div className="info-block">
              <span className="info-label">PASSENGER NAME</span>
              <span className="info-value">{booking.passengerName.toUpperCase()}</span>
            </div>
            <div className="info-block">
              <span className="info-label">FLIGHT NUMBER</span>
              <span className="info-value">{booking.flightOutbound.flightNumber}</span>
            </div>
            <div className="info-block">
              <span className="info-label">DATE</span>
              <span className="info-value">{booking.departureDate}</span>
            </div>
            <div className="info-block">
              <span className="info-label">SEAT</span>
              <span className="info-value highlight-red">{booking.seats.join(', ')}</span>
            </div>
          </div>

          <div className="ticket-route-banner">
            <div className="route-ap">
              <span className="ap-code">{booking.flightOutbound.fromCode}</span>
              <span className="ap-time">{booking.flightOutbound.departureTime}</span>
            </div>

            <div className="route-visual">
              <Plane size={24} className="flight-plane-icon" />
              <div className="visual-dash"></div>
              <span className="duration">{booking.flightOutbound.duration}</span>
            </div>

            <div className="route-ap">
              <span className="ap-code">{booking.flightOutbound.toCode}</span>
              <span className="ap-time">{booking.flightOutbound.arrivalTime}</span>
            </div>
          </div>

          <div className="ticket-meta-footer">
            <div className="meta-col">
              <span className="meta-label">GATE</span>
              <span className="meta-val">{booking.gate}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">TERMINAL</span>
              <span className="meta-val">{booking.terminal}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">STATUS</span>
              <span className="meta-val green">{booking.status}</span>
            </div>
            <div className="qr-code-box">
              <div className="qr-code-graphic">
                <QrCode size={56} />
              </div>
              <span className="qr-sub">{booking.pnr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
