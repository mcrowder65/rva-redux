const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const sourcePath = path.join(__dirname, "src");
const webpackConfig = {
  cache: !isProd,
  devtool: isProd ? "" : "eval-cheap-module-source-map",
  entry: isProd
    ? "./src/client/app.js"
    : [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        "./src/client/app.js"
      ],
  output: {
    path: `${__dirname}/build`,
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".scss", ".jsx", ".css"],
    modules: [sourcePath, path.resolve(__dirname, "./node_modules")],
    symlinks: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        // loader: 'style-loader!css-loader',
        use: [
          {
            loader: require.resolve("style-loader")
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes")
                //   autoprefixer({
                //     browsers: [
                //       '>1%',
                //       'last 4 versions',
                //       'Firefox ESR',
                //       'not ie < 9',
                //     ],
                //     flexbox: 'no-2009',
                //   }),
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: require.resolve("style-loader")
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: require.resolve("sass-loader")
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes")
                //   autoprefixer({
                //     browsers: [
                //       '>1%',
                //       'last 4 versions',
                //       'Firefox ESR',
                //       'not ie < 9',
                //     ],
                //     flexbox: 'no-2009',
                //   }),
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        loader: "url-loader?limit=30000&name=[name]-[hash].[ext]",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: !isProd,
    hot: !isProd,
    compress: isProd,
    contentBase: "./",
    publicPath: "/"
  }
};
webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    template: "./src/client/index.html",
    filename: "./index.html",
    inject: "body",
    minify: isProd && {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new webpack.EnvironmentPlugin(["NODE_ENV"]),

  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "production"
  }),
  new ManifestPlugin({ fileName: "asset-manifest.json" }),
  new SWPrecacheWebpackPlugin({
    // By default, a cache-busting query parameter is appended to requests
    // used to populate the caches, to ensure the responses are fresh.
    // If a URL is already hashed by Webpack, then there is no concern
    // about it being stale, and the cache-busting can be skipped.
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: "service-worker.js",
    logger(message) {
      if (message.indexOf("Total precache size is") === 0) {
        // This message occurs for every build and is a bit too noisy.
        return;
      }
      console.log(message);
    },
    minify: true, // minify and uglify the script
    navigateFallback: "/index.html",
    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
  }),
  new CopyWebpackPlugin([{ from: "src/client/pwa" }])
];
if (process.env.ANALYZE_BUNDLE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
if (isProd) {
  webpackConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8
    })
  );
} else if (!isProd) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}
module.exports = webpackConfig;
