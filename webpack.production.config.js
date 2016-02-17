var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: [
    "./app/app.js",
  ],
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["babel?presets[]=react,presets[]=es2015"],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file",
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url?prefix=font/&limit=5000",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.gif/,
        loader: "url-loader?limit=10000&mimetype=image/gif",
      },
      {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&mimetype=image/jpg",
      },
      {
        test: /\.png/,
        loader: "url-loader?limit=10000&mimetype=image/png",
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};
