'use strict';

import TypedPlugin from './types/TypedPlugin';

/**
 * @property {String} base
 * @property {String} port
 * @property {String} router
 * @property {String} hostname
 */
export default class PhpWebServer extends TypedPlugin {
  /**
   * @constructor
   *
   * @param {String} base
   *   Project root directory.
   * @param {String} [hostname=127.0.0.1]
   *   The host to run the web-server.
   * @param {String} [port=80]
   *   The port to run the web-server on.
   * @param {String} [router]
   *   Path to the PHP script which will handle the routing.
   */
  constructor(base, hostname, port, router) {
    super('gulp-connect-php', 'server', {
      base: base,
      port: port || '80',
      router: router,
      hostname: hostname || '127.0.0.1',
    });
  }
}
