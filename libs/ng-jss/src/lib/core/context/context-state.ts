import { CreateGenerateIdOptions, GenerateId, Jss, SheetsRegistry } from 'jss';
import { Managers } from '../../jss/types';

export class ContextState {
  jss?: Jss;
  registry?: SheetsRegistry;
  managers?: Managers;
  id?: CreateGenerateIdOptions;
  classNamePrefix?: string;
  disableStylesGeneration?: boolean;
  media?: string;
  generateId?: GenerateId;

  constructor() {
    this.classNamePrefix = '';
    this.disableStylesGeneration = false;
  }
}
