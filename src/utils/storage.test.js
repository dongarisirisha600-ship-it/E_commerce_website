import test from 'node:test';
import assert from 'node:assert/strict';
import { readStoredValue, writeStoredValue, addToStoredList } from './storage.js';

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }
}

test('readStoredValue returns fallback when no entry exists', () => {
  globalThis.localStorage = new MemoryStorage();
  assert.deepEqual(readStoredValue('missing', { theme: 'light' }), { theme: 'light' });
});

test('writeStoredValue and readStoredValue round-trip values', () => {
  globalThis.localStorage = new MemoryStorage();
  writeStoredValue('user', { name: 'Ava' });
  assert.deepEqual(readStoredValue('user', null), { name: 'Ava' });
});

test('addToStoredList keeps a capped list of recently viewed items', () => {
  globalThis.localStorage = new MemoryStorage();
  addToStoredList('recentlyViewed', { id: 1, title: 'Item 1' });
  addToStoredList('recentlyViewed', { id: 2, title: 'Item 2' });
  addToStoredList('recentlyViewed', { id: 3, title: 'Item 3' });
  addToStoredList('recentlyViewed', { id: 4, title: 'Item 4' });
  const stored = readStoredValue('recentlyViewed', []);
  assert.equal(stored.length, 4);
  assert.equal(stored[0].id, 4);
});
