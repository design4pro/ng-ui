import { CreateGenerateIdOptions, GenerateId, Jss, SheetsRegistry } from 'jss';
import { Managers } from '../../jss/types';

export type Context = {
  jss?: Jss;
  registry?: SheetsRegistry;
  managers?: Managers;
  id?: CreateGenerateIdOptions;
  classNamePrefix?: string;
  disableStylesGeneration?: boolean;
  media?: string;
  generateId?: GenerateId;
};
