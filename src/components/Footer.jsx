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
  const whatsappHref = `https://wa.me/${PHONE_TEL.replace('+', '')}`;

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
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.6 6.4A8.2 8.2 0 0 0 3.9 13.9l-.7 3.2 3.3-.7a8.2 8.2 0 0 0 11.1-7.1c0-2.2-.9-4.3-2.5-5.8ZM12 20.2a6.7 6.7 0 0 1-3.4-.9l-.2-.1-2 .4.4-2-.1-.2a6.7 6.7 0 1 1 5.3 2.8Zm3.7-5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0a5.4 5.4 0 0 1-1.6-1c-.6-.5-1-1.1-1.4-1.8-.1-.2 0-.3.1-.4l.4-.4c.1-.1.2-.2.3-.3.1-.1.1-.2 0-.3l-.4-.9c-.1-.2-.3-.2-.4-.2h-.4c-.1 0-.3 0-.4.2-.1.2-.4.4-.6.7-.2.2-.3.5-.3.7 0 .2 0 .3.1.4l.6.8c.1.1.1.2.1.3 0 .1-.1.3-.2.4a6.3 6.3 0 0 0 2.6 2.4c.2.1.3.1.4.1.1 0 .3-.1.4-.2l.3-.4c.1-.1.2-.2.2-.4 0-.1 0-.2-.1-.3Z"/>
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
        <p>© {year} Mowers & More. All rights reserved.</p>
        <p className="footer-legal">
          <NavLink to="/contact">Privacy Policy</NavLink>
        </p>
      </div>
    </footer>
  );
}
