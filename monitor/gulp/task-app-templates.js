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
  gulpIf = require('gulp-if'),
  htmlMin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
  templates = require('gulp-ng-templates'),
  uglify = require('gulp-uglify');

var
  config = require('./gulp-config').appTemplates,
  helper = require('./gulp-helper');

function taskTemplates() {

  config.options.templates.filename = config.name;

  return gulp.src(config.sources)
    .pipe(htmlMin(config.options.htmlMin))
    .pipe(templates(config.options.templates))
    .pipe(gulpIf(helper.isDestribution(), uglify()))
    .pipe(gulpIf(helper.isDestribution(), rename(config.minify)))
    .pipe(gulp.dest(helper.getDestPath(config.dest)))
    .pipe(connect.reload());
}

gulp.task('app-templates', ['clean'],  taskTemplates);

gulp.task('watch-templates', taskTemplates);
