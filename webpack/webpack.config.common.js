const {PATHS} = require("./constants_webpack");
const helpers = require("./helpers_webpack.js");



module.exports = {
	context: PATHS.src,
	entry: {
		main: ["@babel/polyfill", "./index.js"],
	},
	output: {
		filename: helpers.getFilename("js"),
		path: PATHS.dist
	},
	resolve: {
		extensions: [".js", ".ts", ".json", ".jsx",".scss"],
		alias: {
			"@": PATHS.src,
			"@components": PATHS.components,
			"@assets": PATHS.assets,
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
