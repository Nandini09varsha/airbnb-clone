import { Globe, Menu, Search, UserRound } from "lucide-react";
import { useState } from "react";

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Airbnb homepage">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 1c2.1 0 3.7 1.1 5.1 3.5l.5 1c1.9 3.6 3.2 6.1 5 8.1 2.1 2.3 4.4 3.5 7.1 3.6v2.2c-3.6.2-6.5-1.3-9.2-4.3-.3 4.8-1.7 9-4.4 12.2C18.3 29.5 17.2 31 16 31s-2.3-1.5-4.1-3.7c-2.7-3.2-4.1-7.4-4.4-12.2-2.7 3-5.6 4.5-9.2 4.3V17.2c2.7-.1 5-1.3 7.1-3.6 1.8-2 3.1-4.5 5-8.1l.5-1C12.3 2.1 13.9 1 16 1zm0 8.2c-1.4 2.6-2.5 4.6-3.8 6.2 1 6.3 2.4 10 3.8 11.7 1.4-1.7 2.8-5.4 3.8-11.7-1.3-1.6-2.4-3.6-3.8-6.2z"
        />
      </svg>
      <span className="logo-word">airbnb</span>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <div className="search-pill" role="search">
          <button type="button" className="seg">
            Anywhere
          </button>
          <button type="button" className="seg">
            Anytime
          </button>
          <button type="button" className="seg">
            Add guests
          </button>
          <button type="button" className="search-go" aria-label="Search">
            <Search size={14} strokeWidth={3} />
          </button>
        </div>
        <div className="header-right">
          <a className="host-link" href="#host">
            Become a host
          </a>
          <button
            type="button"
            className="icon-btn"
            aria-label="Choose a language and currency"
            aria-expanded={langOpen}
            onClick={() => {
              setLangOpen((v) => !v);
              setMenuOpen(false);
            }}
          >
            <Globe size={18} />
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-label="Main navigation menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((v) => !v);
              setLangOpen(false);
            }}
          >
            <Menu size={16} />
            <UserRound size={20} />
          </button>
        </div>
        {langOpen && (
          <div className="dropdown" role="menu">
            <button type="button">English (IN)</button>
            <button type="button">INR · ₹</button>
          </div>
        )}
        {menuOpen && (
          <div className="dropdown" role="menu">
            <button type="button">Sign up</button>
            <button type="button">Log in</button>
            <button type="button">Gift cards</button>
            <button type="button">Help Centre</button>
          </div>
        )}
      </div>
    </header>
  );
}
