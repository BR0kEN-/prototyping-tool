'use strict';

import TypedPlugin from './types/TypedPlugin';

export default class Gulp extends TypedPlugin {
  /**
   * @constructor
   *
   * @param {String} [module]
   *   The name of Gulp plugin without "gulp-" prefix.
   * @param {Object} [options]
   *   A set of options for plugin invocation.
   */
  constructor(module, options) {
    super('gulp' + (module ? '-' + module : ''), false, options);
  }
}
