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
  http = require('http'),
  url = require('url');

var
  _ = require('lodash'),
  logger = require('bluesky-logger'),
  Q = require('q');

var
  httpStatus = require('./http-status'),
  sensorStatus = require('./sensor-status');



function _sendData(config, sensor) {
  var
    defer = Q.defer(),
    postData = JSON.stringify(sensor),
    httpServer = url.parse(config.url),
    options = {
      hostname: httpServer.hostname,
      port:     httpServer.port || 80,
      path:     httpServer.path,
      method:   'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': postData.length
      }
    };
  var
    req = http.request(options, function (res) {

      logger.debug('"', config.url, '" StatusCode=' + res.statusCode);

      if (httpStatus.getCode(res.statusCode) >= httpStatus.HTTP_BAD_REQUEST) {
        logger.warn('"', config.url, '" StatusCode=', res.statusCode, ' -> ', res.statusMessage);
        // resolve the unchanged sensor data.
        defer.resolve(sensor);
        return;
      }

      res.setEncoding('utf8');
      res.on('data', function (data) {

        logger.trace('Response: ', data);

        try {
          // try to parse into a JSON object
          var
            result = JSON.parse(data);

          if (result && result.status === 'okay' && result.id) {

            // uploaded sensor data is stored in the server
            logger.debug('Uploaded sensor data: ', result.id);
            // update the sensor status
            sensor.status = sensorStatus.UPLOADED;
          }

          defer.resolve(sensor);
        } catch (e) {

          logger.warn('could not parse the response data into a JSON object. ', e);
          // resolve the unchanged sensor data.
          defer.resolve(sensor);
        }

      });
    });

  req.on('error', function(e) {

    logger.warn('"', config.url, '" problem with request: ' + e.message);

    // resolve the unchanged sensor data.
    defer.reject(sensor);
  });

  // write the post data
  req.write(postData);
  req.end();

  return defer.promise;
}

/**
 * @class HttpProvider
 * @description
 * Manages the connection to the external server
 */
var provider = module.exports = {
  name: 'http-provider'
};

/**
 * @method sendSensorList
 * @description
 * Sends the sensor dates to the server. If the sending is successful, then the sensor dates is extended with the
 * status "UPLOADED", otherwise there is not status properties
 *
 * @param {object} config the config object for the request instance
 * @param {Array<object> } sensorList the ist of sensor dates.
 * @returns {Array<object>} the sensor list with the sensor status.
 */
provider.sendSensorList = function (config, sensorList) {
  var
    promiseList = [];

  _.forEach(sensorList, function (sensor) {
    promiseList.push(_sendData(config, sensor));
  });

  return Q.all(promiseList);
};
