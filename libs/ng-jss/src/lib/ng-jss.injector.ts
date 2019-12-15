import { InjectionToken } from '@angular/core';
import { NgJssOptions } from './ng-jss.interface';

export const NG_JSS_OPTIONS_INJECTOR = new InjectionToken<NgJssOptions>(
  'NgJssOptions'
);
