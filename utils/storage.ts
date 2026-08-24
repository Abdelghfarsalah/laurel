export function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.warn(`Unable to read "${key}" from storage`, error);
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to write "${key}" to storage`, error);
  }
}

export function readString(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read "${key}" from storage`, error);
    return null;
  }
}

export function writeString(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to write "${key}" to storage`, error);
  }
}
