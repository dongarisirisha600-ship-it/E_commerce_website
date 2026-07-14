import React from 'react';

function PasswordField({ label, name, value, onChange, error, show, setShow }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input name={name} type={show ? 'text' : 'password'} value={value} onChange={onChange} style={{ ...inputStyle, paddingRight: '80px' }} />
        <button type="button" onClick={() => setShow((current) => !current)} style={toggleButtonStyle}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <small style={{ color: '#dc2626', display: 'block', marginTop: '0.25rem' }}>{error}</small>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.72rem 0.8rem',
  borderRadius: '10px',
  border: '1px solid #ffd1dc',
  boxSizing: 'border-box',
};

const toggleButtonStyle = {
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  border: 'none',
  background: '#ffe4ea',
  color: '#d62828',
  padding: '0.3rem 0.55rem',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default PasswordField;
