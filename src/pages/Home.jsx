import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GOOGLE_REVIEWS_URL, FOUNDED_YEAR, PHONE_DISPLAY, PHONE_TEL } from '../contactInfo';

/* ── simple scroll-reveal helper ── */
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

/* ── sub-components ── */
function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  const ref = useReveal();
  return (
    <div className="feature-card reveal-up" ref={ref}>
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function EqCard({ label, image, to }) {
  return (
    <Link to={to} className="eq-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="eq-overlay" />
      <span className="eq-label">{label}</span>
      <span className="eq-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </span>
    </Link>
  );
}

/* ── Page ── */
export default function Home() {
  const equipRef  = useReveal();
  const statsRef  = useReveal();
  const ctaRef    = useReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">
            Mowers<br /><span className="text-green">and More</span>
          </h1>
          <p className="hero-subtitle">
            Your trusted partner for equipment,<br className="break-md" />parts, and services — since {FOUNDED_YEAR}.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">Our Services</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="tp-badge">
            <span className="tp-stars">★★★★★</span>
            <span>Review us on <strong>Google</strong></span>
          </a>
        </div>
        <div className="hero-scroll-hint">
          <span />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar reveal-up" ref={statsRef}>
        <StatItem value={`${new Date().getFullYear() - FOUNDED_YEAR}+`} label="Years Experience" />
        <div className="stat-divider" />
        <StatItem value="500+" label="Happy Customers" />
        <div className="stat-divider" />
        <StatItem value="50+"  label="Brands Stocked" />
        <div className="stat-divider" />
        <StatItem value="5★"   label="Google Rating" />
      </div>

      {/* EQUIPMENT */}
      <section className="equipment-section" id="sales">
        <div className="section-inner equipment-grid reveal-up" ref={equipRef}>
          <div className="equipment-intro">
            <span className="section-tag">EQUIPMENT</span>
            <h2 className="section-title">New Equipment</h2>
            <p className="section-desc">
              Select a category to explore our available equipment
            </p>
            <Link to="/sales" className="btn-ghost">View All Equipment →</Link>
          </div>
          <div className="eq-cards">
            <EqCard label="Lawnmowers"  image="/lawnmowers.png"  to="/sales" />
            <EqCard label="Brushcutters" image="/brushcutters.png" to="/sales" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-inner">
          <div className="features-header reveal-up" ref={useReveal()}>
            <span className="section-tag">WHY CHOOSE US</span>
            <h2 className="section-title center">Built on trust, quality &amp; expertise</h2>
          </div>
          <div className="features-grid">
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>}
              title="Quality You Can Trust"
              desc="We supply reliable, high-quality equipment from trusted brands with full warranty support."
            />
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
              title="Expert Service"
              desc="Our experienced team provides fast, reliable servicing and repairs for all major brands."
            />
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
              title="Genuine Parts"
              desc="We stock a wide range of genuine spares to keep your equipment running at peak performance."
            />
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              title="Fast Turnaround"
              desc="Most service jobs completed within 3–5 business days so you're not kept waiting."
            />
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="Local Expertise"
              desc="Family-owned and operated in Berea, East London — we know your local conditions."
            />
            <FeatureCard
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              title="Competitive Pricing"
              desc="Fair, transparent pricing with no hidden fees. Free quotes on all repair jobs."
            />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner reveal-up" ref={ctaRef}>
        <div className="cta-banner-inner">
          <div>
            <h2>Ready for a service?</h2>
            <p>Book online or call us — we'll have your equipment running like new.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/contact" className="btn-primary">Book a Service</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-outline">Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>
    </>
  );
}
