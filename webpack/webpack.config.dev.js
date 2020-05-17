const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");


module.exports = merge(commonConfig, {
	mode: "development",
	devtool: "source-map",
	devServer: {
		contentBase: "../dist",
		port: 5000,
		hot: true
	}
});