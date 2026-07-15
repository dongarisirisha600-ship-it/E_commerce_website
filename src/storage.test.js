import test from 'node:test';
import assert from 'node:assert/strict';
import { readSessionValue, readStoredItems, readStoredValue, syncStoredList, writeSessionValue, writeStoredValue } from './storage.js';

function createLocalStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

test('syncStoredList keeps recent items unique and limited', () => {
  const storage = createLocalStorage();
  globalThis.window = { localStorage: storage };

  const updated = syncStoredList('recentlyViewed', { id: 1, title: 'Laptop' }, 3);

  assert.equal(updated.length, 1);
  assert.equal(updated[0].title, 'Laptop');

  syncStoredList('recentlyViewed', { id: 2, title: 'Phone' }, 3);
  syncStoredList('recentlyViewed', { id: 1, title: 'Laptop' }, 3);
  syncStoredList('recentlyViewed', { id: 3, title: 'Headphones' }, 3);

  const finalItems = readStoredItems('recentlyViewed', []);
  assert.equal(finalItems.length, 3);
  assert.deepEqual(finalItems.map((item) => item.id), [3, 1, 2]);
});

test('readStoredItems falls back to a default array', () => {
  const storage = createLocalStorage();
  globalThis.window = { localStorage: storage };

  const items = readStoredItems('favorites', []);
  assert.deepEqual(items, []);
});

test('readStoredValue and writeStoredValue persist arbitrary data', () => {
  const storage = createLocalStorage();
  globalThis.window = { localStorage: storage };

  writeStoredValue('theme', 'dark');
  const loadedTheme = readStoredValue('theme', 'light');

  assert.equal(loadedTheme, 'dark');
});

test('readSessionValue and writeSessionValue persist current-session data', () => {
  const storage = createLocalStorage();
  globalThis.window = { localStorage: storage, sessionStorage: storage };

  writeSessionValue('lastVisited', '/dashboard');
  const visited = readSessionValue('lastVisited', '/');

  assert.equal(visited, '/dashboard');
});
