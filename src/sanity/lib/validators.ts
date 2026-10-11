import type { SlugValue } from "sanity";

// Zero-width spaces, joiners, BOM, soft hyphens… often left behind by AI copy-paste.
const INVISIBLE_UNICODE = /[­​-‏‪-‮⁠-⁤﻿]/;

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateKebabSlug(slug: SlugValue | undefined) {
  if (!slug?.current) return true;
  return KEBAB_CASE.test(slug.current) || "Slug en kebab-case : minuscules, chiffres et tirets.";
}

/** Character-count range check, reported as a warning so imports never get blocked. */
export function lengthRange(min: number, max: number) {
  return (value: string | undefined) => {
    if (!value) return true;
    const n = value.trim().length;
    if (n < min || n > max) return `${n} caractères — viser ${min}–${max}.`;
    return true;
  };
}

function findInvisible(value: unknown, path: string): string | null {
  if (typeof value === "string") return INVISIBLE_UNICODE.test(value) ? path : null;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const hit = findInvisible(value[i], `${path}[${i}]`);
      if (hit) return hit;
    }
    return null;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key.startsWith("_")) continue;
      const hit = findInvisible(child, path ? `${path}.${key}` : key);
      if (hit) return hit;
    }
  }
  return null;
}

export function validateNoInvisibleUnicode(doc: unknown) {
  const hit = findInvisible(doc, "");
  return hit ? `Caractères Unicode invisibles détectés dans « ${hit} ».` : true;
}
