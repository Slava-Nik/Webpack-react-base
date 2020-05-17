const merge = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require("./webpack.config.common");


module.exports = merge(commonConfig, {
	mode: "production",
	optimization: {
		minimizer:[
			new OptimizeCssAssetsPlugin(),
			new TerserWebpackPlugin(),
		]}
});