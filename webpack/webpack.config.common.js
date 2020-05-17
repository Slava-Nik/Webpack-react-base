const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const getFilename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const getJSLoaders = () => {
	const loaders = ["babel-loader"];
	if(isDev){
		loaders.push({
			loader: "eslint-loader",
		});
	}
	return loaders;
};

const getCSSLoaders = (extraLoader) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: { hmr: isDev, reloadAll: isDev },
		},
		"css-loader",
	];
	if(isProd){
		loaders.push({
			loader: "postcss-loader",
			options: {
				plugins: [
					autoprefixer()
				],
				sourceMap: true
			}
		});
	}
	if (extraLoader) loaders.push(extraLoader);
	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, "../src"),
	entry: {
		main: ["@babel/polyfill", "./index.js"],
	},
	output: {
		filename: getFilename("js"),
		path: path.resolve(__dirname, "../dist")
	},
	resolve: {
		extensions: [".js", ".ts", ".json", ".jsx",".scss"],
		alias: {
			"@components": path.resolve(__dirname, "../src/components"),
			"@": path.resolve(__dirname, "../src"),
		},
	},
	optimization: {
		splitChunks: { chunks: "all" },
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../src/favicon.ico"),
					to: path.resolve(__dirname, "../dist"),
				},
			],
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename: getFilename("css"),
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|ts|jsx|tsx)$/,
				exclude: /node_modules/,
				use: getJSLoaders(),
			},
    	{
				test: /\.css$/i,
				use: getCSSLoaders(),
			},
			{
				test: /\.s[ac]ss$/i,
				use: getCSSLoaders("sass-loader"),
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
};
