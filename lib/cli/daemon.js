'use strict';

var program = require('commander');
var path = require('path');
var aipgcore = require('..');

function main(servicesPath, additionalServices) {
  /* jshint maxstatements: 100 */

  var version = aipgcore.version;
  var start = aipgcore.scaffold.start;
  var findConfig = aipgcore.scaffold.findConfig;
  var defaultConfig = aipgcore.scaffold.defaultConfig;

  program
    .version(version)
    .description('Start the current node')
    .option('-c, --config <dir>', 'Specify the directory with aipgcore Node configuration');

  program.parse(process.argv);

  if (program.config) {
    program.config = path.resolve(process.cwd(), program.config);
  }
  var configInfo = findConfig(program.config || process.cwd());
  if (!configInfo) {
    configInfo = defaultConfig({
      additionalServices: additionalServices
    });
  }
  if (servicesPath) {
    configInfo.servicesPath = servicesPath;
  }
  start(configInfo);
}

module.exports = main;
