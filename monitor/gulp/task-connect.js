/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

var
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  modRewrite = require('connect-modrewrite');

var
  helper = require('./gulp-helper'),
  config = require('./gulp-config').connect;

var
  rootPaths = config.rootPaths.concat(helper.getRootPath());

gulp.task('connect', ['app-build'], function () {
  connect.server({
    livereload: true,
    root: rootPaths,
    port: config.port,
    middleware: function () {
      return [
        modRewrite(config.options.default.rewriteRules)
      ];
    }
  });
});
