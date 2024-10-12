import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
}

export function toDictionary<T>(
  rows: T[],
  select: (r: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  rows.forEach((r) => {
    result[select(r)] = r;
  });
  return result;
}

export function toDictionaryList<T>(
  rows: T[],
  select: (r: T) => string
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  rows.forEach((r) => {
    const key = select(r);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(r);
  });
  return result;
}
