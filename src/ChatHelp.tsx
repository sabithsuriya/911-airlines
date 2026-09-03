import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  ArrowLeft,
  PhoneCall,
  Mail,
  Smartphone,
  Sparkles,
  UserCheck,
  Headphones
} from 'lucide-react';
import './ChatHelp.css';

interface ChatHelpProps {
  onBack?: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  time: string;
}

export default function ChatHelp({ onBack }: ChatHelpProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am SkyAssistant, your 24/7 dedicated 911 Airlines AI Concierge. How can I assist you with your flight, baggage, seats, or travel requirements today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'phone' | 'email' | 'whatsapp'>('chat');
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Check baggage allowance for flight',
    'How do I upgrade to First Suite?',
    'What are the passport validity rules?',
    'Connect me with a Human Support Agent',
    'Where is my refund status?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I've retrieved the latest information for your request. You can manage seats, meal preferences, and baggage directly from your 'My Trips' dashboard.";

      if (text.toLowerCase().includes('agent') || text.toLowerCase().includes('human')) {
        setIsAgentConnected(true);
        replyText = "Connecting you with Senior Passenger Relations Officer Sarah Jenkins... Connected! Hello, I am here to personally assist you.";
      } else if (text.toLowerCase().includes('baggage') || text.toLowerCase().includes('luggage')) {
        replyText = "For 911 Airlines flights, First Suites include 2 × 32kg checked bags + 2 × 8kg carry-on. You can track missing baggage via our Property Irregularity Report (PIR) tracer in Help.";
      } else if (text.toLowerCase().includes('upgrade') || text.toLowerCase().includes('suite')) {
        replyText = "Cabin upgrades to First Suites or Business Comfort can be redeemed using 911 SkyMiles or credit card via the 'Manage Booking' portal.";
      } else if (text.toLowerCase().includes('refund')) {
        replyText = "Refunds on refundable fares are processed in 7-14 business days. Alternatively, you can claim an instant 911 SkyVoucher with a 10% bonus credit.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: text.toLowerCase().includes('agent') || isAgentConnected ? 'agent' : 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chathelp-wrapper">
      {/* Hero Card */}
      <div className="chathelp-intro-card">
        <div className="intro-top-row">
          <div className="intro-badge">
            <Headphones size={15} /> 24/7 Global Passenger Support
          </div>
          {onBack && (
            <button type="button" className="btn-back-topics" onClick={onBack}>
              <ArrowLeft size={15} /> Back to All Topics
            </button>
          )}
        </div>
        <h2>24/7 Priority Passenger Care &amp; Live Chat</h2>
        <p className="intro-lead">
          Connect in real-time with 911 Airlines AI concierge or request an immediate transfer to our
          executive ground handling and reservations team worldwide.
        </p>

        {/* Tab Strip */}
        <div className="chat-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={16} />
            <span>Live Chat</span>
            <span className="live-pill">Online</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'phone' ? 'active' : ''}`}
            onClick={() => setActiveTab('phone')}
          >
            <PhoneCall size={16} />
            <span>Toll-Free Phone</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            <Smartphone size={16} />
            <span>WhatsApp Support</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <Mail size={16} />
            <span>Priority Email</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="chat-box-card">
          <div className="chat-box-header">
            <div className="agent-avatar-wrap">
              <div className="avatar-circle">
                <Sparkles size={18} />
              </div>
              <div>
                <h4>911 SkyAssistant AI Concierge</h4>
                <span className="status-online">● Online · Average response time &lt; 5 seconds</span>
              </div>
            </div>

            {isAgentConnected && (
              <span className="human-badge">
                <UserCheck size={14} /> Human Officer Active
              </span>
            )}
          </div>

          <div className="messages-window">
            {messages.map((m) => (
              <div key={m.id} className={`message-bubble ${m.sender}`}>
                <div className="sender-tag">
                  {m.sender === 'user' ? 'You' : m.sender === 'agent' ? 'Senior Agent Sarah' : 'SkyAssistant'} · {m.time}
                </div>
                <div className="bubble-text">{m.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                type="button"
                className="chip-btn"
                onClick={() => handleSend(qp)}
              >
                {qp}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chat-input-row"
          >
            <input
              type="text"
              placeholder="Ask anything about flights, seats, baggage, visas, or refunds..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn-send-msg" disabled={!inputText.trim()}>
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: PHONE */}
      {activeTab === 'phone' && (
        <div className="phone-view-card">
          <h3>Worldwide Toll-Free Phone Lines</h3>
          <p>Direct priority access for reservation inquiries, ticket modifications, and lounge assistance.</p>

          <div className="phone-grid">
            <div className="phone-card">
              <h4>United States &amp; Canada (24/7 Toll-Free)</h4>
              <span className="phone-num">+1 (800) 911-FLIGHTS</span>
              <span className="wait-pill">Wait time: &lt; 1 min</span>
            </div>

            <div className="phone-card">
              <h4>United Kingdom &amp; Europe</h4>
              <span className="phone-num">+44 20 7911 0000</span>
              <span className="wait-pill">Wait time: &lt; 2 mins</span>
            </div>

            <div className="phone-card">
              <h4>Middle East &amp; GCC (Doha / Dubai)</h4>
              <span className="phone-num">+971 4 911 2000</span>
              <span className="wait-pill">Wait time: Instant</span>
            </div>

            <div className="phone-card">
              <h4>Asia-Pacific (Singapore / Tokyo)</h4>
              <span className="phone-num">+65 6911 8800</span>
              <span className="wait-pill">Wait time: &lt; 1 min</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHATSAPP */}
      {activeTab === 'whatsapp' && (
        <div className="whatsapp-card">
          <Smartphone size={36} className="wa-icon" />
          <h3>911 Airlines Official WhatsApp Assistant</h3>
          <p>
            Receive live gate updates, mobile boarding passes, baggage delivery tracking, and flight
            notifications directly to your WhatsApp messenger.
          </p>
          <div className="wa-box">
            <span className="wa-num">+1 (800) 911-2478</span>
            <button
              type="button"
              className="btn-open-wa"
              onClick={() => alert('Launching WhatsApp with 911 Airlines Verified Business Account...')}
            >
              Start WhatsApp Conversation →
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: EMAIL */}
      {activeTab === 'email' && (
        <div className="email-card">
          <Mail size={36} className="email-icon" />
          <h3>Priority Passenger Care Email</h3>
          <p>Guaranteed response in under 2 hours by our dedicated international support team.</p>
          <div className="email-address-box">
            <strong>concierge@911airlines.com</strong>
          </div>
        </div>
      )}
    </div>
  );
}
