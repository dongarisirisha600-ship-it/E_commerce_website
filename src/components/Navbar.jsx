import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ brand, links, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (location.pathname.startsWith('/products')) {
      const params = new URLSearchParams(location.search);
      setSearchText(params.get('search') || '');
    }
  }, [location.pathname, location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="navbar">
      <div className="brand">{brand}</div>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {link.label}
          </NavLink>
        ))}
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search products"
          />
        </form>
        {user ? (
          <>
            {user.profileImage ? <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="profile-pill" /> : null}
            <NavLink to="/dashboard/overview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
            <button className="nav-link" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
