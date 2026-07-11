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

const fallbackBrands = ['Honda', 'Husqvarna', 'STIHL', 'Echo', 'Briggs & Stratton', 'Kawasaki', 'Makita', 'Greenworks'];

export default function Sales() {
  const [active, setActive] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState(fallbackBrands);
  const [loading, setLoading] = useState(true);
  const gridRef = useReveal();
  const brandsRef = useReveal();

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();

        if (ignore) return;

        const nextCategories = ['All', ...(data.categories || []).map((item) => item.name)];
        const nextProducts = (data.products || []).map((product) => ({
          ...product,
          category: product.category || 'Other',
        }));
        const nextBrands = Array.from(new Set(nextProducts.map((product) => product.brand).filter(Boolean))).slice(0, 10);

        setCategories(nextCategories);
        setProducts(nextProducts);
        setBrands(nextBrands.length ? nextBrands : fallbackBrands);
      } catch (error) {
        if (!ignore) {
          setCategories(['All']);
          setProducts([]);
          setBrands(fallbackBrands);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProducts();
    return () => { ignore = true; };
  }, []);

  const filtered = active === 'All' ? products : products.filter((p) => p.category === active);

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
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading equipment from the source database…</p>
            </div>
          ) : (
            <div className="products-grid reveal-up" ref={gridRef}>
              {filtered.map((p) => (
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
          )}

          {!loading && filtered.length === 0 && (
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
