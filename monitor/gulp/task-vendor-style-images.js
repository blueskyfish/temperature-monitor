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
  connect = require('gulp-connect'),
  imageMin = require('gulp-imagemin');

var
  config = require('./gulp-config').vendorStyleImages,
  helper = require('./gulp-helper');


gulp.task('vendor-style-images', ['clean'], function () {

  return gulp.src(config.sources)
    .pipe(imageMin(config.options.imageMin))
    .pipe(gulp.dest(helper.getDestPath(config.dest)))
    .pipe(connect.reload());
});
