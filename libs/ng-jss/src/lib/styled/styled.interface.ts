import { HookOptions, Styles } from '../jss/types';
import { ThemeContext } from '../theme/theme-context';

export type Hooks = 'ngDoCheck' | 'ngOnDestroy';

export type StyledProps = (context: StyledContext) => any;

export interface StyledContext {
  css: (
    styles: Styles<ThemeContext>,
    options?: HookOptions
  ) => (data: any) => {};
}
