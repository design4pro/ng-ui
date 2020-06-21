import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { JssStore } from './jss/jss-context';
import { NgJss, ngJssFactory } from './ng-jss';
import {
  NgJssOptions,
  ngJssOptionsFactory,
  NgJssTheme,
  ngJssThemeFactory,
  NG_JSS_OPTIONS_INJECTOR,
  NG_JSS_THEME_INJECTOR,
} from './options';
import defaultTheme from './theme/default-theme';
import { ThemeStore } from './theme/theme-context';
import { INgJss } from './types';

@NgModule({
  imports: [CommonModule],
  providers: [JssStore, ThemeStore],
})
export class NgJssModule {
  static forRoot(
    options?: INgJss.Options,
    theme?: INgJss.Theme
  ): ModuleWithProviders {
    const _theme = theme || defaultTheme;

    return {
      ngModule: NgJssModule,
      providers: [
        NgJss,
        {
          provide: NG_JSS_OPTIONS_INJECTOR,
          useValue: options,
        },
        {
          provide: NG_JSS_THEME_INJECTOR,
          useValue: _theme,
        },
        {
          provide: NgJssOptions,
          useFactory: ngJssOptionsFactory,
          deps: [NG_JSS_OPTIONS_INJECTOR],
        },
        {
          provide: NgJssTheme,
          useFactory: ngJssThemeFactory,
          deps: [NG_JSS_THEME_INJECTOR],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: ngJssFactory,
          deps: [NgJss, NgJssOptions, NgJssTheme],
          multi: true,
        },
      ],
    };
  }
}
