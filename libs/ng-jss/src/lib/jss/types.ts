import { GenerateId, SheetsManager, SheetsRegistry } from 'jss';

export type Managers = { [key: number]: SheetsManager };

export type Options = {
  registry?: SheetsRegistry;
  jss?: any;
  generateId?: GenerateId;
  classNamePrefix?: string;
  disableStylesGeneration?: boolean;
  media?: string;
  id?: { minify: boolean };
};
