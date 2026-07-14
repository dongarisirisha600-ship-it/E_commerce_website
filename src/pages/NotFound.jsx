import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1.5rem', border: '1px solid #ffd6e0', textAlign: 'center' }}>
      <h2 style={{ marginTop: 0, color: '#d62828' }}>404 - Page Not Found</h2>
      <p style={{ lineHeight: 1.7 }}>The page you are looking for does not exist. Please return home and continue exploring the portal.</p>
      <Link to="/" style={{ color: '#d62828', fontWeight: '700' }}>Return to Home</Link>
    </section>
  );
}

export default NotFound;
