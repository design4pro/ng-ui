import { Inject, Injectable } from '@angular/core';
import { createGenerateId, SheetsRegistry } from 'jss';
import { normalize } from './core';
import { ContextState } from './core/context/context-state';
import { ContextStore } from './core/context/context.store';
import { ThemeState } from './core/theme/theme-state';
import { ThemeStore } from './core/theme/theme.store';
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
  private prevContext: ContextState;

  constructor(
    private contextStore: ContextStore,
    private themeStore: ThemeStore,
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
    parentContext: ContextState,
    prevContext: ContextState = this.initialContext
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

  context(parentContext: ContextState): ContextStore {
    console.log('NgJssService->context', { parentContext });
    const context: ContextState = this.createContext(
      parentContext,
      this.prevContext
    );
    this.prevContext = context;

    this.contextStore.setState(context);

    return this.contextStore;
  }

  theme(theme: ThemeState): ThemeStore {
    console.log('NgJssService->theme', { theme });
    this.themeStore.setState(theme);

    return this.themeStore;
  }
}
