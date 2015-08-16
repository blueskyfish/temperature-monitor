/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

var
  _ = require('lodash'),
  logger = require('bluesky-logger'),
  mysql = require('mysql'),
  Q = require('q');

var
  SQL_INSERT = 'INSERT INTO `sensor-local` SET ?';

function _openConnection(config) {
  var
    conn = mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      database: config.name
    });
  conn.connect();
  return conn;
}

function _adjustSensorData(sensor) {
  var
    data = {};

  _.forEach(sensor, function (value, name) {
    switch (name) {
      case 'nameId':
        data['name_id'] = value;
        break;
      case 'groupId':
        data['group_id'] = value;
        break;
      default:
        data[name] = value;
        break;
    }
  });
  return data;
}

function _insertExecute(conn, sensor) {
  var
    defer = Q.defer();

  logger.trace('Insert Start...');

  conn.query(SQL_INSERT, _adjustSensorData(sensor), function (err, result) {

    if (err) {
      logger.trace('Insert with error: ', err);
      defer.reject(err);
      return;
    }

    logger.trace('Insert Result: ', JSON.stringify(result, null, 4));
    defer.resolve(result.insertId);
  });

  return defer.promise;
}

/**
 * @class DatabaseProvider
 * @description
 * Save the sensor data
 */
var provider = module.exports = {
  name: 'database-provider'
};


provider.saveSensorList = function (config, sensorList) {
  var
    conn = _openConnection(config),
    promiseList = [];

  logger.trace('save sensor list:');
  _.forEach(sensorList, function (sensor) {
    logger.trace('Before Insert: ', JSON.stringify(sensor));
    promiseList.push(_insertExecute(conn, sensor));
  });

  return Q.all(promiseList).then(
    function (result) {
      logger.info('Insert ', result);
      conn.end();
      return result;
    },
    function (reason) {
      logger.warn('Insert ', reason);
      conn.end();
      return Q.reject(new Error('storage is failed'));
    }
  );
};
