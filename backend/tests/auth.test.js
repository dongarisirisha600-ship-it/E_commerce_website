import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';

const run = async () => {
  const password = 'Secure@123';
  const hash = await bcrypt.hash(password, 10);
  const isMatch = await bcrypt.compare(password, hash);
  assert.equal(isMatch, true);
  console.log('bcrypt password hashing verified');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
