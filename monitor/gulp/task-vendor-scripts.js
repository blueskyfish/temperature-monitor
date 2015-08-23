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
  concat = require('gulp-concat'),
  gulpIf = require('gulp-if'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var
  config = require('./gulp-config').vendorScripts,
  helper = require('./gulp-helper');

gulp.task('vendor-scripts', ['clean'], function () {

  return gulp.src(config.sources)
    .pipe(concat(config.name))
    .pipe(gulpIf(helper.isDestribution(), uglify()))
    .pipe(gulpIf(helper.isDestribution(), rename(config.minify)))
    .pipe(gulp.dest(helper.getDestPath(config.dest)));
});
