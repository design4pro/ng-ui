import { SheetsRegistry } from 'jss';
import createGenerateClassName from './utils/get-sheet-classes';

export default class ServerStyleSheets {
  options;
  sheetsRegistry;

  constructor(options = {}) {
    this.options = options;
  }

  collect() {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new Map();
    // This is needed in order to inject the critical CSS.
    this.sheetsRegistry = new SheetsRegistry();
    // A new class name generator
    const generateClassName = createGenerateClassName();

    return {
      sheetsManager,
      generateClassName,
      sheetsRegistry: this.sheetsRegistry,
      options: this.options
    };
  }

  toString() {
    return this.sheetsRegistry ? this.sheetsRegistry.toString() : '';
  }
}
