'use strict';

// Gulp.
import Gulp from './.gulp/Gulp';
// Assets plugins.
import Js from './.gulp/Js';
import Scss from './.gulp/Scss';
// Built-in web-server with LiveReload.
import BrowserSync from './.gulp/BrowserSync';
import PhpWebServer from './.gulp/PhpWebServer';

// Project root directory.
const BASEDIR = './dist';

const gulp = new Gulp();
const filter = new Gulp('filter', file => file.path.split('/').pop().charAt(0) !== '_');

// A set of assets plugins with linters.
const assets = {
  js: new Js('./js/**/*.js', BASEDIR + '/js'),
  scss: new Scss('./scss/**/*.scss', BASEDIR + '/css'),
};

const taskNames = Object.keys(assets).map(taskName => {
  const asset = assets[taskName];

  gulp.task(taskName, () => {
    gulp
      .src(asset.src)
      // Process sources.
      .pipe(asset.Invoke())
      // Do not stop watching on SCSS/JS compilation errors.
      .on('error', (error) => console.warn(error.message))
      // Allow copy files into destination only if their names starts from "_".
      .pipe(filter.Invoke())
      // Copy processed sources into destination.
      .pipe(gulp.dest(asset.dest));
  });

  // Lint should be dependent from original task.
  gulp.task(taskName + '-lint', [taskName], () => {
    const lint = gulp
      .src(asset.src)
      // Invoke validation tool.
      .pipe(asset.lint.Invoke());

    // Run additional validation pipes.
    asset.lintPipes.forEach(lintPipe => lint.pipe(asset.lint[lintPipe]()));
  });

  return taskName;
});

// Run linters.
gulp.task('lints', taskNames.map(taskName => taskName + '-lint'));

// Run all asset-related tasks.
gulp.task('compile', taskNames);

// Run web server and watch for CSS/JS updates.
gulp.task('default', ['compile'], () => {
  // Track changes of PHP, CSS and JS files inside of project root.
  new BrowserSync(new PhpWebServer(BASEDIR, '127.0.0.1', '1234', './.router.php'), [
    assets.scss.dest + '/*.css',
    assets.js.dest + '/*.js',
    BASEDIR + '/**/*.php',
  ]);

  // Run related tasks when any of tracked files was changed.
  taskNames.forEach(taskName => gulp.watch(assets[taskName].src, [taskName]));
});
