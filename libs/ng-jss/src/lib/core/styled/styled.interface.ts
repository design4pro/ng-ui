import { StyleSheetFactoryOptions } from 'jss';

export type HookOptions<Theme> = StyleSheetFactoryOptions & {
  index?: number;
  name?: string;
  theming?: Theming<Theme>;
};

export type StaticStyle = {};
export type DynamicStyle<Theme> = ({ theme: Theme }) => StaticStyle;

export type StaticStyles = { [key: string]: StaticStyle };

export type ThemedStyles<Theme> = (
  theme: Theme
) => StaticStyle | DynamicStyle<Theme>;

export type Styles<Theme> = StaticStyles | ThemedStyles<Theme>;

export type StyledProps<T> = (context: StyledContext<T>) => any;

export interface StyledContext<T> {
  component: T;
  css: typeof createUseStyles;
}
