import React, { useState } from 'react';
import {
  MessageSquare,
  Award,
  ArrowLeft,
  CheckCircle2,
  Star,
  ShieldCheck,
  Send,
  Building2
} from 'lucide-react';
import './FeedbackHelp.css';

interface FeedbackHelpProps {
  onBack?: () => void;
}

export default function FeedbackHelp({ onBack }: FeedbackHelpProps) {
  const [category, setCategory] = useState('In-Flight Service & Hospitality');
  const [rating, setRating] = useState(5);
  const [flightNo, setFlightNo] = useState('911-408');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'submit' | 'crew' | 'rights' | 'executive'>('submit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comments.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="feedbackhelp-wrapper">
      {/* Hero Card */}
      <div className="feedbackhelp-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <MessageSquare size={15} /> 911 Airlines Customer Relations &amp; Quality Care
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Passenger Experience, Compliments &amp; Concerns</h2>
        <p className="intro-lead">
          Your feedback drives our luxury aviation standards. Share your travel experiences, commend
          exceptional flight crew, or file formal service inquiries.
        </p>

        {/* Tab Strip */}
        <div className="feedback-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            <MessageSquare size={16} />
            <span>Submit Feedback</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'crew' ? 'active' : ''}`}
            onClick={() => setActiveTab('crew')}
          >
            <Award size={16} />
            <span>Crew Recognition</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'rights' ? 'active' : ''}`}
            onClick={() => setActiveTab('rights')}
          >
            <ShieldCheck size={16} />
            <span>Passenger Rights</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'executive' ? 'active' : ''}`}
            onClick={() => setActiveTab('executive')}
          >
            <Building2 size={16} />
            <span>Executive Office</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SUBMIT */}
      {activeTab === 'submit' && (
        <div className="feedback-form-card">
          <div className="fb-head">
            <h3>Share Details of Your Journey</h3>
            <p>Every case is personally investigated by our Senior Quality Assurance Directorate.</p>
          </div>

          {submitted ? (
            <div className="fb-success-box">
              <CheckCircle2 size={28} />
              <div>
                <h4>Thank You! Your Feedback Has Been Registered</h4>
                <p>
                  Official Case ID: <strong>911-CARE-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                  A Senior Passenger Care Officer has been assigned to your case and will respond within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="fb-form">
              <div className="fb-row-2">
                <div className="field-group">
                  <label>Feedback Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="custom-select"
                  >
                    <option value="In-Flight Service &amp; Hospitality">In-Flight Service &amp; Hospitality</option>
                    <option value="First &amp; Business Cabin Comfort">First &amp; Business Cabin Comfort</option>
                    <option value="Gourmet Dining &amp; Beverage">Gourmet Dining &amp; Beverage</option>
                    <option value="Airport Lounge &amp; Ground Handling">Airport Lounge &amp; Ground Handling</option>
                    <option value="Baggage Handling &amp; Delivery">Baggage Handling &amp; Delivery</option>
                    <option value="Compliment &amp; Staff Recognition">Compliment &amp; Staff Recognition</option>
                    <option value="Website &amp; Booking App">Website &amp; Booking App</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Flight Number &amp; Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 911-408 / Aug 28"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="rating-select-row">
                <label>Overall Rating of Your Experience</label>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      <Star size={24} fill={rating >= star ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                  <span className="rating-text">
                    {rating === 5 ? 'Exceptional (5/5)' : rating === 4 ? 'Very Good (4/5)' : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              <div className="field-group">
                <label>Detailed Comments &amp; Description</label>
                <textarea
                  rows={5}
                  placeholder="Please describe your experience in detail. Include names of crew members or specific flight details if applicable..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit-fb">
                <Send size={16} /> Submit Feedback to Passenger Care
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: CREW */}
      {activeTab === 'crew' && (
        <div className="crew-view-card">
          <Award size={36} className="crew-icon" />
          <h3>Commend an Outstanding 911 Airlines Crew Member</h3>
          <p>
            Did a flight attendant, pilot, or lounge host go above and beyond? Our &ldquo;Wings of
            Excellence&rdquo; program directly rewards crew members who embody world-class luxury and care.
          </p>
          <div className="crew-awards-info">
            <h4>How It Works:</h4>
            <ul>
              <li>Submit the crew member&apos;s name and flight number.</li>
              <li>Your commendation is added to their permanent leadership file.</li>
              <li>Crew members receive our quarterly Gold Service distinction and recognition bonus.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: RIGHTS */}
      {activeTab === 'rights' && (
        <div className="rights-view-card">
          <h3>911 Airlines Passenger Bill of Rights</h3>
          <p>Committed to full transparency, passenger dignity, and rigorous global aviation compliance.</p>

          <div className="rights-grid">
            <div className="right-item">
              <h4>US DOT Part 259 Compliance</h4>
              <p>Full 24-hour fee-free cancellation, tarmac delay protections, and rapid automated refunds.</p>
            </div>
            <div className="right-item">
              <h4>EU261 / UK261 Regulations</h4>
              <p>Standardized statutory compensation up to €600 / £520 for covered European flight disruptions.</p>
            </div>
            <div className="right-item">
              <h4>Montreal Convention 1999</h4>
              <p>Guaranteed baggage liability and international traveler injury compensation safeguards.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXECUTIVE */}
      {activeTab === 'executive' && (
        <div className="executive-view-card">
          <Building2 size={36} className="exec-icon" />
          <h3>Office of the Chief Executive &amp; Guest Experience</h3>
          <p>
            For unresolved matters or high-priority corporate client relations, cases can be directly
            escalated to our Executive Directorate for final resolution.
          </p>
          <div className="exec-contact-box">
            <strong>executive.relations@911airlines.com</strong>
            <span>Direct Desk: +1 (800) 911-EXEC (Mon–Fri 8AM–8PM EST)</span>
          </div>
        </div>
      )}
    </div>
  );
}
