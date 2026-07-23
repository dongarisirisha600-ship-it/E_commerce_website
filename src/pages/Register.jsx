import { useState } from 'react';
import './Register.css';

const initialFormData = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  preferredCategory: '',
  acceptedTerms: false
};

function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
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
    if (!formData.address.trim()) nextErrors.address = 'Address is required.';
    if (!formData.city.trim()) nextErrors.city = 'City is required.';
    if (!formData.state.trim()) nextErrors.state = 'State is required.';
    if (!formData.pincode.trim()) nextErrors.pincode = 'Pincode is required.';
    if (!formData.preferredCategory) nextErrors.preferredCategory = 'Please select a shopping preference.';
    if (!formData.acceptedTerms) nextErrors.acceptedTerms = 'You must accept the terms and conditions.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      setMessage('Please correct the highlighted fields.');
      return;
    }

    setSubmitted(true);
    setMessage('Customer registration successful. Your account is ready for shopping.');
    setFormData(initialFormData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
    setMessage('');
  };

  return (
    <section className="register-page">
      <h2>Customer Registration</h2>
      <p>Enter your details to create a customer account with MegaMart.</p>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>
            Full Name
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
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
            Address
            <input name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>

          <label>
            City
            <input name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <span className="error">{errors.city}</span>}
          </label>

          <label>
            State
            <input name="state" value={formData.state} onChange={handleChange} />
            {errors.state && <span className="error">{errors.state}</span>}
          </label>

          <label>
            Pincode
            <input name="pincode" value={formData.pincode} onChange={handleChange} />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </label>

          <label>
            Preferred Category
            <select name="preferredCategory" value={formData.preferredCategory} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.preferredCategory && <span className="error">{errors.preferredCategory}</span>}
          </label>
        </div>

        <label className="checkbox-row">
          <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />
          I accept the terms and conditions.
        </label>
        {errors.acceptedTerms && <span className="error">{errors.acceptedTerms}</span>}

        <div className="actions">
          <button type="submit">Register</button>
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
