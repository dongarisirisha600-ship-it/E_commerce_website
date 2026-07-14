import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin@example.com' && password === 'Admin@123!') {
      onLogin({ username: 'admin@example.com', displayName: 'Admin' });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
      <h2 style={{ marginTop: 0, color: '#d62828' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.8rem', maxWidth: '420px' }}>
        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Email" style={inputStyle} />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" style={inputStyle} />
        <button type="submit" style={{ border: 'none', background: '#d62828', color: '#fff', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Login</button>
        {error && <div style={{ color: '#dc2626', fontWeight: '600' }}>{error}</div>}
      </form>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.72rem 0.8rem',
  borderRadius: '10px',
  border: '1px solid #ffd1dc',
  boxSizing: 'border-box',
};

export default Login;
