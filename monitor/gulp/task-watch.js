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
  config = require('./gulp-config');

gulp.task('watch', function () {

  gulp.watch(config.appScripts.sources, ['watch-jshint', 'watch-scripts']);
  gulp.watch(config.appStyles.sources, ['watch-styles']);
  gulp.watch(config.appStyleImages.sources, ['watch-style-images']);
  gulp.watch(config.appTemplates.sources, ['watch-templates']);
  // TODO gulp.watch(config.appTranslate.sources, ['watch-translate']);
  gulp.watch(config.appIndex.sources, ['watch-index']);
  gulp.watch(config.appImages.sources, ['watch-images']);
});
