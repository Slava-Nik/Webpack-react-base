const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");
const { PATHS } = require("./constants_webpack");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.dist,
    port: 8081,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});
