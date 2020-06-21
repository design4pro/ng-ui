import {
  CreateGenerateIdOptions,
  GenerateId,
  Jss,
  Rule,
  SheetsManager,
  SheetsRegistry,
  StyleSheetFactoryOptions,
} from 'jss';

export namespace IJss {
  export interface Options {
    registry?: SheetsRegistry;

    /**
     * JSS's instance.
     */
    jss?: Jss;
    generateId?: GenerateId;
    classNamePrefix?: string;

    /**
     * You can disable the generation of the styles with this option.
     * It can be useful when traversing the React tree outside of the HTML
     * rendering step on the server.
     * Let's say you are using react-apollo to extract all
     * the queries made by the interface server-side - you can significantly speed up the traversal with this prop.
     */
    disableStylesGeneration?: boolean;
    media?: string;
    id?: CreateGenerateIdOptions;
  }

  export interface Managers {
    [key: number]: SheetsManager;
  }
}

export type HookOptions = StyleSheetFactoryOptions & {
  index?: number;
  name?: string;
};

export interface DynamicRules {
  [key: string]: Rule;
}

// tslint:disable-next-line: interface-over-type-literal
export type StaticStyle = {};
export type DynamicStyle<T> = ({ theme: T }) => StaticStyle;

export interface StaticStyles {
  [key: string]: StaticStyle;
}

export type ThemedStyles<T> = (theme: T) => StaticStyle | DynamicStyle<T>;

export type Styles<T> = StaticStyles | ThemedStyles<T>;
