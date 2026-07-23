import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/services/api.js');
const source = readFileSync(filePath, 'utf8');

test('api service uses a relative base URL for local development', () => {
  assert.match(source, /const apiBaseUrl = \(import\.meta\.env\?\.VITE_API_URL \|\| ''\)\.trim\(\) \|\| '\/api';/);
});
