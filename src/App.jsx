import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header  from './components/Header';
import Footer  from './components/Footer';
import Home    from './pages/Home';
import Services from './pages/Services';
import Sales   from './pages/Sales';
import Spares  from './pages/Spares';
import Contact from './pages/Contact';
import './App.css';

// Scroll to top on every route change
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollReset />
      <Header />
      <main>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sales"    element={<Sales />} />
          <Route path="/spares"   element={<Spares />} />
          <Route path="/contact"  element={<Contact />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div className="not-found">
              <h1>404</h1>
              <p>Page not found.</p>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}