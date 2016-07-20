'use strict';

import TypedPlugin from './TypedPlugin';

export default class AssetPlugin extends TypedPlugin {
  /**
   * @constructor
   *
   * @param {String} assetModule
   *   Name of module for processing source code.
   * @param {String} lintModule
   *   Name of module for validating source code.
   * @param {String} src
   *   Path pattern for searching source code.
   * @param {String} dest
   *   Destination directory where source code will be compiled.
   */
  constructor(assetModule, lintModule, src, dest) {
    super(assetModule);

    this.src = src;
    this.dest = dest;
    this.lint = new TypedPlugin(lintModule);
    this.lintPipes = [];
  }
}
