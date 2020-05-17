const path = require("path");
const {PATHS, isDev, isProd} = require("./constants_webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");


const getFilename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const getPlugins = () => {
	return [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(PATHS.static, 'favicon.ico'),
					to: PATHS.dist,
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
	];
};

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

const getFontLoaders = () => {
	return [{
		loader: "file-loader",
		options: {
			name:  isDev ? "[path][name].[ext]" : "[contenthash].[ext]",
		},
	}];
};

const getImageLoaders = (params) => {
	const loaders =  [{
		loader: "file-loader",
		options: {
			name:  isDev ? "[path][name].[ext]" : "[contenthash].[ext]",
		},
	}];
	if(params.compress){
		loaders.push(
			{
				loader: "img-loader",
				options: {
					plugins: [
						imageminGifsicle({
							interlaced: false
						}),
						imageminMozjpeg({
							progressive: true,
							arithmetic: false
						}),
						imageminPngquant({
							floyd: 0.5,
							speed: 2
						}),
						imageminSvgo({
							plugins: [
								{ removeTitle: true },
								{ convertPathData: false }
							]
						})
					]
				}
			}
		);
	}
	return loaders;
};

module.exports =  {
	getPlugins,
	getJSLoaders,
	getCSSLoaders,
	getFontLoaders,
	getImageLoaders,
	getFilename
};