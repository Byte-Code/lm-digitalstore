/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';
import configDev from './config.dev';

const port = process.env.PORT || 3000;

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              // Here, we include babel plugins that are only required for the
              // renderer process. The 'transform-*' plugins must be included
              // before react-hot-loader/babel
              'transform-class-properties',
              'transform-es2015-classes',
              'react-hot-loader/babel'
            ],
          }
        }
      },
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
        ]
      },
      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // Add SASS support  - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ]
  },

  plugins: [

    new webpack.LoaderOptionsPlugin({ debug: true }),

    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    /**
     * If you are using the CLI, the webpack process will not exit with an error
     * code by enabling this plugin.
     * https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
     */
    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        config: JSON.stringify(configDev)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],

  /**
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-renderer'
});
