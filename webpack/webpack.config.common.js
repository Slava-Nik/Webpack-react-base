const path = require("path");
const helpers = require("./helpers_webpack.js");

module.exports = {
	context: path.resolve(__dirname, "../src"),
	entry: {
		main: ["@babel/polyfill", "./index.js"],
	},
	output: {
		filename: helpers.getFilename("js"),
		path: path.resolve(__dirname, "../dist")
	},
	resolve: {
		extensions: [".js", ".ts", ".json", ".jsx",".scss"],
		alias: {
			"@components": path.resolve(__dirname, "../src/components"),
			"@assets": path.resolve(__dirname, "../src/assets"),
			"@": path.resolve(__dirname, "../src"),
		},
	},
	optimization: {
		splitChunks: { chunks: "all" },
	},
	plugins: helpers.getPlugins(),
	module: {
		rules: [
			{
				test: /\.(js|ts|jsx|tsx)$/,
				exclude: /node_modules/,
				use: helpers.getJSLoaders(),
			},
			{
				test: /\.css$/i,
				use: helpers.getCSSLoaders(),
			},
			{
				test: /\.s[ac]ss$/i,
				use: helpers.getCSSLoaders("sass-loader"),
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: helpers.getImageLoaders({compress: false}),
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				use:  helpers.getFontLoaders(),
			},
		],
	},
};
