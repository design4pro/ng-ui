import { Inject, Injectable } from '@angular/core';
import { createGenerateId, SheetsRegistry } from 'jss';
import { normalize } from './core';
import { Context } from './core/context/context.interface';
import { ContextStore } from './core/context/context.store';
import shallowEqualObjects from './core/utils/shallow-equal-objects';
import { Managers } from './jss/types';
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
  private registry: SheetsRegistry;
  private initialContext: Object = {};
  private managers: Managers = {};
  private prevContext: Context;

  constructor(
    private store: ContextStore,
    @Inject(NG_JSS_OPTIONS_INJECTOR) private options: NgJssOptions
  ) {}

  init() {
    console.log('NgJssServic->init', this.options);

    this.context(this.options);

    // attach normilize styles on init
    if (this.options.normalize) {
      console.log('NgJssService->init->normalize');

      normalize().attach();
    }
  }

  createContext(
    parentContext: Context,
    prevContext: Context = this.initialContext
  ) {
    const context = { ...parentContext };

    context.managers = this.managers;

    if (!context.generateId || !prevContext || context.id !== prevContext.id) {
      context.generateId = createGenerateId(context.id);
    }

    if (prevContext && shallowEqualObjects(prevContext, context)) {
      return prevContext;
    }

    return context;
  }

  context(parentContext: Context): ContextStore {
    console.log('NgJssService->context', { parentContext });
    const context: Context = this.createContext(
      parentContext,
      this.prevContext
    );
    this.prevContext = context;

    this.store.setState(context);

    return this.store;
  }
}
