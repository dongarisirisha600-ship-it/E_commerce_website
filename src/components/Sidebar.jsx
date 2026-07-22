import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      <h3>Explore</h3>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
