import { describe, expect, it } from 'vitest';
import { isTodo, realOr } from './isTodo';

describe('isTodo', () => {
  it('treats TODO_ placeholders and empty values as unfilled', () => {
    expect(isTodo('TODO_GITHUB_URL')).toBe(true);
    expect(isTodo('')).toBe(true);
    expect(isTodo(undefined)).toBe(true);
    expect(isTodo('   ')).toBe(true);
  });

  it('treats real values as filled', () => {
    expect(isTodo('https://github.com/pedro')).toBe(false);
    expect(isTodo('Pedro Campos')).toBe(false);
  });

  it('realOr returns fallback for placeholders', () => {
    expect(realOr('TODO_X', 'fallback')).toBe('fallback');
    expect(realOr('real', 'fallback')).toBe('real');
  });
});
