import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user?.name || 'Guest'}.</p>
      <div className="actions" style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button className="secondary" onClick={onLogout}>Logout</button>
      </div>

      <nav className="nav-links" style={{ marginBottom: '1rem' }}>
        <NavLink to="/dashboard/overview" className="nav-link">Overview</NavLink>
        <NavLink to="/dashboard/profile" className="nav-link">Profile</NavLink>
        <NavLink to="/dashboard/settings" className="nav-link">Settings</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

export default Dashboard;
