import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistrationForm } from './registrationValidation.js';

test('flags required fields and invalid formats', () => {
  const result = validateRegistrationForm({
    fullName: '',
    email: 'test@',
    mobile: '123',
    password: 'abc',
    confirmPassword: 'xyz',
    acceptTerms: false,
  });

  assert.equal(result.isValid, false);
  assert.match(result.errors.fullName, /required/i);
  assert.match(result.errors.email, /valid email/i);
  assert.match(result.errors.mobile, /10 digits/i);
  assert.match(result.errors.password, /8 characters/i);
  assert.match(result.errors.confirmPassword, /match/i);
  assert.match(result.errors.acceptTerms, /terms/i);
});

test('passes when the form data is valid', () => {
  const result = validateRegistrationForm({
    fullName: 'Asha Reddy',
    email: 'asha@example.com',
    mobile: '9876543210',
    password: 'SecurePass1!',
    confirmPassword: 'SecurePass1!',
    acceptTerms: true,
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});
