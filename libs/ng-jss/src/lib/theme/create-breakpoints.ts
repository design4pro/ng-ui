import { IThemeBreakpoints } from '../types';

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['s', 'm', 'l', 'x'];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(
  breakpoints: IThemeBreakpoints
): IThemeBreakpoints {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint s: [s, m[.
    values = {
      s: 0,
      m: 700,
      l: 1100,
      x: 1500,
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints;

  function up(key: string | number) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: string | number) {
    const endIndex = keys.indexOf(<string>key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // x down applies to all sizes
      return up('s');
    }

    const value =
      typeof upperbound === 'number' && endIndex > 0 ? upperbound : <number>key;

    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: string | number, end: string | number) {
    const endIndex = keys.indexOf(<string>end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${
        typeof values[start] === 'number' ? values[start] : <number>start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 && typeof values[keys[endIndex + 1]] === 'number'
          ? values[keys[endIndex + 1]]
          : <number>end) -
        step / 100
      }${unit})`
    );
  }

  function only(key: string | number) {
    return between(key, key);
  }

  function width(key: string) {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...other,
  };
}
