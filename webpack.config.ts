import { styles } from '@ckeditor/ckeditor5-dev-utils';
import CKEditorWebpackPlugin from '@ckeditor/ckeditor5-dev-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const MODE =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProduction = MODE === 'production';

const config = {
  name: 'client',
  mode: MODE,
  target: 'web',
  entry: {
    client: './src/index.tsx',
  },
  context: path.resolve(__dirname),
  output: {
    filename: '[name].bundle.js',
    publicPath: './',
    path: path.resolve('build'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx?|tsx?)$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: require.resolve('./tsconfig.json'),
            },
          },
          {
            loader: 'lodash-ts-webpack-plugin',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    modules: [path.resolve('node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new CKEditorWebpackPlugin({
      // UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
      // When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
      language: 'en',
      additionalLanguages: 'all',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(MODE),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src/index-template.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
        options: {
          globals: ['Maybe'],
        },
      },
    }),
    ...(isProduction
      ? ([
          new CopyWebpackPlugin({
            patterns: [{ from: 'public' }],
          }),
        ] as any[])
      : []),
  ],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    contentBase: [path.resolve('src'), path.resolve('public')],
    publicPath: '/',
    index: path.resolve('build/index.html'),
    writeToDisk: false,
    historyApiFallback: true,
    liveReload: false,
  },
  devtool: isProduction ? false : 'source-map',
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

export default config;
