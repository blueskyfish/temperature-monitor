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
	gIf = require('gulp-if'),
	jsonMini = require('gulp-jsonminify');

var
	config = require('./gulp-config').appTranslate,
	helper = require('./gulp-helper');

function _taskTranslate() {
	return gulp.src(config.sources)
		.pipe(gIf(helper.isDestribution(), jsonMini()))
		.pipe(gulp.dest(helper.getDestPath(config.dest)))
		.pipe(connect.reload());
}

gulp.task('app-translate', ['clean'], _taskTranslate);

gulp.task('watch-translate', _taskTranslate);
