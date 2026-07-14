import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout({ auth, theme, onToggleTheme, onLogout }) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  if (!auth?.isLoggedIn) {
    links.push({ to: '/login', label: 'Login' });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme === 'dark' ? '#1b1f24' : '#fffafc',
        color: theme === 'dark' ? '#e6e8eb' : '#6b1f2b',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header style={{ background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #ff4d6d 0%, #d62828 100%)', color: '#fff', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '700' }}>MegaMart</p>
            <h1 style={{ margin: '0.25rem 0 0', fontSize: '1.6rem' }}>React Router MegaMart App</h1>
          </div>
          <nav style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
            <button
              onClick={onToggleTheme}
              style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#fff', borderRadius: '999px', padding: '0.6rem 0.9rem', cursor: 'pointer' }}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>
            {auth?.isLoggedIn && (
              <button
                onClick={onLogout}
                style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#fff', borderRadius: '999px', padding: '0.6rem 0.9rem', cursor: 'pointer' }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
