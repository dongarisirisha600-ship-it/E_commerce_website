import './Sidebar.css';

function Sidebar({ links, onNavigate, activePage }) {
  return (
    <aside className="sidebar">
      <h3>Explore</h3>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <button
              className={`sidebar-link ${activePage === link.toLowerCase() ? 'active' : ''}`}
              onClick={() => onNavigate(link.toLowerCase())}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
