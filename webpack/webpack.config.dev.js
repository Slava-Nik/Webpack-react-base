const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");
const {PATHS} = require("./constants_webpack");


module.exports = merge(commonConfig, {
	mode: "development",
	devtool: "source-map",
	devServer: {
		contentBase: PATHS.dist,
		port: 5000,
		hot: true,
	}
});