import { Inject, Injectable } from '@angular/core';
import { normalize } from './core';
import { NG_JSS_OPTIONS_INJECTOR } from './ng-jss.injector';
import { NgJssOptions } from './ng-jss.interface';

/**
 * Initialize service (used in shared module `forRoot` to initialize before app init).
 *
 * @export
 * @param {NgJssService} provider
 * @returns
 */
export function NgJssServiceFactory(provider: NgJssService) {
  return () => provider.init();
}

@Injectable()
export class NgJssService {
  constructor(@Inject(NG_JSS_OPTIONS_INJECTOR) private options: NgJssOptions) {}

  init() {
    console.log('init', this.options);

    if (this.options.normalize) {
      console.log('normalize');

      normalize().attach();
    }
  }
}
