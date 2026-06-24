import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FOUNDED_YEAR, PHONE_DISPLAY, PHONE_TEL } from '../contactInfo';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const services = [
  {
    id: 'servicing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    title: 'Scheduled Servicing',
    desc: 'Full annual or seasonal servicing packages — oil changes, filter replacements, plug checks, and a full safety inspection.',
    price: 'From $89',
  },
  {
    id: 'repairs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Repairs & Diagnostics',
    desc: "Won't start? Running rough? We'll diagnose the problem fast and get you cutting again. All major brands covered.",
    price: 'Free quote',
  },
  {
    id: 'blades',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Blade Sharpening & Balancing',
    desc: 'Sharp blades mean healthier grass and a cleaner cut. We sharpen and balance blades for all walk-behind and ride-on mowers.',
    price: 'From $25',
  },
  {
    id: 'tuneup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Engine Tune-Ups',
    desc: 'Restore peak performance with a comprehensive engine tune-up — carburettor clean, spark plug, air filter, and fuel system check.',
    price: 'From $65',
  },
  {
    id: 'parts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'Parts Installation',
    desc: "We supply and fit genuine OEM and quality aftermarket parts. Can't find the part you need? We'll source it.",
    price: 'Labour from $55/hr',
  },
  {
    id: 'warranty',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Warranty Repairs',
    desc: "Authorised service centre for leading brands. Warranty work handled professionally so your coverage stays intact.",
    price: 'Covered by warranty',
  },
];

const steps = [
  { num: '01', title: 'Drop Off or Book In', desc: "Bring your equipment in or call us and we'll arrange a pickup. We'll assess the job on the spot." },
  { num: '02', title: 'Diagnose & Quote',    desc: "We'll thoroughly inspect your machine and provide a clear, no-obligation quote before any work begins." },
  { num: '03', title: 'Repair & Return',     desc: "Once approved, our technicians get to work. Most jobs are done in 3–5 days. We'll call when it's ready." },
];

export default function Services() {
  const stepsRef = useReveal();
  return (
    <>
      {/* HERO */}
      <section className="page-hero" style={{ backgroundImage: 'url(/services_hero.png)' }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">SERVICES</span>
          <h1 className="page-hero-title">Expert Equipment<br />Repairs &amp; Servicing</h1>
          <p className="page-hero-sub">Trusted by homeowners and professionals across the Eastern Cape<br/>since {FOUNDED_YEAR}.</p>
          <Link to="/contact" className="btn-primary">Book a Service</Link>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="services-section">
        <div className="section-inner">
          <div className="services-header reveal-up" ref={useReveal()}>
            <span className="section-tag">WHAT WE DO</span>
            <h2 className="section-title center">Everything your equipment needs</h2>
            <p className="section-desc center">From basic tune-ups to full engine rebuilds — we do it all.</p>
          </div>
          <div className="services-grid">
            {services.map((s) => {
              const ref = useReveal(); // eslint-disable-line react-hooks/rules-of-hooks
              return (
                <div key={s.id} className="service-card reveal-up" ref={ref}>
                  <span className="service-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="service-price">{s.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="section-inner">
          <div className="services-header reveal-up" ref={useReveal()}>
            <span className="section-tag">HOW IT WORKS</span>
            <h2 className="section-title center">Simple, stress-free process</h2>
          </div>
          <div className="process-steps reveal-up" ref={stepsRef}>
            {steps.map((s, i) => (
              <div key={s.num} className="process-step">
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner reveal-up" ref={useReveal()}>
        <div className="cta-banner-inner">
          <div>
            <h2>Ready to book a service?</h2>
            <p>Drop in during business hours or give us a call — we're always happy to help.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/contact" className="btn-primary">Book Online</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-outline">Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>
    </>
  );
}
