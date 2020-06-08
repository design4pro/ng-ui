import {
  GenerateId,
  Rule,
  SheetsManager,
  SheetsRegistry,
  StyleSheetFactoryOptions,
} from 'jss';
import { Theming } from '../core/theme/theme.interface';

export interface Managers {
  [key: number]: SheetsManager;
}

export interface Options {
  registry?: SheetsRegistry;
  jss?: any;
  generateId?: GenerateId;
  classNamePrefix?: string;
  disableStylesGeneration?: boolean;
  media?: string;
  id?: { minify: boolean };
}

export type HookOptions<Theme> = StyleSheetFactoryOptions & {
  index?: number;
  name?: string;
  theming?: Theming<Theme>;
};

export interface DynamicRules {
  [key: string]: Rule;
}

// tslint:disable-next-line: interface-over-type-literal
export type StaticStyle = {};
export type DynamicStyle<Theme> = ({ theme: Theme }) => StaticStyle;

export interface StaticStyles {
  [key: string]: StaticStyle;
}

export type ThemedStyles<Theme> = (
  theme: Theme
) => StaticStyle | DynamicStyle<Theme>;

export type Styles<Theme> = StaticStyles | ThemedStyles<Theme>;
