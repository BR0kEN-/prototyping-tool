# Prototyping Tool

## Installation

- npm install
- gem install scss_lint

## Features

- All source files (JS/CSS), names of which starts from `_`, will not be copied into the destination.
- SCSS compiling (using [gulp-sass](https://github.com/dlmanning/gulp-sass)).
- SCSS linting (using [gulp-scss-lint](https://github.com/juanfran/gulp-scss-lint)).
- JS requires (using [gulp-include](https://github.com/wiledal/gulp-include)).
- JS linting (using [gulp-eslint](https://github.com/adametry/gulp-eslint)).

## Tasks

- `default` - starts a built-in PHP web-server and will track changes of all sources.
- `compile` - run all asset-related tasks.
- `lints` - executes all linters.

### JS

- `js` - processing all `require` statements.
- `js-lint` - includes execution of `js` and executes ES lint.

### SCSS

- `scss` - compile SCSS.
- `scss-lint` - includes execution of `scss` and executes SCSS lint.

## Requirements

- PHP
- Ruby
- SASS
- Compass
- NodeJS
- NPM
