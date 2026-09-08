/** Detects unfilled placeholder values so the UI can hide them gracefully. */
export function isTodo(value: string | undefined | null): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed === '' || trimmed.startsWith('TODO_');
}

/** Returns the value only if it is real (not a TODO_ placeholder). */
export function realOr<T>(value: string | undefined, fallback: T): string | T {
  return isTodo(value) ? fallback : (value as string);
}
