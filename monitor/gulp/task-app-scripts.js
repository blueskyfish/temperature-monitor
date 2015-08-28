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
  gulpIf = require('gulp-if'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect');

var
  config = require('./gulp-config').appScripts,
  helper = require('./gulp-helper');

function taskAppScripts() {
  return gulp.src(config.sources)
    .pipe(concat(config.name))
    .pipe(gulpIf(helper.isDestribution(), uglify(config.options.uglify)))
    .pipe(gulpIf(helper.isDestribution(), rename(config.minify)))
    .pipe(gulp.dest(helper.getDestPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('app-scripts', ['clean'], taskAppScripts);

gulp.task('watch-scripts', taskAppScripts);
