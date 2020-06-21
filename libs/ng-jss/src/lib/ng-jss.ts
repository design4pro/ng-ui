import { Injectable } from '@angular/core';
import { createGenerateId, GenerateId, SheetsRegistry } from 'jss';
import { JssContext, JssStore } from './jss/jss-context';
import { IJss } from './jss/types';
import { NgJssOptions, NgJssTheme } from './options';
import normalize from './styles/normalize';
import { ThemeStore } from './theme/theme-context';
import shallowEqualObjects from './utils/shallow-equal-objects';

/**
 * Initialize service (used in shared module `forRoot` to initialize before app init).
 *
 * @export
 * @param {NgJss} provider
 * @returns
 */
export function ngJssFactory(provider: NgJss) {
  return () => provider.init();
}

@Injectable()
export class NgJss {
  private registry: SheetsRegistry;

  private generateId: GenerateId;

  private initialContext: JssContext = {
    classNamePrefix: '',
    disableStylesGeneration: false,
  };

  private managers: IJss.Managers = {};

  private prevContext: JssContext;

  private jssStore: JssStore = JssStore.getInstance();
  private themeStore: ThemeStore = ThemeStore.getInstance();

  constructor(private options: NgJssOptions, private theme: NgJssTheme) {}

  init() {
    console.log('NgJss->init', this.options, this.theme);

    this.themeStore.setState(this.theme);
    this.context(this.options);

    // attach normilize styles on init
    if (this.options.normalize) {
      normalize().attach();
    }
  }

  createContext(
    parentContext: JssContext,
    prevContext: JssContext = this.initialContext
  ) {
    const context = { ...parentContext };

    if (this.options.registry) {
      context.registry = this.options.registry;

      // This way we identify a new request on the server, because user will create
      // a new Registry instance for each.
      if (this.options.registry !== this.registry) {
        // We reset managers because we have to regenerate all sheets for the new request.
        this.managers = {};
        this.registry = this.options.registry;
      }
    }

    context.managers = this.managers;

    if (this.options.id !== undefined) {
      context.id = this.options.id;
    }

    if (!context.generateId || !prevContext || context.id !== prevContext.id) {
      context.generateId = createGenerateId(context.id);
    }

    if (this.options.classNamePrefix) {
      context.classNamePrefix += this.options.classNamePrefix;
    }

    if (this.options.media !== undefined) {
      context.media = this.options.media;
    }

    if (this.options.jss) {
      context.jss = this.options.jss;
    }

    if (this.options.disableStylesGeneration !== undefined) {
      context.disableStylesGeneration = this.options.disableStylesGeneration;
    }

    if (prevContext && shallowEqualObjects(prevContext, context)) {
      return prevContext;
    }

    return context;
  }

  context(parentContext: JssContext): JssStore {
    const context: JssContext = this.createContext(
      parentContext,
      this.prevContext
    );
    this.prevContext = context;

    this.jssStore.setState(context);

    return this.jssStore;
  }
}
