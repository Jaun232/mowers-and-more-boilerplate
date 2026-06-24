import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PHONE_TEL } from '../contactInfo';

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

const categories = [
  { icon: '⚙️', label: 'Blades', desc: 'Mulching, high-lift and standard blades for all mower brands.' },
  { icon: '🔧', label: 'Belts & Cables', desc: 'Drive belts, throttle cables, brake cables and more.' },
  { icon: '🌬️', label: 'Air Filters', desc: 'Genuine and aftermarket filters for all major engines.' },
  { icon: '⚡', label: 'Spark Plugs', desc: 'NGK, Champion and OEM plugs for 2-stroke and 4-stroke engines.' },
  { icon: '🛢️', label: 'Carburettors', desc: 'Rebuild kits and replacement carbs for petrol engines.' },
  { icon: '🔋', label: 'Batteries', desc: 'Sealed lead-acid and lithium batteries for ride-ons and starters.' },
  { icon: '🪛', label: 'Fuel Systems', desc: 'Fuel tanks, lines, primers and caps.' },
  { icon: '🛞', label: 'Wheels & Tyres', desc: 'Replacement wheels and tyres for all mower types.' },
];

const brands = ['Honda', 'Husqvarna', 'STIHL', 'Briggs & Stratton', 'Kawasaki', 'Tecumseh', 'Echo', 'MTD', 'Makita'];

export default function Spares() {
  const [query, setQuery] = useState('');
  const catsRef = useReveal();
  const brandsRef = useReveal();

  const filtered = query.trim()
    ? categories.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : categories;

  return (
    <>
      {/* HERO / SEARCH */}
      <section className="spares-hero">
        <div className="spares-hero-overlay" />
        <div className="spares-hero-content">
          <span className="section-tag">SPARES &amp; PARTS</span>
          <h1 className="page-hero-title">Find the Right Part,<br />Fast</h1>
          <p className="page-hero-sub">Genuine and quality aftermarket parts for all major brands.<br />In stock or sourced within days.</p>
          <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search parts, e.g. 'spark plug', 'blade'…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="spares-cats-section">
        <div className="section-inner">
          <div className="reveal-up" ref={useReveal()}>
            <span className="section-tag">CATEGORIES</span>
            <h2 className="section-title">Browse by Part Type</h2>
          </div>
          <div className="spares-grid reveal-up" ref={catsRef}>
            {filtered.length > 0 ? filtered.map(c => (
              <Link to="/contact" key={c.label} className="spare-card">
                <span className="spare-emoji">{c.icon}</span>
                <h3>{c.label}</h3>
                <p>{c.desc}</p>
                <span className="spare-link">Enquire →</span>
              </Link>
            )) : (
              <div className="empty-state full-width">
                <p>No parts found for "<strong>{query}</strong>"</p>
                <button className="btn-ghost" onClick={() => setQuery('')}>Clear Search</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section">
        <div className="section-inner">
          <div className="reveal-up" ref={useReveal()}>
            <span className="section-tag center-tag">COMPATIBLE BRANDS</span>
            <h2 className="section-title center">Parts for all major brands</h2>
            <p className="section-desc center">We source genuine OEM and quality aftermarket parts for all of these manufacturers.</p>
          </div>
          <div className="brands-grid reveal-up" ref={brandsRef}>
            {brands.map(b => (
              <div key={b} className="brand-chip">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* HELP CTA */}
      <section className="spares-help reveal-up" ref={useReveal()}>
        <div className="spares-help-inner">
          <div className="spares-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <h2>Can't find the part you need?</h2>
            <p>Bring your old part in-store, or send us the model number and part description. We'll source it for you — usually within 3–5 business days.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/contact" className="btn-primary">Send an Enquiry</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-outline">Call Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
