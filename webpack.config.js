const path = require("path");
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  target: 'web',
  plugins: [
    new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /wordlists\/(french|spanish|italian|korean|chinese_simplified|chinese_traditional|japanese|czech|portuguese)\.json$/,
    }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        return resource === './CLIKey'
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // This rule is here to get rid of the CliKey part of the terra.js library.
      // There is an issue with this in the browser and the imported terra.js is already compiled for node (and not the browser)
      {
        test: /key\/index\.js/,
        loader: 'string-replace-loader',
        options: {
          search: '__exportStar(require("./CLIKey"), exports);',
          replace: '',
        }
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    fallback: {
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        child_process: false,
      // and also other packages that are not found
    },
    modules: [path.resolve(__dirname, "node_modules")],
  },   
  output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: path.resolve(__dirname, "dist"),
      library: 'terraWallet', //add this line to enable re-use

  },
  devtool:'source-map',
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
