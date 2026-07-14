export const validateRegistrationForm = (values) => {
  const errors = {};

  if (!values.fullName?.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.mobile?.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^\d{10}$/.test(values.mobile)) {
    errors.mobile = 'Mobile number must be exactly 10 digits.';
  }

  if (!values.password?.trim()) {
    errors.password = 'Password is required.';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(values.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
  }

  if (!values.confirmPassword?.trim()) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
