import { InjectionToken } from '@angular/core';
import { SheetsRegistry } from 'jss';
import { INgJss } from './types';

export const NG_JSS_OPTIONS_INJECTOR = new InjectionToken<INgJss.Options>(
  'NgJssOptions'
);

export const NG_JSS_THEME_INJECTOR = new InjectionToken<INgJss.Theme>(
  'NgJssTheme'
);

/**
 * Configuration for NG JSS service.
 */
export class NgJssOptions implements INgJss.Options {
  normalize = true;

  registry = new SheetsRegistry();

  id = undefined;

  classNamePrefix = undefined;

  media = undefined;

  jss = undefined;

  disableStylesGeneration = false;
}

/**
 * NG JSS options provider
 */
export function ngJssOptionsFactory(options?: INgJss.Options): NgJssOptions {
  const moduleOptions = new NgJssOptions();

  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the NgJssOptions Type provider.
  if (options) {
    if (typeof options.normalize === 'boolean') {
      moduleOptions.normalize = options.normalize;
    }

    if (options.registry instanceof SheetsRegistry) {
      moduleOptions.registry = options.registry;
    }
  }

  return moduleOptions;
}

export class NgJssTheme {}

/**
 * NG JSS theme provider
 */
export function ngJssThemeFactory(theme?: INgJss.Theme): NgJssTheme {
  const moduleTheme = { ...new NgJssTheme(), ...theme } as NgJssTheme;

  return moduleTheme;
}
