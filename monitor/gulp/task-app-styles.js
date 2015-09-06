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
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  gulpIf = require('gulp-if'),
  less = require('gulp-less'),
  minCSS = require('gulp-minify-css'),
  rename = require('gulp-rename');

var
  config = require('./gulp-config').appStyles,
  helper = require('./gulp-helper');

function taskAppStyles() {

  return gulp.src(config.sources)
    .pipe(less(config.options.less))
    .pipe(concat(config.name))
    .pipe(gulpIf(helper.isDestribution(), minCSS(config.options.miniCSS)))
    .pipe(gulpIf(helper.isDestribution(), rename(config.minify)))
    .pipe(gulp.dest(helper.getDestPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('app-styles', ['clean'], taskAppStyles);

gulp.task('watch-styles', taskAppStyles);
