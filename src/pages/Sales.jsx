import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../contactInfo';

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

const categories = ['All', 'Lawnmowers', 'Ride-Ons', 'Brushcutters', 'Chainsaws', 'Blowers'];

const products = [
  { id: 1, name: 'Honda HRX217 Self-Propelled', category: 'Lawnmowers',  image: '/lawnmowers.png',  price: '$1,199', badge: 'Bestseller' },
  { id: 2, name: 'Husqvarna TC138 Ride-On',     category: 'Ride-Ons',    image: '/rideon.png',      price: '$3,499', badge: 'New'       },
  { id: 3, name: 'STIHL FS 94 R Brushcutter',   category: 'Brushcutters',image: '/brushcutters.png',price: '$649',   badge: null        },
  { id: 4, name: 'STIHL MS 271 Farm Boss',       category: 'Chainsaws',   image: '/chainsaw.png',    price: '$899',   badge: 'Popular'   },
  { id: 5, name: 'Husqvarna LC 221A',            category: 'Lawnmowers',  image: '/lawnmowers.png',  price: '$799',   badge: null        },
  { id: 6, name: 'Honda HF2417 Ride-On',         category: 'Ride-Ons',    image: '/rideon.png',      price: '$4,199', badge: 'In Stock'  },
  { id: 7, name: 'Echo SRM-225 Trimmer',         category: 'Brushcutters',image: '/brushcutters.png',price: '$349',   badge: null        },
  { id: 8, name: 'STIHL MS 170 Chainsaw',        category: 'Chainsaws',   image: '/chainsaw.png',    price: '$499',   badge: null        },
];

const brands = ['Honda', 'Husqvarna', 'STIHL', 'Echo', 'Briggs & Stratton', 'Kawasaki', 'Makita', 'Greenworks'];

export default function Sales() {
  const [active, setActive] = useState('All');
  const gridRef = useReveal();
  const brandsRef = useReveal();

  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <>
      {/* HERO */}
      <section className="page-hero" style={{ backgroundImage: 'url(/hero_bg.png)' }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">EQUIPMENT SALES</span>
          <h1 className="page-hero-title">New Equipment<br />&amp; Machinery</h1>
          <p className="page-hero-sub">Top brands, competitive prices, and expert advice.<br/>In-store and online ordering available.</p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary">Browse Equipment</a>
            <Link to="/contact" className="btn-outline">Get a Quote</Link>
          </div>
        </div>
      </section>

      {/* FILTER + PRODUCTS */}
      <section className="products-section" id="products">
        <div className="section-inner">
          <div className="filter-bar reveal-up" ref={useReveal()}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="products-grid reveal-up" ref={gridRef}>
            {filtered.map(p => (
              <div key={p.id} className="product-card">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <div className="product-img" style={{ backgroundImage: `url(${p.image})` }} />
                <div className="product-info">
                  <span className="product-cat">{p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">{p.price}</span>
                    <Link to="/contact" className="btn-sm">Enquire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No equipment found in this category.</p>
              <button className="btn-ghost" onClick={() => setActive('All')}>View All</button>
            </div>
          )}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section">
        <div className="section-inner">
          <div className="reveal-up" ref={useReveal()}>
            <span className="section-tag center-tag">TRUSTED BRANDS</span>
            <h2 className="section-title center">We stock and service all major brands</h2>
          </div>
          <div className="brands-grid reveal-up" ref={brandsRef}>
            {brands.map(b => (
              <div key={b} className="brand-chip">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner reveal-up" ref={useReveal()}>
        <div className="cta-banner-inner">
          <div>
            <h2>Can't find what you're looking for?</h2>
            <p>We can source almost any equipment on request — just get in touch.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-outline">Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>
    </>
  );
}
