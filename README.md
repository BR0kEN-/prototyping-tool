# Prototyping Tool

## Installation

```bash
npm install
```

## Features

- Quality: SCSS & JavaScript code sniffers.
- ES6 syntax today: let Webpack do a dirty work.
- Live reload: track changes in SCSS, JS and PHP files.

## Tasks

- `npm start` - starts a built-in PHP web-server that tracks changes of all sources.
- `npm run build` - compiles the code in production-ready mode.
- `lints` - executes all linters.

## Requirements

- PHP
- NPM
- Node.js

## Notes

- Why my resulting JS is about 500 Kb when `main.js` is empty?

  The file is not exactly empty - it has `import 'babel-polyfill'` for adding all missing ES6 features. Running `npm start` your application starts in `development` mode when JS is not compressed. If you run `npm run build` that compiles production-ready code the total size will be around 100 Kb. You also may consider removing `import 'babel-polyfill'` to have compiled file empty, but missing (in various browsers) ES6 features will no longer be available.
