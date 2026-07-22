export function readStoredValue(key, fallback) {
  const storage = typeof window !== 'undefined' ? window.localStorage : globalThis.localStorage;
  if (!storage) return fallback;

  const stored = storage.getItem(key);
  if (!stored) return fallback;

  try {
    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

export function writeStoredValue(key, value) {
  const storage = typeof window !== 'undefined' ? window.localStorage : globalThis.localStorage;
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

export function addToStoredList(key, value, limit = 5) {
  const existing = readStoredValue(key, []);
  const nextEntries = [value, ...existing.filter((item) => JSON.stringify(item) !== JSON.stringify(value))].slice(0, limit);
  writeStoredValue(key, nextEntries);
  return nextEntries;
}
