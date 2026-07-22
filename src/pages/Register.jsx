import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Register.css';

const initialFormData = {
  name: '',
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
  acceptedTerms: false,
  profileImage: null
};

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'file' && files?.[0]) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';

    if (!formData.mobile.trim()) nextErrors.mobile = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(formData.mobile)) nextErrors.mobile = 'Mobile number must be exactly 10 digits.';

    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(formData.password)) {
      nextErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
    }

    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = 'Passwords do not match.';

    if (!formData.gender) nextErrors.gender = 'Please select gender.';
    if (!formData.dob) nextErrors.dob = 'Date of birth is required.';
    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College name is required.';
    if (!formData.branch.trim()) nextErrors.branch = 'Branch is required.';
    if (!formData.graduationYear) nextErrors.graduationYear = 'Graduation year is required.';
    if (!formData.skills.trim()) nextErrors.skills = 'Please enter your skills.';
    if (!formData.acceptedTerms) nextErrors.acceptedTerms = 'You must accept the terms and conditions.';

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      setMessage('');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('collegeName', formData.collegeName);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('graduationYear', formData.graduationYear);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('acceptedTerms', formData.acceptedTerms ? 'true' : 'false');
      if (formData.profileImage) formDataToSend.append('profileImage', formData.profileImage);

      const response = await api.post('/auth/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSubmitted(true);
      setMessage(response.data.message || 'Registration successful.');
      setFormData(initialFormData);
      setPreviewImage('');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setSubmitted(false);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
    setMessage('');
    setPreviewImage('');
  };

  return (
    <section className="register-page">
      <h2>Student Registration</h2>
      <p>Fill in your details to register for the portal.</p>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>
            Full Name
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email Address
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Mobile Number
            <input name="mobile" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </label>

          <label>
            Password
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>

          <label>
            Confirm Password
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </label>

          <label>
            Gender
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </label>

          <label>
            Date of Birth
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </label>

          <label>
            College Name
            <input name="collegeName" value={formData.collegeName} onChange={handleChange} />
            {errors.collegeName && <span className="error">{errors.collegeName}</span>}
          </label>

          <label>
            Branch
            <input name="branch" value={formData.branch} onChange={handleChange} />
            {errors.branch && <span className="error">{errors.branch}</span>}
          </label>

          <label>
            Graduation Year
            <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
            {errors.graduationYear && <span className="error">{errors.graduationYear}</span>}
          </label>

          <label>
            Skills
            <input name="skills" value={formData.skills} onChange={handleChange} />
            {errors.skills && <span className="error">{errors.skills}</span>}
          </label>

          <label>
            Profile Image
            <input type="file" accept="image/*" name="profileImage" onChange={handleChange} />
            {previewImage && <img src={previewImage} alt="Preview" className="profile-preview" />}
          </label>
        </div>

        <label className="checkbox-row">
          <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />
          I accept the terms and conditions.
        </label>
        {errors.acceptedTerms && <span className="error">{errors.acceptedTerms}</span>}

        <div className="actions">
          <button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
          <button type="button" className="secondary" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {message && (
        <div className={submitted ? 'success-box' : 'error-box'}>
          <h3>{submitted ? 'Registration Successful!' : 'Registration Issue'}</h3>
          <p>{message}</p>
        </div>
      )}
    </section>
  );
}

export default Register;
