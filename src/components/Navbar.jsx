import React from 'react';

function Navbar({ title, subtitle }) {
  return (
    <header style={{ background: 'linear-gradient(90deg, #ff4d6d 0%, #d62828 100%)', color: '#fff', padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '700' }}>MegaMart</p>
          <h1 style={{ margin: '0.25rem 0 0', fontSize: '1.6rem' }}>{title}</h1>
          <p style={{ margin: '0.2rem 0 0', opacity: 0.9 }}>{subtitle}</p>
        </div>
        <nav style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <a href="#home" style={navLinkStyle}>Home</a>
          <a href="#dashboard" style={navLinkStyle}>Dashboard</a>
          <a href="#register" style={navLinkStyle}>Register</a>
        </nav>
      </div>
    </header>
  );
}

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '600',
};

export default Navbar;
