import { IJss } from './jss/types';

export interface IThemeBreakpoints {
  keys: string[];
  values: {
    [key: string]: number;
  };
  up: (key: string) => string;
  down: (key: string) => string;
  between: (key: string) => string;
  only: (key: string) => string;
  width: (key: string) => string;
  unit?: string;
  step?: number;
}

export namespace INgJss {
  export interface Options extends IJss.Options {
    normalize?: boolean;
  }

  export interface Theme {
    breakpoints?: IThemeBreakpoints;
    direction?: string;
    overrides?: object;
    props?: object;
  }
}
