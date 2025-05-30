const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Fix ESM imports by adding .js extension where needed
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  
  // Add resolver for .mjs files
  config.resolve.extensions = [...(config.resolve.extensions || []), '.mjs'];
  
  // Add polyfills and fallbacks for Node.js modules
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    process: require.resolve('process/browser.js'), // Explicitly add .js extension
  };
  
  // Add webpack plugins to inject global modules
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Explicitly use .js extension
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Handle ESM modules from node_modules
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false // Disable requiring full file paths
    }
  });

  return config;
}