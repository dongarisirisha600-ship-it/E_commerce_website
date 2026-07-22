import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { writeStoredValue, readStoredValue } from '../utils/storage';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(() => ({
    email: readStoredValue('rememberedEmail', ''),
    password: ''
  }));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(readStoredValue('rememberedEmail', '')));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const userData = response.data.user;
      writeStoredValue('authUser', userData);
      if (rememberMe) {
        writeStoredValue('rememberedEmail', formData.email);
      } else {
        writeStoredValue('rememberedEmail', '');
      }
      onLogin(userData);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register-page">
      <h2>Login</h2>
      <p>Sign in to access the dashboard.</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} />
            <button type="button" className="secondary" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
        </label>
        <label className="checkbox-row">
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)} />
          Remember me
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
