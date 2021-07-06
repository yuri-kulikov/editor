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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
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
