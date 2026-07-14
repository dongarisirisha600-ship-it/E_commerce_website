import React from 'react';

function Card({ title, description, badge }) {
  return (
    <div style={{ background: '#fff', borderRadius: '14px', padding: '1rem', border: '1px solid #ffd6e0' }}>
      <div style={{ color: '#d62828', fontWeight: '700', marginBottom: '0.3rem' }}>{badge}</div>
      <h3 style={{ margin: '0 0 0.4rem', color: '#6b1f2b' }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

export default Card;
