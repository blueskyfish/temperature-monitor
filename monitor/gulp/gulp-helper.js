/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

var
  path = require('path');

var
  _ = require('lodash'),
  gulpUtil = require('gulp-util'),
  dateformat = require('dateformat');

var
  adjust = require('./gulp-adjust');

var
  MODE_ENUM = ['dev', 'test', 'prod'],
  mMode = adjust((gulpUtil.env.mode || '??'), MODE_ENUM);

function _getRootPath() {
  switch(mMode) {
    case 'test':
      return 'dest/test';
    case 'prod':
      return 'dest/prod';
    default:
      return 'bin';
  }
}

function _getDestPath(filename) {
  if (!filename) {
    return _getRootPath();
  }
  return path.join(_getRootPath(), filename);
}

function _log(args) {
  var
    time = '[' + dateformat(new Date(), 'HH:MM:ss') + '] ';

  args.unshift(time);
  console.log(args.join(''));
}

// YOUR_TASK: change the baseUrl / connectPath
function _getContextPath() {
  switch(mMode) {
    case 'test':
    case 'prod':
      return 'dest/' + mMode;
    default:
      return '/monitor/';
  }
}

//
// Public API for "gulp-helper"
//
module.exports = {

  /**
   * @name isDestribution
   * @description
   * Returns the destribution flag. If the value is true, then the gulp
   * task for destribution is running.
   *
   * @return {bool}
   */
  isDestribution: function () {
    return MODE_ENUM.indexOf(mMode) > 0;
  },

  /**
   * @name getDestPath
   * @description
   * Expands the give filename with the destribution path.
   *
   * @param {string} [filename] the filename or empty
   * @return {string} the full name.
   */
  getDestPath: function (filename) {
    return _getDestPath(filename);
  },

  /**
   * @name getMode
   * @description
   * Returns the current mode. The value is one of "dev", "test" or "prod"
   *
   * @return {string}
   */
  getMode: function () {
    return mMode;
  },

  /**
   * @name getRootPath
   * @description
   * Returns the root path of the destionation.
   *
   * @return {string}
   */
  getRootPath: function () {
    return _getRootPath();
  },

  /**
   * @name getContextPath
   * @description
   * Returns the contextPath (or baseUrl)
   *
   * @return {string}
   */
  getContextPath: function () {
    return _getContextPath();
  },

  /**
   * @name getArchiveFilename
   * @description
   * Returns the filename for the zip archive.
   *
   * @return {string}
   */
  getArchiveFilename: function () {
    return dateformat(new Date(), 'yyyymmddHHMMss') + '-<%= appName %>.zip';
  },

  /**
   * @name log
   * @description
   * Write the log message to the console.
   */
  log: function () {
    _log(_.toArray(arguments));
  }
};
