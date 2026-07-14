import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { validateRegistrationForm } from './registrationValidation';
import { validateLoginForm } from './loginValidation';

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  collegeName: '',
  branch: '',
  graduationYear: '',
  skills: '',
  resumeName: '',
  acceptTerms: false,
};

const passwordStrength = (password) => {
  if (!password) {
    return { label: '', strength: 0, color: '#cbd5e1' };
  }

  const checks = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
  const score = checks.filter((rule) => rule.test(password)).length;

  if (score <= 2) {
    return { label: 'Weak', strength: 33, color: '#dc2626' };
  }

  if (score === 3) {
    return { label: 'Medium', strength: 66, color: '#f59e0b' };
  }

  return { label: 'Strong', strength: 100, color: '#16a34a' };
};

const initialStudents = [
  { id: 1, fullName: 'Asha Reddy', email: 'asha@example.com', branch: 'CSE', graduationYear: '2026', skills: 'React, UI/UX' },
  { id: 2, fullName: 'Kiran Rao', email: 'kiran@example.com', branch: 'ECE', graduationYear: '2027', skills: 'JavaScript, Node.js' },
  { id: 3, fullName: 'Nikhil Verma', email: 'nikhil@example.com', branch: 'MECH', graduationYear: '2028', skills: 'Python, Data Science' },
];

