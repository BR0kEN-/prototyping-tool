'use strict';

import AssetPlugin from './types/AssetPlugin';

export default class Js extends AssetPlugin {
  /**
   * @constructor
   *
   * @param {String} src
   *   Path to source code.
   * @param {String} dest
   *   Path to destination directory.
   */
  constructor(src, dest) {
    super('gulp-include', 'gulp-eslint', src, dest);
    this.lintPipes = ['format'];
  }
}
