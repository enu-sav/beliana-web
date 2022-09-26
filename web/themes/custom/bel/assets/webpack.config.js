const path = require('path');
const glob = require('glob');
const entryPlus = require('webpack-entry-plus');
const TerserPlugin = require("terser-webpack-plugin");

const entryFiles = [
  {
    entryFiles: glob.sync('./fabricator/assets/fabricator/scripts/*.js'),
    outputName(item) {
      return item.replace('fabricator/assets/', '');
    }
  },
  {
    entryFiles: glob.sync('./src/es6/*.js'),
    outputName(item) {
      return item.replace('src/', '');
    },
  },
  {
    entryFiles: glob.sync('./src/js/**/*.js'),
    outputName(item) {
      return item.replace('src/', '');
    },
  },
];

/**
 * Define loaders
 * @return {Array}
 */
function getRules() {
  return [
    {
      test: /(\.js)/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /(\.jpg|\.png)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    {
      test: /\.json/,
      loader: 'json-loader',
    },
    {
      test: /\.html/,
      loader: 'raw-loader',
    },
  ];
}

module.exports = ({
  dev,
  scripts: {
    fabricator: { src: fabSrc },
    js: { src: scriptSrc },
  },
  dest,
}) => {
  return {
    mode: dev ? 'development' : 'production',
    entry: entryPlus(entryFiles),
    output: {
      filename: '[name]',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            mangle: false,
          },
        }),
      ],
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    module: {
      rules: getRules(),
    },
  };
};
