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


// Build the all sources
gulp.task('app-build', [
  'app-styles',           // collect, generate & concat the application styles
  'app-style-images',     //
  'app-jshint',
  'app-scripts',          // collect & concat the application scripts
  // TODO 'app-translate',        // collect all translation json files
  'app-index',            // copy & optimize the index.html
  //'app-templates',        // collects the html templates & insert to templateCache
  'app-images',           // copy & optimize the images
  'app-translate',        // copy and minifiy the translation files
  'vendor-fonts',         // copy the awesome fonts
  'vendor-scripts',       // collect & concat the vendor scripts
  'vendor-styles',        // collect & concat the vendor styles
  'vendor-style-images',  //
  'modernizr'             // copy & uglify the modernizr script
]);
