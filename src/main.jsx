import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { validateRegistrationForm } from './registrationValidation';

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

function App() {
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f8 0%, #ffe4ea 100%)', fontFamily: 'Arial, sans-serif', color: '#6b1f2b', padding: '1.25rem' }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto', background: 'rgba(255,255,255,0.96)', borderRadius: '24px', boxShadow: '0 18px 45px rgba(0, 0, 0, 0.12)', overflow: 'hidden' }}>
        <header style={{ background: 'linear-gradient(90deg, #ff4d6d 0%, #d62828 100%)', color: '#fff', padding: '2rem' }}>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '700' }}>Student Registration Portal</p>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem' }}>Create your student account</h1>
          <p style={{ margin: 0, lineHeight: 1.6, maxWidth: '680px' }}>Register with a polished, validated form that collects academic and profile details with a smooth success experience.</p>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1.25rem', padding: '1.25rem' }}>
          <section style={{ background: '#fff5f8', borderRadius: '18px', padding: '1rem', border: '1px solid #ffd6e0' }}>
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
          </section>

          <aside style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>What this page covers</h3>
              <ul style={{ margin: '0', paddingLeft: '1rem', lineHeight: 1.7 }}>
                <li>Controlled state with React hooks</li>
                <li>onChange, onSubmit, and onClick events</li>
                <li>Client-side validation for email, password, mobile, and terms</li>
                <li>Success state and form clearing</li>
                <li>Bonus: show/hide password and password strength</li>
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
