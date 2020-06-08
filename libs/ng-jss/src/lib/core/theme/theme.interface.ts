import { Store } from '../utils/store';

export interface Theming<Theme> {
  context: Store<Theme>;
}

export type ThemeType = string | 'auto' | 'light' | 'dark';
