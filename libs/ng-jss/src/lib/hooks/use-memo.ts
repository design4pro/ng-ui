import * as nanomemoize from 'nano-memoize';

export function useMemo<T = any>(create: () => T, ...args: any): T {
  return nanomemoize(create)(args);
}

export default useMemo;