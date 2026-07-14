export function readStoredItems(key, fallback = []) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) {
      return fallback;
    }

    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredItems(key, items) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(items));
}

export function readStoredValue(key, fallback = null) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStoredValue(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readSessionValue(key, fallback = null) {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return fallback;
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeSessionValue(key, value) {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return;
  }

  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function syncStoredList(key, value, maxItems = 6) {
  const items = readStoredItems(key, []);
  const filtered = items.filter((item) => item.id !== value.id);
  const nextItems = [value, ...filtered].slice(0, maxItems);
  writeStoredItems(key, nextItems);
  return nextItems;
}
