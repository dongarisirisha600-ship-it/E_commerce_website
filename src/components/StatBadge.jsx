import React from 'react';

function StatBadge({ label, value }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem', border: '1px solid #ffd6e0', minWidth: '120px' }}>
      <div style={{ fontSize: '0.8rem', color: '#7a1e1e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#d62828', marginTop: '0.2rem' }}>{value}</div>
    </div>
  );
}

export default StatBadge;
