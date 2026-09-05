import { ArrowUpRight } from 'lucide-react';
import './Header.css';

export type PageType = 'home' | 'about' | 'book' | 'manage' | 'help' | 'deals';

interface HeaderProps {
  currentPage: PageType;
  activeSection?: number;
  onNavigate: (page: PageType, sectionIndex?: number) => void;
  onLoginClick?: () => void;
}

export default function Header({
  currentPage,
  activeSection = 0,
  onNavigate,
  onLoginClick
}: HeaderProps) {
  return (
    <header className="global-header">
      <div
        className="header-logo-wrapper"
        onClick={() => onNavigate('home', 0)}
        role="button"
        tabIndex={0}
      >
        <img src="/assets/logo.png" alt="911 Airlines Logo" className="header-logo" />
      </div>

      <nav>
        <ul className="header-menu">
          <li>
            <a
              href="#home"
              className={`nav-item ${currentPage === 'home' && activeSection === 0 ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 0);
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#book"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('book');
              }}
            >
              Book
            </a>
          </li>
          <li>
            <a
              href="#manage-booking"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('manage');
              }}
            >
              Manage booking
            </a>
          </li>
          <li>
            <a
              href="#deals"
              className={`nav-item ${currentPage === 'deals' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('deals');
              }}
            >
              Deals
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-item ${currentPage === 'home' && activeSection === 1 ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 1);
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#help"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('help');
              }}
            >
              Help
            </a>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <a
          href="#tariff"
          className="tariff-link"
          onClick={(e) => e.preventDefault()}
        >
          Tariff sheet
          <ArrowUpRight size={14} />
        </a>
        <button
          type="button"
          className="login-btn"
          onClick={onLoginClick || ((e) => e.preventDefault())}
        >
          Login
        </button>
      </div>
    </header>
  );
}
