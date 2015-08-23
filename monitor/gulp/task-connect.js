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
  gulp = require('gulp'),
  connect = require('gulp-connect');

var
  helper = require('./gulp-helper'),
  config = require('./gulp-config').connect;

var
  rootPaths = config.rootPaths.concat(helper.getRootPath());

gulp.task('connect', ['app-build'], function () {
  connect.server({
    livereload: true,
    root: rootPaths,
    port: config.port
    // here is the place for adding the middlewares
  });
});
