'use strict';

import TypedPlugin from './types/TypedPlugin';

/**
 * @property {String} proxy
 * @property {Boolean} notify
 * @property {String[]} files
 */
export default class BrowserSync extends TypedPlugin {
  /**
   * @constructor
   *
   * @param {PhpWebServer} server
   *   Built-in PHP web-server.
   * @param {String[]} files
   *   Files for tracking changes.
   */
  constructor(server, files) {
    super('browser-sync', 'init', {
      // Proxy to the PHP web server.
      proxy: server.hostname + ':' + server.port,
      // Do not notify about reloading.
      notify: false,
      // Reload page when one of files was changed and match one of patterns.
      files: files
    });
  }
}
