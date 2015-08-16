/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

//
// Config Object
//
module.exports = {

  // The logger section
  log: {
    level: 'debug' // (or 'all', 'warn', 'info', 'config', 'debug', 'trace', 'none')
  },

  // The serial port section
  port: {
    name: '/dev/ttyXX',                                             // the device name of the sensor reader
    baudrate: 9600,                                                 // don't change this value
    separator: '\r\n'                                               // the line end separator
  },

  // The sensor section
  sensor: {

    // group id of the sensor reader
    groupId: 1000

  },

  // The MySQL database server section
  database: {
    // database name
    name: 'database',
    host: 'localhost',                                              // the host of the server
    port: 3306,                                                     // the port of the server
    user: 'dbuser',                                                 // the database user
    pass: 'dbpassword'                                              // the passwort of the database user
  },

  // The external server section
  server: {
    url: 'http://domain.com/index.php/sensor/upload'                // url to the external server
  }

};
