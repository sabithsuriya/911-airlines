import { useState } from 'react';
import {
  CreditCard,
  Gift,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
  FileText,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import './RefundVoucherHelp.css';

interface RefundVoucherHelpProps {
  onBack?: () => void;
}

export default function RefundVoucherHelp({ onBack }: RefundVoucherHelpProps) {
  const [pnr, setPnr] = useState('911NYC');
  const [lastName, setLastName] = useState('Smith');
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedOption, setSelectedOption] = useState<'voucher' | 'card'>('voucher');
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'claim' | 'policy' | 'medical' | 'faqs'>('claim');

  return (
    <div className="refundhelp-wrapper">
      {/* Hero Card */}
      <div className="refundhelp-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <CreditCard size={15} /> 911 Airlines Refund &amp; SkyVoucher Center
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Request a Ticket Refund or Travel Voucher</h2>
        <p className="intro-lead">
          Choose between an instant <strong>911 SkyVoucher with a +10% bonus credit</strong> (valid for 24
          months) or initiate an automatic refund to your original payment card.
        </p>

        {/* Tab Strip */}
        <div className="refund-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'claim' ? 'active' : ''}`}
            onClick={() => setActiveTab('claim')}
          >
            <Gift size={16} />
            <span>Claim Refund / Voucher</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'policy' ? 'active' : ''}`}
            onClick={() => setActiveTab('policy')}
          >
            <FileText size={16} />
            <span>Fare Refund Policy</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            <ShieldCheck size={16} />
            <span>Medical Emergency Waiver</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <HelpCircle size={16} />
            <span>Refund FAQs</span>
          </button>
        </div>
      </div>

      {/* Retrieval Card */}
      <div className="refund-search-card">
        <div className="search-header">
          <CreditCard size={22} className="search-icon" />
          <div>
            <h3>Search Booking for Refund Eligibility</h3>
            <p>Enter your 6-character booking reference and passenger surname.</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setHasSearched(true); }} className="refund-form-grid">
          <div className="field-group">
            <label>Booking Reference (PNR)</label>
            <input
              type="text"
              placeholder="e.g. 911NYC"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
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
            <button type="submit" className="btn-search-refund">
              <Search size={16} />
              <span>Check Eligibility</span>
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="refund-content-box">
          {/* TAB 1: CLAIM */}
          {activeTab === 'claim' && (
            <div className="claim-view">
              <div className="ticket-eligible-banner">
                <div>
                  <span className="el-label">TICKET VALUE:</span>
                  <strong className="el-amount">$1,450.00 USD</strong>
                </div>
                <span className="el-status">Eligible for Full Refund / SkyVoucher</span>
              </div>

              <h3>Select Your Preferred Refund Method</h3>
              <p className="sub-text">Compare options below and receive your voucher or cash credit immediately.</p>

              <div className="options-compare-grid">
                {/* Option 1: Voucher */}
                <div
                  className={`option-card recommended ${selectedOption === 'voucher' ? 'selected' : ''}`}
                  onClick={() => setSelectedOption('voucher')}
                >
                  <div className="opt-ribbon">
                    <Sparkles size={14} /> Recommended · Extra +10% Bonus
                  </div>
                  <div className="opt-head">
                    <Gift size={28} className="opt-icon" />
                    <div>
                      <h4>911 SkyVoucher Credit</h4>
                      <span className="opt-val">$1,595.00 USD</span>
                    </div>
                  </div>
                  <ul className="opt-perks">
                    <li>✓ <strong>Instant Issuance:</strong> Delivered to your email immediately.</li>
                    <li>✓ <strong>+10% Extra Bonus Value:</strong> Extra $145.00 credited for free.</li>
                    <li>✓ <strong>24-Month Validity:</strong> Valid across all international routes.</li>
                    <li>✓ <strong>Shareable:</strong> Can be used for family and friends.</li>
                    <li>✓ <strong>Zero Cancellation Fees:</strong> 100% full value preserved.</li>
                  </ul>
                  <button type="button" className="btn-select-opt">
                    {selectedOption === 'voucher' ? '✓ Selected Option' : 'Choose SkyVoucher'}
                  </button>
                </div>

                {/* Option 2: Card */}
                <div
                  className={`option-card ${selectedOption === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedOption('card')}
                >
                  <div className="opt-head">
                    <CreditCard size={28} className="opt-icon card-icon" />
                    <div>
                      <h4>Original Payment Method</h4>
                      <span className="opt-val">$1,450.00 USD</span>
                    </div>
                  </div>
                  <ul className="opt-perks">
                    <li>• Refunded directly to your original Visa / Mastercard ending in <strong>*4829</strong>.</li>
                    <li>• Processing timeline: 7 to 14 business days depending on bank.</li>
                    <li>• Government taxes and surcharges fully reimbursed.</li>
                  </ul>
                  <button type="button" className="btn-select-opt">
                    {selectedOption === 'card' ? '✓ Selected Option' : 'Choose Original Card'}
                  </button>
                </div>
              </div>

              <div className="confirm-refund-action">
                <button
                  type="button"
                  className="btn-submit-refund"
                  onClick={() => setClaimSuccess(true)}
                >
                  Confirm &amp; Process {selectedOption === 'voucher' ? 'SkyVoucher ($1,595.00)' : 'Bank Refund ($1,450.00)'} →
                </button>
              </div>

              {claimSuccess && (
                <div className="refund-success-box">
                  <CheckCircle2 size={24} />
                  <div>
                    <strong>Request Processed Successfully!</strong>
                    {selectedOption === 'voucher'
                      ? ' Your $1,595.00 SkyVoucher code has been emailed to you with redemption instructions.'
                      : ' Your $1,450.00 refund transaction has been submitted to your card issuer under ARN #911-ARN-99420.'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: POLICY */}
          {activeTab === 'policy' && (
            <div className="policy-view">
              <div className="policy-grid">
                <div className="pol-card">
                  <h4>First Class &amp; Business Suites</h4>
                  <p>100% full cash refund or SkyVoucher (+10% bonus) anytime prior to departure.</p>
                </div>
                <div className="pol-card">
                  <h4>Flex Fares</h4>
                  <p>Full refund with zero penalty if cancelled up to 2 hours prior to flight departure.</p>
                </div>
                <div className="pol-card">
                  <h4>Classic Fares</h4>
                  <p>Refundable with a standard cancellation fee ($35) or full 100% value as SkyVoucher.</p>
                </div>
                <div className="pol-card">
                  <h4>24-Hour Risk-Free Guarantee</h4>
                  <p>All bookings made directly on 911 Airlines are eligible for 100% full cash refund within 24 hours of purchase.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDICAL */}
          {activeTab === 'medical' && (
            <div className="medical-view">
              <div className="med-card">
                <ShieldCheck size={32} className="med-icon" />
                <h3>Compassionate &amp; Medical Emergency Policy</h3>
                <p>
                  In the unfortunate event of severe illness, hospitalization, or bereavement of an
                  immediate family member, 911 Airlines provides complete fee-free ticket cancellation
                  and full refunds upon verification.
                </p>
                <div className="med-reqs">
                  <strong>Required Documents for Waiver:</strong>
                  <ul>
                    <li>Medical certificate from licensed physician or hospital admission record.</li>
                    <li>Official relation proof (if for immediate family member).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS */}
          {activeTab === 'faqs' && (
            <div className="faqs-view">
              <div className="faq-item">
                <h4>How long does it take to receive my refund?</h4>
                <p>
                  911 SkyVouchers are issued instantly within 60 seconds. Credit and debit card refunds
                  are settled within 7 to 14 business days.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I use my 911 SkyVoucher across multiple bookings?</h4>
                <p>
                  Yes! SkyVouchers can be used multiple times until the total dollar balance is
                  exhausted.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
