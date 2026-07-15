import './Navbar.css';

function Navbar({ brand, links, onNavigate, activePage }) {
  return (
    <header className="navbar">
      <div className="brand">{brand}</div>
      <nav className="nav-links">
        {links.map((link) => (
          <button
            key={link}
            className={`nav-link ${activePage === link.toLowerCase() ? 'active' : ''}`}
            onClick={() => onNavigate(link.toLowerCase())}
          >
            {link}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
