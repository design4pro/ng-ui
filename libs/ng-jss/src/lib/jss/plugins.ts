import camelCase from 'jss-plugin-camel-case';
import compose from 'jss-plugin-compose';
import defaultUnit, {
  Options as DefaultUnitOptions,
} from 'jss-plugin-default-unit';
import expand from 'jss-plugin-expand';
import extend from 'jss-plugin-extend';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import propsSort from 'jss-plugin-props-sort';
import functions from 'jss-plugin-rule-value-function';
import observable, {
  Options as ObservableOptions,
} from 'jss-plugin-rule-value-observable';
import template from 'jss-plugin-template';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';

interface Options {
  defaultUnit?: DefaultUnitOptions;
  observable?: ObservableOptions;
}

export default (options: Options = {}) => [
  functions(),
  observable(options.observable),
  template(),
  global(),
  extend(),
  nested(),
  compose(),
  camelCase(),
  defaultUnit(options.defaultUnit),
  expand(),
  // Disable the vendor prefixer server-side, it does nothing.
  // This way, we can get a performance boost.
  // In the documentation, we are using `autoprefixer` to solve this problem.
  typeof window === 'undefined' ? null : vendorPrefixer(),
  propsSort(),
];
