'use strict';

import AssetPlugin from './types/AssetPlugin';

export default class Scss extends AssetPlugin {
  /**
   * @constructor
   *
   * @param {String} src
   *   Path to source code.
   * @param {String} dest
   *   Path to destination directory.
   */
  constructor(src, dest) {
    super('gulp-sass', 'gulp-scss-lint', src, dest);
  }
}
