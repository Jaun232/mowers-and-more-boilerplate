// Logo component — precise SVG recreation of the Mowers & More logo
// To use the actual PNG instead, replace with: <img src="/logo.png" height={height} alt="Mowers and More" />

const Logo = ({ height = 58, className = '' }) => (
  <img
    src="/mowerslogo.png"
    height={height}
    className={className}
    alt="Mowers and More — Repairs, Sales, Service"
    style={{ display: 'block', height: height, width: 'auto', objectFit: 'contain' }}
  />
);

export default Logo;

