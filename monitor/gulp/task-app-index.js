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
  extend = require('extend'),
  processHtml = require('gulp-processhtml'),
  ejs = require('gulp-ejs'),
  htmlMin = require('gulp-htmlmin'),
  gulpIf = require('gulp-if'),
  dateformat = require('dateformat');

var
  config = require('./gulp-config').appIndex,
  helper = require('./gulp-helper');

var
  view = {
    lastModified: dateformat('ddd, dd mmm yyyy HH:MM:ss GMT'),
    contextPath: helper.getContextPath()
  },
  options = extend({}, view),
  settings = {
    ext: '.html'
  };

function taskAppIndex() {

  return gulp.src(config.sources)
    .pipe(ejs(options, settings))
    .pipe(gulpIf(helper.isDestribution(), processHtml()))
    .pipe(gulpIf(helper.isDestribution, htmlMin(config.options.htmlMin)))
    .pipe(gulp.dest(helper.getDestPath()))
    .pipe(connect.reload());
}

gulp.task('app-index', ['clean'], taskAppIndex);

gulp.task('watch-index', taskAppIndex);
