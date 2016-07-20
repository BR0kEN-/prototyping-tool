'use strict';

/**
 * @example
 * @code
 * const sass = new TypedPlugin('gulp-sass', {
 *   errLogToConsole: true,
 *   outputStyle: 'expanded'
 * });
 *
 * sass.Invoke()
 *
 * sass.outputStyle === 'expanded' // true
 * @endcode
 *
 * @example
 * An example above is the same as:
 *
 * @code
 * const sass = require('gulp-sass');
 *
 * sass({
 *   errLogToConsole: true,
 *   outputStyle: 'expanded'
 * });
 *
 * sass.outputStyle === undefined // true
 * @endcode
 */
export default class TypedPlugin {
  /**
   * @constructor
   *
   * @param {String} module
   *   The name of module.
   * @param {String} [method]
   *   The name of method to initialize the module.
   * @param {Object} [options]
   *   A set of options for module invocation.
   */
  constructor(module, method, options) {
    this.module = module ? require(module) : {};
    this.options = options || {};

    if (method in this.module) {
      this.module[method](this.options);
    }

    // Copy methods into this object.
    for (const item in this.module) {
      this[item] = this.module[item];
    }

    // Copy options into this object.
    for (const item in this.options) {
      this[item] = this.options[item];
    }
  }

  Invoke() {
    return this.module instanceof Function ? this.module(this.options) : {};
  }
}
