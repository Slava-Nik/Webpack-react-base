const { PATHS, isDev } = require("./constants_webpack");
const helpers = require("./helpers_webpack.js");

module.exports = {
  context: PATHS.src,
  entry: {
    app: ["@babel/polyfill", "./index.js"],
  },
  output: {
    filename: helpers.getFilename("js"),
    path: PATHS.dist,
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".jsx", ".scss"],
    alias: {
      "@": PATHS.src,
      "@components": PATHS.components,
      "@assets": PATHS.assets,
    },
  },
  optimization: {
    splitChunks: {
       // minSize: 0, //Min size for a chunk to be generated. (in bytes, 30000 default)
      maxInitialRequests: Infinity, //max number of splitted files
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return (`vendors/chunk-vendors.${packageName.replace("@", "")}`
            );
          },
        },
      },
    },
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
        use: helpers.getCSSLoaders({
          loader: "sass-loader",
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: helpers.getImageLoaders({ compress: false }),
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: helpers.getFontLoaders(),
      },
    ],
  },
};
