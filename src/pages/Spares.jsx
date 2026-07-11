import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PHONE_TEL } from '../contactInfo';
import { supabase } from '../lib/supabaseClient';

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

const fallbackCategories = [
  { icon: '⚙️', label: 'Blades', desc: 'Mulching, high-lift and standard blades for all mower brands.' },
  { icon: '🔧', label: 'Belts & Cables', desc: 'Drive belts, throttle cables, brake cables and more.' },
  { icon: '🌬️', label: 'Air Filters', desc: 'Genuine and aftermarket filters for all major engines.' },
  { icon: '⚡', label: 'Spark Plugs', desc: 'NGK, Champion and OEM plugs for 2-stroke and 4-stroke engines.' },
  { icon: '🛢️', label: 'Carburettors', desc: 'Rebuild kits and replacement carbs for petrol engines.' },
  { icon: '🔋', label: 'Batteries', desc: 'Sealed lead-acid and lithium batteries for ride-ons and starters.' },
  { icon: '🪛', label: 'Fuel Systems', desc: 'Fuel tanks, lines, primers and caps.' },
  { icon: '🛞', label: 'Wheels & Tyres', desc: 'Replacement wheels and tyres for all mower types.' },
];

const fallbackBrands = ['Honda', 'Husqvarna', 'STIHL', 'Briggs & Stratton', 'Kawasaki', 'Tecumseh', 'Echo', 'MTD', 'Makita'];

const categoryIcons = {
  Blades: '⚙️',
  'Belts & Cables': '🔧',
  'Air Filters': '🌬️',
  'Spark Plugs': '⚡',
  Carburettors: '🛢️',
  Batteries: '🔋',
  'Fuel Systems': '🪛',
  'Wheels & Tyres': '🛞',
};

function getCategoryIcon(label) {
  return categoryIcons[label] || '⚙️';
}

export default function Spares() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState(fallbackCategories);
  const [brands, setBrands] = useState(fallbackBrands);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const catsRef = useReveal();
  const brandsRef = useReveal();

  useEffect(() => {
    let ignore = false;

    async function loadSpares() {
      try {
        const [catRes, prodRes] = await Promise.all([
          supabase
            .from('product_categories')
            .select('id,name,count')
            .eq('is_active', true)
            .order('name', { ascending: true }),
          supabase
            .from('products')
            .select('id,name,description,price,image_url,category,brand,supplier,url,updated_at')
            .eq('is_active', true)
            .order('name', { ascending: true }),
        ]);

        if (ignore) return;

        if (catRes.error || prodRes.error) {
          throw catRes.error || prodRes.error;
        }

        const nextCategories = (catRes.data || []).map((category) => ({
          icon: getCategoryIcon(category.name),
          label: category.name,
          desc: category.count
            ? `${Number(category.count)} parts available`
            : 'Browse available parts',
        }));

        const nextProducts = (prodRes.data || []).map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          category: product.category || 'Other',
          price: product.price
            ? new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(Number(product.price))
            : 'Contact us',
          image: product.image_url || '/lawnmowers.png',
          brand: product.brand || null,
          supplier: product.supplier || null,
          url: product.url || null,
          updatedAt: product.updated_at || null,
        }));

        const nextBrands = Array.from(
          new Set(nextProducts.map((item) => item.brand).filter(Boolean))
        ).slice(0, 12);

        if (nextCategories.length > 0) {
          setCategories(nextCategories);
        }
        setProducts(nextProducts);
        setBrands(nextBrands.length > 0 ? nextBrands : fallbackBrands);
      } catch (err) {
        console.warn('Supabase spares load failed:', err);
        if (!ignore) {
          setError(err?.message || 'Could not load spare parts data.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadSpares();
    return () => { ignore = true; };
  }, []);

  const filtered = query.trim()
    ? categories.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : categories;

  const filteredProducts = query.trim()
    ? products.filter((p) =>
        [p.name, p.description, p.category, p.brand, p.supplier]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query.toLowerCase()))
      )
    : products;

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
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
            )}
          </div>
          {loading && (
            <div className="spares-loading">
              <p>Loading spares from Supabase…</p>
            </div>
          )}
          {error && (
            <div className="spares-error">
              <p>{error}</p>
            </div>
          )}
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
            {filtered.length > 0 ? filtered.map((c) => (
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

      {/* PARTS LIST */}
      <section className="products-section">
        <div className="section-inner">
          <div className="reveal-up" ref={useReveal()}>
            <span className="section-tag">AVAILABLE PARTS</span>
            <h2 className="section-title">Browse live parts inventory</h2>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading parts from Supabase…</p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <p>{error}</p>
            </div>
          ) : (
            <div className="products-grid reveal-up" ref={useReveal()}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  {product.brand && <span className="product-badge">{product.brand}</span>}
                  <div
                    className="product-img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="product-info">
                    <span className="product-cat">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      {product.updatedAt && (
                        <span className="product-date">
                          Updated {new Intl.DateTimeFormat('en-ZA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }).format(new Date(product.updatedAt))}
                        </span>
                      )}
                    </div>
                    <div className="product-actions">
                      <Link to="/contact" className="btn-sm">Enquire</Link>
                      {product.url && (
                        <a href={product.url} target="_blank" rel="noreferrer" className="btn-ghost">
                          View source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>No matching parts found for "<strong>{query}</strong>".</p>
            </div>
          )}
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
            {brands.map((b) => (
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
