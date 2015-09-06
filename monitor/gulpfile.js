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
  requireDir = require('require-dir');

var
  helper = require('./gulp/gulp-helper');

requireDir('./gulp');

gulp.task('before', function () {
  helper.log('Temperature Monitor (Webapp)');
  helper.log('');
  helper.log('Parameter:');
  helper.log('  destinationPath:  ', helper.getDestPath());
  helper.log('  destribution:     ', helper.isDestribution());
  helper.log('  running Mode:     ', helper.getMode());
});

gulp.task('serve', ['before', 'connect', 'watch']);

gulp.task('dest', ['before', 'archive', 'version-bump']);

gulp.task('default', function () {
  helper.log('Temperature Monitor (Webapp)');
  helper.log('');
  helper.log('Usage:');
  helper.log('  serve                     start application on "http://localhost:9700"');
  helper.log('  dest --mode=test|prod     destribution of the application with the running mode');
});
