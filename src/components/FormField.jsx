import React from 'react';

function FormField({ label, name, value, onChange, error, type = 'text', options = [] }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>{label}</label>
      {type === 'select' ? (
        <select name={name} value={value} onChange={onChange} style={inputStyle}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} style={inputStyle} />
      )}
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

export default FormField;
