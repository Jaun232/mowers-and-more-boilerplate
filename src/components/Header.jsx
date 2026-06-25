import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: '/',        label: 'Home'     },
    { to: '/services',label: 'Services' },
    { to: '/sales',   label: 'Sales'    },
    { to: '/spares',  label: 'Spares'   },
    { to: '/contact', label: 'Contact'  },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <NavLink to="/" className="logo-link" aria-label="Mowers & More – Home">
          <Logo height={52} className="logo-img" />
        </NavLink>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="header-cta">Contact Us</NavLink>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="mobile-backdrop"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            end={to === '/'}
          >
            {label}
          </NavLink>
        ))}
        <NavLink to="/contact" className="mobile-cta">Book a Service</NavLink>
      </div>
    </header>
  );
}
