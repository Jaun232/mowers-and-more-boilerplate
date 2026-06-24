import { useState, useEffect, useRef } from 'react';
import { ADDRESS, HOURS, MAPS_URL, PHONE_DISPLAY } from '../contactInfo';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const infoCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    lines: [ADDRESS.street, ADDRESS.suburb, ADDRESS.province],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    lines: [PHONE_DISPLAY],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Hours',
    lines: HOURS.map(({ day, time }) => `${day}: ${time}`),
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);
  const formRef  = useReveal();
  const infoRef  = useReveal();
  const mapRef   = useReveal();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // In production, wire this to a backend or EmailJS
    setSent(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">CONTACT US</span>
          <h1 className="page-hero-title">Get in Touch</h1>
          <p className="page-hero-sub">
            Questions about equipment, service bookings, or spare parts?<br />We're here to help.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="info-cards-section">
        <div className="section-inner">
          <div className="info-cards-grid reveal-up" ref={useReveal()}>
            {infoCards.map(c => (
              <div key={c.label} className="info-card">
                <span className="info-icon">{c.icon}</span>
                <h3>{c.label}</h3>
                {c.lines.map(l => <p key={l}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="contact-main">
        <div className="section-inner contact-grid">
          {/* Form */}
          <div className="contact-form-wrap reveal-up" ref={formRef}>
            <h2>Send Us a Message</h2>
            <p className="form-sub">We'll get back to you within one business day.</p>

            {sent ? (
              <div className="success-msg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Message Sent!</h3>
                <p>Thanks, {form.name}. We'll be in touch soon.</p>
                <button className="btn-ghost" onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'General Enquiry', message:'' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-name">Full Name *</label>
                    <input id="cf-name" name="name" type="text" required
                      placeholder="Jane Smith"
                      value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email Address *</label>
                    <input id="cf-email" name="email" type="email" required
                      placeholder="jane@example.com"
                      value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-phone">Phone Number</label>
                    <input id="cf-phone" name="phone" type="tel"
                      placeholder="079 000 0000"
                      value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject">Subject</label>
                    <select id="cf-subject" name="subject" value={form.subject} onChange={handleChange}>
                      <option>General Enquiry</option>
                      <option>Service Booking</option>
                      <option>Sales Enquiry</option>
                      <option>Spare Parts</option>
                      <option>Warranty Claim</option>
                    </select>
                  </div>
                </div>
                <div className="form-group full">
                  <label htmlFor="cf-message">Message *</label>
                  <textarea id="cf-message" name="message" required rows={5}
                    placeholder="Tell us about your equipment, the issue, or what you're looking for…"
                    value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary form-submit">
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Map / Info side */}
          <div className="contact-side reveal-up" ref={infoRef}>
            <div className="map-placeholder" ref={mapRef}>
              <div className="map-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p>{ADDRESS.street}<br/>{ADDRESS.suburb}<br/>{ADDRESS.province}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sm"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>

            <div className="hours-card">
              <h3>Trading Hours</h3>
              <table className="hours-table">
                <tbody>
                  {HOURS.map(({ day, time, closed }) => (
                    <tr key={day} className={closed ? 'closed-row' : undefined}>
                      <td>{day}</td>
                      <td>{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
