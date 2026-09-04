import React, { useState } from 'react';
import Header, { type PageType } from './Header';
import Footer from './Footer';
import TravelRequirements from './TravelRequirements';
import MyTripsHelp from './MyTripsHelp';
import ChangeFlightHelp from './ChangeFlightHelp';
import ChatHelp from './ChatHelp';
import BaggageHelp from './BaggageHelp';
import RefundVoucherHelp from './RefundVoucherHelp';
import TrackRefundHelp from './TrackRefundHelp';
import FeedbackHelp from './FeedbackHelp';
import './HelpCenter.css';

interface HelpCenterProps {
  onNavigate: (page: PageType, sectionIndex?: number) => void;
}

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function HelpCenter({ onNavigate }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const helpTopics: HelpTopic[] = [
    {
      id: 'travel-req',
      title: 'Travel requirements',
      description: 'Visas, documents and entry rules for your destination',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 4 5.7 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.7-4-9z" />
        </svg>
      )
    },
    {
      id: 'my-trips',
      title: 'My trips',
      description: 'View, manage or check in for an upcoming flight',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      )
    },
    {
      id: 'change-flight',
      title: 'Change flight',
      description: 'Pick a new date or route that suits your schedule',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 17l6-11 3 5 3-3 4 9" />
          <path d="M4 17h16" />
        </svg>
      )
    },
    {
      id: 'chat',
      title: 'Chat with us',
      description: 'Talk to a support agent in real time',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    {
      id: 'baggage',
      title: 'Missing baggage',
      description: 'Track a bag or file a claim for a delayed item',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="8" width="16" height="12" rx="2" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      )
    },
    {
      id: 'refund-voucher',
      title: 'Refund & voucher',
      description: 'Request a refund or convert a fare into a voucher',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5" />
        </svg>
      )
    },
    {
      id: 'track-refund',
      title: 'Track a refund',
      description: 'Check the current status of a submitted refund',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      )
    },
    {
      id: 'feedback',
      title: 'Feedback & concerns',
      description: 'Tell us about your experience, good or bad',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    }
  ];

  const filteredTopics = helpTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredTopics.length > 0) {
      setSelectedTopic(filteredTopics[0].id);
    }
  };

  const currentTopic = helpTopics.find((t) => t.id === selectedTopic);

  return (
    <div className="helpcenter-container">
      <Header currentPage="help" onNavigate={onNavigate} />

      <header className="sky">
        <div className="sky-photo">
          <video autoPlay muted loop playsInline>
            <source src="/assets/overallbg.mp4" type="video/mp4" />
            <source src="/assets/bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="sky-scrim"></div>

        <div className="sky-content">
          <p className="eyebrow">Help centre</p>
          <h1>What can we help you with today?</h1>
          <p>
            Search flight bookings, baggage, refunds and travel requirements — or browse the topics below.
          </p>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search help, e.g. 'travel requirements', 'seats', 'baggage', 'refund'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="horizon-fade"></div>
      </header>

      {/* Breadcrumb Bar */}
      <div className="breadcrumb">
        <button type="button" onClick={() => onNavigate('home', 0)}>
          Home
        </button>{' '}
        /{' '}
        <button
          type="button"
          onClick={() => setSelectedTopic(null)}
          className={selectedTopic ? '' : 'current'}
        >
          Help
        </button>
        {selectedTopic && currentTopic && (
          <>
            {' '}/{' '}
            <span className="current">{currentTopic.title}</span>
          </>
        )}
      </div>

      {/* Topics Quick Nav Pill Strip */}
      <div className="topics-pill-strip">
        <button
          type="button"
          className={`topic-pill-btn ${selectedTopic === null ? 'active' : ''}`}
          onClick={() => setSelectedTopic(null)}
        >
          All Topics
        </button>
        {helpTopics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`topic-pill-btn ${selectedTopic === topic.id ? 'active' : ''}`}
            onClick={() => setSelectedTopic(topic.id)}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* TOPIC VIEWS */}
      {selectedTopic === 'travel-req' && (
        <TravelRequirements onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'my-trips' && (
        <MyTripsHelp
          onBack={() => setSelectedTopic(null)}
          onNavigateManage={() => onNavigate('manage')}
        />
      )}

      {selectedTopic === 'change-flight' && (
        <ChangeFlightHelp onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'chat' && (
        <ChatHelp onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'baggage' && (
        <BaggageHelp onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'refund-voucher' && (
        <RefundVoucherHelp onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'track-refund' && (
        <TrackRefundHelp onBack={() => setSelectedTopic(null)} />
      )}

      {selectedTopic === 'feedback' && (
        <FeedbackHelp onBack={() => setSelectedTopic(null)} />
      )}

      {/* TOPIC GRID (WHEN ALL TOPICS SELECTED) */}
      {selectedTopic === null && (
        <section className="help-grid">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <a
                key={topic.id}
                className="help-card"
                href={`#${topic.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTopic(topic.id);
                }}
              >
                {topic.icon}
                <div className="row">
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                  <span className="arrow">→</span>
                </div>
              </a>
            ))
          ) : (
            <div className="no-results">
              <h3>No help topics found for &ldquo;{searchQuery}&rdquo;</h3>
              <p>Try searching for a different keyword like baggage, refund, or flight.</p>
            </div>
          )}
        </section>
      )}

      <Footer
        onNavigateHome={() => onNavigate('home', 0)}
        onNavigateBook={() => onNavigate('book')}
        onNavigateManage={() => onNavigate('manage')}
        onNavigateHelp={() => {
          setSelectedTopic(null);
          onNavigate('help');
        }}
        onNavigateAbout={() => onNavigate('home', 1)}
      />
    </div>
  );
}
