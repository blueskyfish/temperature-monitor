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
  bump = require('gulp-bump'),
  gulpIf = require('gulp-if'),

  config = require('./gulp-config').version,
  helper = require('./gulp-helper');


gulp.task('version-bump', function () {
  return gulp.src(config.sources)
    .pipe(gulpIf(helper.isDestribution(), bump(config.options.bump)))
    .pipe(gulp.dest(config.dest));
});
