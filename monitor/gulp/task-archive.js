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
  zip = require('gulp-zip');

var
  config = require('./gulp-config').appArchive,
  helper = require('./gulp-helper');

gulp.task('archive', ['app-build'], function () {

  var
    filename = helper.getArchiveFilename(),
    options = {
      cwd: helper.getRootPath(),
      cwdbase: true
    };


  return gulp.src(config.source, options)
    .pipe(zip(filename))
    .pipe(gulp.dest(config.dest));
});
