// Browser-only helpers. Storage can throw (private mode, blocked cookies), so every call is guarded.

export function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export const LEVEL_KEY = "sbl:level";
export const SKILLS_KEY = "sbl:skills";
