/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 *
 * Usage:
 * $ node reader.js [--config=path/to/config.js] [--help] [--level=xxx]
 */

'use strict';

var
  _ = require('lodash'),
  later = require('later'),
  logger = require('bluesky-logger'),
  serialport = require('serialport'),
  Q = require('q');

var
  env = require('./lib/env'),
  httpProvider = require('./lib/http-provider'),
  prepareProvider = require('./lib/prepare-provider'),
  sensorProvider = require('./lib/sensor-provider'),
  databaseProvider = require('./lib/database-provider');

var
  reader,   // serial port reader
  jobId;    // the later job (for cancel the job)

/**
 * Callback function for receive data from the sensor reader.
 *
 * It is processing many steps by different providers. The processing is executing asynchronously.
 *
 * @param {string} data the plain text with the sensor data.
 * @private
 */
function _onReceiveData(data) {
  logger.info('Receive Data: (size=', _.size(data), ')!');
  Q.fcall(function () {
    return prepareProvider.extractLine(data);
  })
    .then(function (line) {
      return sensorProvider.getSensorList(env.sensor, line);
    })
    .then(function (sensorList) {
      return _traceStep('Sensor List (extract)', sensorList);
    })
    .then(function (sensorList) {
      return httpProvider.sendSensorList(env.server, sensorList);
    })
    .then(function (sensorList) {
      return _traceStep('Sensor List (after send)', sensorList);
    })
    .then(function (sensorList) {
      return databaseProvider.saveSensorList(env.database, sensorList);
    })
    .done(
      function (insertIdList) {
        if (insertIdList) {
          logger.info('Process the sensor dates: ', insertIdList);
        }
      },
      function (reason) {
        logger.warn('Warning (Sensor)');
        logger.warn(reason);
      }
    );
}

function _onScheduleSensor() {
  logger.debug('schedule sensor list');
  Q.fcall(function () {
    return databaseProvider.getSensorList(env.database);
  })
  .then(function (sensorList) {
    return _traceStep('SensorList (status <> "UPDATED")', sensorList);
  })
  .then(function (sensorList) {
    return httpProvider.sendSensorList(env.server, sensorList);
  })
  .then(function (sensorList) {
    return _traceStep('Sensor List (after send)', sensorList);
  })
  .then(function (sensorList) {
    return databaseProvider.updateSensorList(env.database, sensorList);
  })
  .done(
    function (result) {
      logger.info('schedule sensor list finish: ', result);
    },
    function (reason) {
      logger.warn('Warning (Schedule)');
      logger.warn(reason);
    }
  );
}

/**
 * Print out the result JSON object
 *
 * @param {string} message the log trace messsage
 * @param {*} result the JSON object that trace out
 * @returns {*} the unmodified result JSON object.
 * @private
 */
function _traceStep(message, result) {
  logger.trace(message, ' ', JSON.stringify(result, null, 4));
  return result;
}

/**
 * Shutdown the sensor reader app. If the signal "kill" or "Ctrl-C" is send to the node process,
 * then it finish the reading
 * @private
 */
function _shutdown(sigName) {
  if (reader) {
    logger.info(sigName, ': Finish...');
    // stop the schedule job
    jobId.clear();
    reader.close(function (err) {
      if (err) {
        logger.warn(sigName, ': Shutdown with error: ', err);
      }
      else {
        logger.info(sigName, ': Shutdown');
      }
      logger.info('\n\n');
      process.exit(0);
    });
  }
}

/**
 * The main entry point of the sensor reader.
 *
 * @private
 */
function _main() {

  var
    sched = later.parse.recur().every(2).minute();

  // starts the schedule job with later...
  jobId = later.setInterval(_onScheduleSensor, sched);

  // create serialport object
  reader = new serialport.SerialPort(env.port.name, {
    baudrate: env.port.baudrate,
    parser: serialport.parsers.readline(env.port.separator)
  });

  reader.on('open', function () {
    logger.config('Open serial Port "', env.port.name, '" with sensor reader "', env.sensor.groupId, '"');
    reader.on('data', _onReceiveData);
  });

  // listen for TERM signal .e.g. kill
  process.on('SIGTERM', function () {
    _shutdown('sigterm');
  });

  // listen for INT signal e.g. Ctrl-C
  process.on('SIGINT', function () {
    _shutdown('ctrl+c');
  });
}

//
// starts the sensor reader app
//
_main();
