import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { ADDRESS, HOURS, PHONE_DISPLAY, PHONE_TEL } from '../contactInfo';

const quickLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/sales',    label: 'Sales'    },
  { to: '/spares',   label: 'Spares'   },
  { to: '/contact',  label: 'Contact'  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo height={60} />
          <p className="footer-tagline">Your trusted partner for equipment,<br/>parts, and services.</p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            {quickLinks.map(({ to, label }) => (
              <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul>
            <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
            <li>{ADDRESS.street}</li>
            <li>{ADDRESS.suburb}</li>
            <li>{ADDRESS.province}</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Hours</h4>
          <ul className="hours-list">
            {HOURS.map(({ day, time, closed }) => (
              <li key={day}>
                <span>{day}</span>
                <span className={closed ? 'closed' : undefined}>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Mowers and More. All rights reserved.</p>
        <p className="footer-legal">
          <NavLink to="/contact">Privacy Policy</NavLink>
        </p>
      </div>
    </footer>
  );
}
