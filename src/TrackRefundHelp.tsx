import { useState } from 'react';
import {
  Clock,
  Search,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Mail,
  HelpCircle,
  Receipt
} from 'lucide-react';
import './TrackRefundHelp.css';

interface TrackRefundHelpProps {
  onBack?: () => void;
}

export default function TrackRefundHelp({ onBack }: TrackRefundHelpProps) {
  const [refCode, setRefCode] = useState('REF-911-84920');
  const [hasSearched, setHasSearched] = useState(true);
  const [receiptSent, setReceiptSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'timelines' | 'receipt' | 'faqs'>('status');

  return (
    <div className="trackrefund-wrapper">
      {/* Hero Card */}
      <div className="trackrefund-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <Clock size={15} /> 911 Airlines Revenue &amp; Refund Tracer
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>Track Refund Status &amp; Bank Transfer</h2>
        <p className="intro-lead">
          Check real-time processing milestones, Acquirer Reference Numbers (ARN), bank transfer
          timelines, and download formal tax credit invoices.
        </p>

        {/* Tab Strip */}
        <div className="track-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            <Search size={16} />
            <span>Refund Status</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'timelines' ? 'active' : ''}`}
            onClick={() => setActiveTab('timelines')}
          >
            <Clock size={16} />
            <span>Bank Timelines</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'receipt' ? 'active' : ''}`}
            onClick={() => setActiveTab('receipt')}
          >
            <Receipt size={16} />
            <span>Refund Receipt</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <HelpCircle size={16} />
            <span>Tracking FAQs</span>
          </button>
        </div>
      </div>

      {/* Search Card */}
      <div className="track-search-card">
        <div className="search-header">
          <Search size={22} className="search-icon" />
          <div>
            <h3>Look Up Refund Reference</h3>
            <p>Enter your 10-character Refund Case ID (e.g. REF-911-84920) or 6-character PNR.</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setHasSearched(true); }} className="track-form-grid">
          <div className="field-group">
            <label>Refund Reference / PNR</label>
            <input
              type="text"
              placeholder="e.g. REF-911-84920"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="field-group">
            <label>Passenger Last Name</label>
            <input
              type="text"
              placeholder="e.g. Smith"
              value="Smith"
              readOnly
            />
          </div>
          <div className="submit-field">
            <button type="submit" className="btn-track-refund">
              <Search size={16} />
              <span>Track Refund</span>
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="track-content-box">
          {/* TAB 1: STATUS */}
          {activeTab === 'status' && (
            <div className="status-view">
              <div className="refund-tracer-card">
                <div className="tracer-head">
                  <div>
                    <span className="ref-lbl">CASE ID:</span>
                    <strong className="ref-code">{refCode}</strong>
                  </div>
                  <span className="status-pill-green">Transferred to Bank</span>
                </div>

                <div className="refund-summary-grid">
                  <div className="sum-box">
                    <span>Refunded Amount</span>
                    <strong>$1,450.00 USD</strong>
                  </div>
                  <div className="sum-box">
                    <span>Payment Destination</span>
                    <strong>Visa Ending *4829</strong>
                  </div>
                  <div className="sum-box">
                    <span>Acquirer Ref (ARN)</span>
                    <strong>911ARN7749201948</strong>
                  </div>
                  <div className="sum-box">
                    <span>Settlement Date</span>
                    <strong>Today (09:15 AM)</strong>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="refund-steps">
                  <div className="ref-step completed">
                    <div className="ref-dot"><CheckCircle2 size={16} /></div>
                    <h4>1. Request Submitted</h4>
                    <span className="step-date">Aug 28 · Web Portal</span>
                  </div>

                  <div className="ref-step completed">
                    <div className="ref-dot"><CheckCircle2 size={16} /></div>
                    <h4>2. Revenue Audit</h4>
                    <span className="step-date">Aug 29 · Zero Fees</span>
                  </div>

                  <div className="ref-step completed">
                    <div className="ref-dot"><CheckCircle2 size={16} /></div>
                    <h4>3. Approved &amp; Processed</h4>
                    <span className="step-date">Aug 30 · $1,450.00</span>
                  </div>

                  <div className="ref-step completed active">
                    <div className="ref-dot"><CheckCircle2 size={16} /></div>
                    <h4>4. Transferred to Card Bank</h4>
                    <span className="step-date">Today · Funds Cleared</span>
                  </div>
                </div>

                <div className="bank-note-box">
                  <Building2 size={20} />
                  <div>
                    <strong>Funds dispatched to your issuing bank:</strong> Depending on your financial
                    institution&apos;s processing cycles, the credit will appear on your monthly statement within
                    2 to 4 business days. Provide ARN <strong>911ARN7749201948</strong> to your bank if inquiring.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINES */}
          {activeTab === 'timelines' && (
            <div className="timelines-view">
              <div className="time-grid">
                <div className="time-card">
                  <h4>Visa &amp; Mastercard</h4>
                  <span className="time-days">2 – 5 Business Days</span>
                  <p>Fast automated clearing through global payment networks.</p>
                </div>
                <div className="time-card">
                  <h4>American Express</h4>
                  <span className="time-days">2 – 4 Business Days</span>
                  <p>Immediate statement credit upon settlement dispatch.</p>
                </div>
                <div className="time-card">
                  <h4>International Bank Wire / SEPA</h4>
                  <span className="time-days">5 – 10 Business Days</span>
                  <p>Cross-border SWIFT wire transfers subject to intermediary banks.</p>
                </div>
                <div className="time-card">
                  <h4>911 SkyVoucher</h4>
                  <span className="time-days">Instant (&lt; 60 Seconds)</span>
                  <p>Includes an extra 10% bonus credit delivered immediately by email.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RECEIPT */}
          {activeTab === 'receipt' && (
            <div className="receipt-view">
              <div className="receipt-card">
                <Receipt size={32} className="rec-icon" />
                <h3>Official 911 Airlines Refund Invoice &amp; Credit Note</h3>
                <p>Download or email an official tax credit receipt for your corporate expense accounting.</p>

                <div className="rec-actions">
                  <button
                    type="button"
                    className="btn-email-rec"
                    onClick={() => setReceiptSent(true)}
                  >
                    <Mail size={16} /> Email PDF Receipt to Registered Email
                  </button>
                  {receiptSent && (
                    <div className="rec-success">
                      <CheckCircle2 size={16} /> Official PDF credit note sent to passenger email!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS */}
          {activeTab === 'faqs' && (
            <div className="faqs-view">
              <div className="faq-item">
                <h4>What is an Acquirer Reference Number (ARN)?</h4>
                <p>
                  An ARN is a unique tracking number assigned to card transactions. If your bank has not
                  posted your refund after 7 days, provide the ARN to your bank&apos;s customer service to
                  locate the inbound credit.
                </p>
              </div>
              <div className="faq-item">
                <h4>What if the card I used to book is closed or expired?</h4>
                <p>
                  Banks automatically redirect refund credits to your replacement card or bank account.
                  If the account is permanently closed, contact our support team with an official bank
                  letter to reissue via alternative wire.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
