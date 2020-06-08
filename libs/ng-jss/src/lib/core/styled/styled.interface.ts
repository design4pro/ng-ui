import createUseStyles from './create-use-styles';

export type StyledProps<T> = (context: StyledContext<T>) => any;

export interface StyledContext<C> {
  component: C;
  css: typeof createUseStyles;
}
