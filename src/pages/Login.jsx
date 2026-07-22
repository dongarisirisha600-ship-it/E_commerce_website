import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.email === 'admin@example.com' && formData.password === 'Admin@123!') {
      onLogin({ name: 'Admin User', email: formData.email });
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } else {
      setError('Invalid credentials. Try admin@example.com / Admin@123!');
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
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
