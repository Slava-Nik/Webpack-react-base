const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()],
  },
});
