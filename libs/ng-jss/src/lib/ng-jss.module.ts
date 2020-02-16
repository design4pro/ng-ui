import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ContextStore } from './core/context/context.store';
import { NG_JSS_OPTIONS_INJECTOR } from './ng-jss.injector';
import { NgJssOptions } from './ng-jss.interface';
import { NgJssService, NgJssServiceFactory } from './ng-jss.service';

@NgModule({
  imports: [CommonModule],
  providers: [ContextStore]
})
export class NgJssModule {
  constructor() {
    console.log('ng-jss');
  }

  static forRoot(options?: NgJssOptions): ModuleWithProviders {
    return {
      ngModule: NgJssModule,
      providers: [
        NgJssService,
        {
          provide: NG_JSS_OPTIONS_INJECTOR,
          useValue: options
        },
        {
          provide: APP_INITIALIZER,
          useFactory: NgJssServiceFactory,
          deps: [NgJssService, ContextStore],
          multi: true
        }
      ]
    };
  }
}