function App() {
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('idle');
  const [loginMessage, setLoginMessage] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleResumeUpload = (event) => {
    const fileName = event.target.files?.[0]?.name || '';
    setFormData((current) => ({ ...current, resumeName: fileName }));
    setErrors((current) => ({ ...current, resumeName: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateRegistrationForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSuccessMessage('');
      return;
    }

    setErrors({});
    setSubmittedDetails({
      ...formData,
      resumeName: formData.resumeName || 'No resume selected',
    });
    setSuccessMessage(`Registration successful for ${formData.fullName}!`);
    setFormData({ ...initialForm });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleReset = () => {
    setFormData({ ...initialForm });
    setErrors({});
    setSuccessMessage('');
    setSubmittedDetails(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const strength = passwordStrength(formData.password);

  const filteredStudents = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    const base = [...students].filter((student) => {
      const fullText = `${student.fullName} ${student.email} ${student.branch} ${student.graduationYear}`.toLowerCase();
      return fullText.includes(normalized);
    });

    if (sortBy === 'name') {
      return base.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }

    if (sortBy === 'year') {
      return base.sort((a, b) => Number(a.graduationYear) - Number(b.graduationYear));
    }

    return base;
  }, [searchTerm, sortBy, students]);

  useEffect(() => {
    if (loginStatus !== 'loading') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (loginData.username === 'admin@example.com' && loginData.password === 'Admin@123!') {
        setLoginStatus('success');
        setLoginMessage('Welcome back! You are logged in successfully.');
      } else {
        setLoginStatus('error');
        setLoginMessage('Invalid credentials. Please try again.');
      }
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [loginData.password, loginData.username, loginStatus]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((current) => ({ ...current, [name]: value }));
    setLoginErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const validation = validateLoginForm(loginData);

    if (!validation.isValid) {
      setLoginErrors(validation.errors);
      setLoginStatus('idle');
      setLoginMessage('');
      return;
    }

    setLoginErrors({});
    setLoginStatus('loading');
    setLoginMessage('');
  };

  const handleLoginReset = () => {
    setLoginData({ username: '', password: '' });
    setLoginErrors({});
    setLoginStatus('idle');
    setLoginMessage('');
    setShowLoginPassword(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f8 0%, #ffe4ea 100%)', fontFamily: 'Arial, sans-serif', color: '#6b1f2b', padding: '1.25rem' }}>
      <div style={{ maxWidth: '1250px', margin: '0 auto', background: 'rgba(255,255,255,0.96)', borderRadius: '24px', boxShadow: '0 18px 45px rgba(0, 0, 0, 0.12)', overflow: 'hidden' }}>
        <header style={{ background: 'linear-gradient(90deg, #ff4d6d 0%, #d62828 100%)', color: '#fff', padding: '2rem' }}>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '700' }}>Student Registration Portal</p>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem' }}>Student dashboard with login and dynamic listings</h1>
          <p style={{ margin: 0, lineHeight: 1.6, maxWidth: '780px' }}>This experience now combines registration, secure login, loading feedback, empty states, and dynamic cards and tables for stored student records.</p>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem', padding: '1.25rem' }}>
          <section style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#fff5f8', borderRadius: '18px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h2 style={{ marginTop: 0, color: '#d62828' }}>Login Page</h2>
              <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Email / Username</label>
                  <input name="username" value={loginData.username} onChange={handleLoginChange} placeholder="admin@example.com" style={inputStyle} />
                  {loginErrors.username && <small style={errorStyle}>{loginErrors.username}</small>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input name="password" type={showLoginPassword ? 'text' : 'password'} value={loginData.password} onChange={handleLoginChange} placeholder="Enter password" style={{ ...inputStyle, paddingRight: '90px' }} />
                    <button type="button" onClick={() => setShowLoginPassword((current) => !current)} style={toggleButtonStyle}>{showLoginPassword ? 'Hide' : 'Show'}</button>
                  </div>
                  {loginErrors.password && <small style={errorStyle}>{loginErrors.password}</small>}
                </div>
                <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                  <button type="submit" disabled={loginStatus === 'loading'} style={{ border: 'none', background: loginStatus === 'loading' ? '#ffb3c1' : '#d62828', color: '#fff', padding: '0.75rem 1rem', borderRadius: '10px', cursor: loginStatus === 'loading' ? 'wait' : 'pointer', fontWeight: '700' }}>
                    {loginStatus === 'loading' ? 'Logging in...' : 'Login'}
                  </button>
                  <button type="button" onClick={handleLoginReset} style={{ border: '1px solid #ffb3c1', background: '#fff', color: '#d62828', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Clear</button>
                </div>
                <div style={{ fontSize: '0.95rem', color: '#7a1e1e' }}>
                  <span>Forgot Password?</span> <span style={{ color: '#d62828', fontWeight: '600' }}>UI Only</span>
                </div>
                {loginStatus === 'loading' && <div style={{ color: '#d62828', fontWeight: '600' }}>Loading your session...</div>}
                {loginStatus === 'success' && loginMessage && <div style={{ color: '#15803d', fontWeight: '600' }}>{loginMessage}</div>}
                {loginStatus === 'error' && loginMessage && <div style={{ color: '#dc2626', fontWeight: '600' }}>{loginMessage}</div>}
              </form>
            </div>

            <div style={{ background: '#fff5f8', borderRadius: '18px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h2 style={{ marginTop: 0, color: '#d62828' }}>Registration Form</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" style={inputStyle} />
                  {errors.fullName && <small style={errorStyle}>{errors.fullName}</small>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Email Address</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" style={inputStyle} />
                  {errors.email && <small style={errorStyle}>{errors.email}</small>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Mobile Number</label>
                  <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="9876543210" maxLength="10" style={inputStyle} />
                  {errors.mobile && <small style={errorStyle}>{errors.mobile}</small>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                    <option value="">Select gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Date of Birth</label>
                  <input name="dob" type="date" value={formData.dob} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>College Name</label>
                  <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="Enter college name" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Branch</label>
                  <input name="branch" value={formData.branch} onChange={handleChange} placeholder="CSE / ECE / MECH" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Graduation Year</label>
                  <select name="graduationYear" value={formData.graduationYear} onChange={handleChange} style={inputStyle}>
                    <option value="">Select year</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a strong password" style={{ ...inputStyle, paddingRight: '90px' }} />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} style={toggleButtonStyle}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                {formData.password && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <div style={{ height: '8px', borderRadius: '999px', background: '#f2d9e0', overflow: 'hidden' }}>
                      <div style={{ width: `${strength.strength}%`, height: '100%', background: strength.color, transition: 'width 0.2s ease' }} />
                    </div>
                    <small style={{ color: strength.color, fontWeight: '600' }}>{strength.label || 'Password strength'}</small>
                  </div>
                )}
                {errors.password && <small style={errorStyle}>{errors.password}</small>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" style={{ ...inputStyle, paddingRight: '90px' }} />
                  <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} style={toggleButtonStyle}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
                </div>
                {errors.confirmPassword && <small style={errorStyle}>{errors.confirmPassword}</small>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Skills</label>
                <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="React, JavaScript, UI/UX" rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Resume Upload</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ width: '100%', padding: '0.6rem 0.7rem', borderRadius: '10px', border: '1px solid #ffd1dc', background: '#fff' }} />
                {formData.resumeName && <small style={{ color: '#d62828', display: 'block', marginTop: '0.3rem' }}>Selected file: {formData.resumeName}</small>}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                <input name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} />
                Accept Terms & Conditions
              </label>
              {errors.acceptTerms && <small style={errorStyle}>{errors.acceptTerms}</small>}

              <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                <button type="submit" style={{ border: 'none', background: '#d62828', color: '#fff', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Register</button>
                <button type="button" onClick={handleReset} style={{ border: '1px solid #ffb3c1', background: '#fff', color: '#d62828', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Reset</button>
              </div>
            </form>
            </div>
          </section>

          <aside style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>What this page covers</h3>
              <ul style={{ margin: '0', paddingLeft: '1rem', lineHeight: 1.7 }}>
                <li>Conditional rendering with ternary and &&</li>
                <li>Loading state and empty state handling</li>
                <li>List rendering with map() and keys</li>
                <li>Dynamic cards and tables for student records</li>
                <li>Login success/error feedback</li>
              </ul>
            </div>

            {successMessage && (
              <div style={{ background: '#ecfdf3', borderRadius: '16px', padding: '1rem', border: '1px solid #a7f3d0' }}>
                <h3 style={{ marginTop: 0, color: '#15803d' }}>Success</h3>
                <p style={{ margin: '0 0 0.5rem', color: '#166534' }}>{successMessage}</p>
              </div>
            )}

            {submittedDetails && (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
                <h3 style={{ marginTop: 0, color: '#d62828' }}>Submitted details</h3>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> {submittedDetails.fullName}</div>
                  <div><strong>Email:</strong> {submittedDetails.email}</div>
                  <div><strong>Mobile:</strong> {submittedDetails.mobile}</div>
                  <div><strong>College:</strong> {submittedDetails.collegeName || '—'}</div>
                  <div><strong>Branch:</strong> {submittedDetails.branch || '—'}</div>
                  <div><strong>Resume:</strong> {submittedDetails.resumeName}</div>
                </div>
              </div>
            )}
          </aside>
        </main>

        <section style={{ padding: '0 1.25rem 1.25rem' }}>
          <div style={{ background: '#fff5f8', borderRadius: '18px', padding: '1rem', border: '1px solid #ffd6e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
              <h2 style={{ margin: 0, color: '#d62828' }}>Registered Student Records</h2>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search students" style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid #ffd1dc', minWidth: '220px' }} />
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid #ffd1dc' }}>
                  <option value="name">Sort by Name</option>
                  <option value="year">Sort by Year</option>
                </select>
              </div>
            </div>

            {filteredStudents.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px dashed #ffb3c1', color: '#7a1e1e' }}>
                No records found. Try a different search term.
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', marginBottom: '0.9rem' }}>
                  {filteredStudents.map((student) => (
                    <div key={student.id} style={{ background: '#fff', borderRadius: '12px', padding: '0.9rem', border: '1px solid #ffd6e0' }}>
                      <h3 style={{ margin: '0 0 0.35rem', color: '#d62828' }}>{student.fullName}</h3>
                      <p style={{ margin: '0 0 0.25rem' }}><strong>Email:</strong> {student.email}</p>
                      <p style={{ margin: '0 0 0.25rem' }}><strong>Branch:</strong> {student.branch}</p>
                      <p style={{ margin: '0 0 0.25rem' }}><strong>Graduation:</strong> {student.graduationYear}</p>
                      <p style={{ margin: 0 }}><strong>Skills:</strong> {student.skills}</p>
                    </div>
                  ))}
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
                    <thead>
                      <tr style={{ background: '#ffe4ea' }}>
                        <th style={tableCellStyle}>Name</th>
                        <th style={tableCellStyle}>Email</th>
                        <th style={tableCellStyle}>Branch</th>
                        <th style={tableCellStyle}>Graduation</th>
                        <th style={tableCellStyle}>Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td style={tableCellStyle}>{student.fullName}</td>
                          <td style={tableCellStyle}>{student.email}</td>
                          <td style={tableCellStyle}>{student.branch}</td>
                          <td style={tableCellStyle}>{student.graduationYear}</td>
                          <td style={tableCellStyle}>{student.skills}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.72rem 0.8rem',
  borderRadius: '10px',
  border: '1px solid #ffd1dc',
  boxSizing: 'border-box',
  fontSize: '0.96rem',
};

const errorStyle = {
  color: '#dc2626',
  display: 'block',
  marginTop: '0.25rem',
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

const tableCellStyle = {
  border: '1px solid #ffd6e0',
  padding: '0.7rem',
  textAlign: 'left',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
