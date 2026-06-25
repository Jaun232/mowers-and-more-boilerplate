// Logo component — image-based brand mark with updated alt text.
const Logo = ({ height = 58, className = '' }) => (
  <img
    src="/mowerslogo.png"
    height={height}
    className={className}
    alt="Mowers & More — Repairs, Sales, Service"
    style={{ display: 'block', height: height, width: 'auto', objectFit: 'contain' }}
  />
);

export default Logo;

