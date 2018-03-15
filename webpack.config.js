import config from './config';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import PhpDevelopmentServerConnection from 'gulp-connect-php';

/**
 * The "host:port" of the development web-server.
 *
 * @type {String}
 */
const server = config.server.hostname + ':' + config.server.port;

/**
 * The environment of operation.
 *
 * @type {String}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// The "npm run build" means we're compiling the production-ready code.
if ('build' === process.env.npm_lifecycle_event) {
  process.env.NODE_ENV = 'production';
}

/**
 * List of Webpack plugins.
 *
 * @type {Object[]}
 */
let plugins = [
  // Write compiled files.
  new WriteFilePlugin(),
  // Compile CSS separately of JS.
  new ExtractTextPlugin(config.assets.style.result),
  // Define aliases of known libraries. E.g., alias of "jQuery" could be "$".
  new webpack.ProvidePlugin(config.provides),
  new StyleLintPlugin(),
];

switch (process.env.NODE_ENV) {
  // Handle "npm run build" - the command for compiling the production-ready code.
  case 'production':
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }));
    break;

  // Handle "npm start" and start BrowserSync-empowered PHP web-server.
  case 'development':
    plugins.push(new BrowserSyncPlugin({
      proxy: 'http://' + server,
      files: config.server.files,
    }));

    new PhpDevelopmentServerConnection(config.server).server();
    break;

  default:
    throw new Error(`The "${process.env.NODE_ENV}" environment is unknown!`);
}

export default {
  plugins,
  target: 'web',
  // https://webpack.js.org/guides/development/#using-source-maps
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',
  externals: config.externals,
  devServer: {
    // Proxy SCSS/JS local changes to the PHP web-server.
    proxy: {
      '/': server,
    }
  },
  resolve: {
    extensions: ['*', '.js', '.json'],
  },
  entry: {
    [config.assets.style.result]: config.assets.style.source,
    [config.assets.script.result]: config.assets.script.source,
  },
  output: {
    path: __dirname,
    filename: '[name]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?name=[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, path.dirname(config.assets.style.source))],
                sourceMap: true,
              }
            },
          ],
        }),
      },
    ],
  },
};
