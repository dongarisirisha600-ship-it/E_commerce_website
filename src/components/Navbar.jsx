import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ brand, links, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand">{brand}</div>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {link.label}
          </NavLink>
        ))}
        {user ? (
          <>
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
