import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
      <h2 style={{ marginTop: 0, color: '#d62828' }}>About This Project</h2>
      <p style={{ lineHeight: 1.7 }}>This application demonstrates React Router concepts such as BrowserRouter, Routes, Link, NavLink, nested routes, dynamic routing, and programmatic navigation.</p>
      <Link to="/dashboard" style={{ color: '#d62828', fontWeight: '700' }}>Visit the dashboard</Link>
    </section>
  );
}

export default About;
