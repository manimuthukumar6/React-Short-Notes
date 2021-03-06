'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));

// List of allowed environments
var allowedEnvs = ['dev', 'dist'];

// Set the correct environment
var env;
if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

// Get available configurations
var configs = {
  base: require(path.join(__dirname, 'cfg/base')),
  dev: require(path.join(__dirname, 'cfg/dev')),
  dist: require(path.join(__dirname, 'cfg/dist')),
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
  var usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig(env);
