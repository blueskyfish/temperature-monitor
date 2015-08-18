/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 *
 * Purpose:
 * Read the program arguments and the config file.
 *
 * $ node reader.js [--config=path/to/config.js] [--help] [--level=xxx]
 *
 * Arguments:
 *   config             the filename of the configuration. If not present, then it use "config.js"
 *   help               shows the usage of the application
 *   level              set the log level
 * Configuration:
 *   level              set the log level
 *   sensor.groupId     the sensor group id
 *   database.name      the database name
 *   database.host      the host of the database server
 *   database.port      the port of the database server
 *   database.user      the user of the database
 *   database.pass      the password of the database user
 *   server.url         the url of the rest server (http://domain/path/index.php/sensor/upload)
 *   port.name          the filename of the serial port
 *   port.baudrate      the baudrate for reading the sensor raw data
 *   port.separator     the line separator
 *
 * Note:
 * All config properties are required. The program arguments are optional.
 */

'use strict';

var
  fs = require('fs'),
  path = require('path');

var
  _ = require('lodash'),
  logger = require('bluesky-logger'),
  minimist = require('minimist');

var
  DEFAULT_CONFIG_NAME = path.join(process.cwd(), 'config.js');

var
  env,
  params = minimist(process.argv.slice(2));


function _readConfigFileAndReturnMap(configName) {
  configName = configName || DEFAULT_CONFIG_NAME;
  if (!fs.existsSync(configName)) {
    configName = DEFAULT_CONFIG_NAME;
  }
  if (!fs.existsSync(configName)) {

    throw new Error('Unknown config file "' + configName + '"!', 0x0222);
  }
  return require(configName);
}

//
// extends the parameters and the config object
//
env = _.assign({}, params, _readConfigFileAndReturnMap(params.config));

env.name = 'env (Environment)';


//
// Adjust the log level
//
if (env.level) {
  env.level = logger.toLogLevel(env.level);
}
else {
  env.level = logger.LEVEL_DEBUG;
}

//
// set the log level to the logger
//
logger.setLevel(env.level);

//
// Exports the env object
//
module.exports = env;
