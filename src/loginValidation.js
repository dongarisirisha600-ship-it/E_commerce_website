export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.username?.trim()) {
    errors.username = 'Email or username is required.';
  }

  if (!values.password?.trim()) {
    errors.password = 'Password is required.';
  }

  const normalizedUsername = values.username?.trim().toLowerCase();
  const normalizedPassword = values.password?.trim();

  if (
    normalizedUsername &&
    normalizedPassword &&
    !(normalizedUsername === 'admin@example.com' && normalizedPassword === 'Admin@123!')
  ) {
    errors.credentials = 'Invalid credentials. Please try again.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
