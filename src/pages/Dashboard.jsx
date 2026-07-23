import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        {user?.profileImage ? <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="profile-preview" /> : null}
        <div>
          <p style={{ margin: 0 }}>Welcome back, {user?.name || 'Guest'}.</p>
          <p style={{ margin: 0, color: '#4b5563' }}>Role: {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Customer'}</p>
        </div>
      </div>
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
