export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.username?.trim()) {
    errors.username = 'Email or username is required.';
  }

  if (!values.password?.trim()) {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
