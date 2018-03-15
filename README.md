# Prototyping Tool

## Installation

```bash
npm install
```

## Features

- ES6 syntax today: let [Webpack](https://github.com/webpack/webpack) do a dirty job.
- Live reload: track changes in SCSS, JS and PHP files.
- [PostCSS](https://github.com/postcss/postcss) and [Autoprefixer](https://github.com/postcss/autoprefixer): write only clean CSS.
- Quality: SCSS & JavaScript code sniffers ([ESLint](https://github.com/eslint/eslint) and [StyleLint](https://github.com/stylelint/stylelint)).
- Configurability: [Babel](.babelrc), [Bower](.bowerrc), [BrowsersList](.browserslistrc), [ESLint](.eslintrc), [PostCSS](.postcssrc) and [StyleLint](.stylelintrc) configs are open to you.

## Tasks

- `npm start` - starts a built-in PHP web-server that tracks changes of all sources.
- `npm run build` - compiles the code in production-ready mode.

## Requirements

- PHP >= 5.4
- NPM >= 4
- Node.js

## Notes

- Why my resulting JS is about 500 Kb when `main.js` is empty?

  The file is not exactly empty - it has `import 'babel-polyfill'` for adding all missing ES6 features. Running `npm start` your application starts in `development` mode when JS is not compressed. If you run `npm run build` that compiles production-ready code the total size will be around 100 Kb. You also may consider removing `import 'babel-polyfill'` to have compiled file empty, but missing (in various browsers) ES6 features will no longer be available.

- Where and how the development server starts?

  To up the server and allow you to code we're using [PHP's built-in web-server](http://php.net/manual/en/features.commandline.webserver.php) that is available from 5.4. It'll be serving an application at http://127.0.0.1:9011 but you may change this in [config.json](config.json). Nobody requires you to code in PHP, you can just simply add a plain HTML in [dist/index.php](dist/index.php) and do your app only using JavaScript and/or SCSS.
