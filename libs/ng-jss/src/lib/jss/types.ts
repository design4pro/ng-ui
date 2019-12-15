export type StaticStyle = {};

export type DynamicStyle<Theme> = ({ theme: Theme }) => StaticStyle;

export type StaticStyles = { [key: string]: StaticStyle };

export type ThemedStyles<Theme> = (
  theme: Theme
) => StaticStyle | DynamicStyle<Theme>;

export type Styles<Theme> = StaticStyles | ThemedStyles<Theme>;
