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
  jshint = require('gulp-jshint');

var
  config = require('./gulp-config').appScripts,
  helper = require('./gulp-helper');


function taskJsHint() {
  return gulp.src(config.sources)
    .pipe(jshint(config.options.jshint))
    .pipe(jshint.reporter('default'));
}

gulp.task('app-jshint', ['clean'], taskJsHint);

gulp.task('watch-jshint', taskJsHint);
