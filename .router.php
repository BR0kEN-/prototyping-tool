<?php
/**
 * Routing script for the built-in PHP web-server.
 *
 * The built-in web-server should only be used for development and testing as it
 * has a number of limitations that makes running Drupal on it highly insecure
 * and somewhat limited.
 *
 * In particular be aware that:
 *   - The server is single-threaded, any requests made during the execution of
 *     the main request will hang until the main request has been completed.
 *   - The web-server does not enforce any of the settings in .htaccess in
 *     particular a remote user will be able to download files that normally
 *     would be protected from direct access such as .module files.
 *
 * @example
 * php -S localhost:8888 .router.php
 *
 * @see http://php.net/manual/en/features.commandline.webserver.php
 */

chdir($_SERVER['DOCUMENT_ROOT']);

if (file_exists('.' . parse_url($_SERVER['REQUEST_URI'])['path'])) {
  // Serve requested resource as-is.
  return false;
}

// The use of a router script means that a number of $_SERVER variables has to
// be updated to point to the index file.
// SCRIPT_NAME and PHP_SELF will either point to /index.php or contain the full
// virtual path being requested depending on the URL being requested. They
// should always point to index.php relative to document root.
$_SERVER['SCRIPT_NAME'] = $_SERVER['PHP_SELF'] = DIRECTORY_SEPARATOR . 'index.php';
// SCRIPT_FILENAME will point to the router script itself, it should point to
// the full path to index.php.
$_SERVER['SCRIPT_FILENAME'] = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME'];

require_once $_SERVER['SCRIPT_FILENAME'];
