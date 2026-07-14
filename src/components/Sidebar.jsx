import React from 'react';

function Sidebar({ links }) {
  return (
    <aside style={{ background: '#fff5f8', borderRight: '1px solid #ffd6e0', padding: '1rem', minWidth: '220px' }}>
      <h3 style={{ marginTop: 0, color: '#d62828' }}>Quick Links</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
