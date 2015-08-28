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
  imageMin = require('gulp-imagemin');

var
  config = require('./gulp-config').appImages,
  helper = require('./gulp-helper');

function _taskImages() {

  return gulp.src(config.sources)
    .pipe(imageMin(config.options.imageMin))
    .pipe(gulp.dest(helper.getDestPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('app-images', ['clean'], _taskImages);

gulp.task('watch-images', _taskImages);
