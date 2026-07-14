import React from 'react';

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: '0.7rem' }}>
      <h2 style={{ margin: '0 0 0.25rem', color: '#d62828' }}>{title}</h2>
      {subtitle && <p style={{ margin: 0, color: '#7a1e1e', lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;
