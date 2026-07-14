import React from 'react';

function Button({ label, onClick, variant = 'primary', type = 'button' }) {
  const styles = {
    primary: { background: '#d62828', color: '#fff' },
    secondary: { background: '#fff', color: '#d62828', border: '1px solid #ffb3c1' },
  };

  return (
    <button type={type} onClick={onClick} style={{ ...styles[variant], padding: '0.7rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
      {label}
    </button>
  );
}

export default Button;
