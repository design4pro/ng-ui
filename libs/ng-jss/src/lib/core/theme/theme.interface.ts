import { Store } from '../utils/store';

export interface Theming<Theme> {
  context: Store<Theme>;
}
