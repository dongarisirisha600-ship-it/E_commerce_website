import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLoginForm } from './loginValidation.js';

test('rejects incomplete login details', () => {
  const result = validateLoginForm({ username: '', password: '' });

  assert.equal(result.isValid, false);
  assert.match(result.errors.username, /required/i);
  assert.match(result.errors.password, /required/i);
});

test('accepts complete login details', () => {
  const result = validateLoginForm({ username: 'admin@example.com', password: 'Admin@123!' });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('rejects invalid credentials', () => {
  const result = validateLoginForm({ username: 'wrong@example.com', password: 'Wrong@123!' });

  assert.equal(result.isValid, false);
  assert.match(result.errors.credentials, /invalid credentials/i);
});
