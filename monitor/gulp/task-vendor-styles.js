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
  minCSS = require('gulp-minify-css'),
	rename = require('gulp-rename');

var
	config = require('./gulp-config').vendorStyles,
	helper = require('./gulp-helper');


gulp.task('vendor-styles', ['clean'], function () {

	return gulp.src(config.sources)
		.pipe(concat(config.name))
		.pipe(gulpIf(helper.isDestribution(), minCSS(config.options.miniCSS)))
		.pipe(gulpIf(helper.isDestribution(), rename(config.minify)))
		.pipe(gulp.dest(helper.getDestPath(config.dest)));
});
