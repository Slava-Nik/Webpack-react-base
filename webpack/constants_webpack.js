const path = require("path");

const PATHS = {
	src: path.resolve(__dirname, "../src"),
	dist: path.resolve(__dirname, "../dist"),
	components: path.resolve(__dirname, "../src/components"),
	assets: path.resolve(__dirname, "../src/assets"),
	static: path.resolve(__dirname, "../src/static")
};
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
	PATHS, 
	isDev,
	isProd
};