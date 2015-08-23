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
  gulp = require('gulp');

var
  config = require('./gulp-config').vendorFonts,
  helper = require('./gulp-helper');

gulp.task('vendor-fonts', ['clean'], function () {

  return gulp.src(config.sources)
    .pipe(gulp.dest(helper.getDestPath(config.dest)));
});
