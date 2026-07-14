import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
      <h2 style={{ marginTop: 0, color: '#d62828' }}>Welcome to the Customer Portal</h2>
      <p style={{ lineHeight: 1.7 }}>This version of the app is now built as a multi-page React experience using React Router DOM.</p>
      <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
        <Link to="/about" style={{ color: '#d62828', fontWeight: '700' }}>Learn more</Link>
        <Link to="/dashboard" style={{ color: '#d62828', fontWeight: '700' }}>Open dashboard</Link>
      </div>
    </section>
  );
}

export default Home;
