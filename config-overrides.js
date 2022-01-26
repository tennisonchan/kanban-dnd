const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    process: "process/browser",
  };
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
