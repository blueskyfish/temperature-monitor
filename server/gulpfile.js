/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Purpose:
 * For distributing.
 */

'use strict';

var
  del = require('del'),
  dateformat = require('dateformat'),
  ejs = require('gulp-ejs'),
  gulp = require('gulp'),
  minimist = require('minimist'),
  rename = require('gulp-rename');

var
  pkg = require('./package.json'),
  params = minimist(process.argv.slice(2)),
  target = params.target || '',

// The name of the config file for the distribution
  configFile = 'app/config/' + target + '.config.php';

var
  model = {
    target: target,
    datetime: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
    version: pkg.version
  },
  settings = {
    ext: '.php'
  };

gulp.task('clean', function () {
  del(['dist'], function (err, paths) {
  });
});


gulp.task('check-target', ['clean'], function () {
  if (target === '') {
    console.log('');
    console.log('missing parameter "--target=name"');
    console.log('cancel!!');
    console.log('');
    process.exit(1);
  }
});

gulp.task('config-file', ['clean'], function () {

  return gulp.src(configFile)
    .pipe(ejs(model, settings))
    .pipe(rename('config.php'))
    .pipe(gulp.dest('dist/config'));

});

gulp.task('copy-htaccess', ['clean'], function () {

  return gulp.src(['app/.htaccess'])
    .pipe(ejs(model, { ext: ''}))
    .pipe(gulp.dest('dist'));

});

gulp.task('copy-index', ['clean'], function () {

  return gulp.src(['app/index.php'])
    .pipe(ejs(model, settings))
    .pipe(gulp.dest('dist'));

});

gulp.task('copy-libraries', ['clean'], function () {

  return gulp.src(['app/lib/*.php'])
    .pipe(ejs(model, settings))
    .pipe(gulp.dest('dist/lib'));

});

gulp.task('copy-slim', ['clean'], function () {

  return gulp.src('app/Slim/**/**')
    .pipe(gulp.dest('dist/Slim'));
});

/**
 * Build a distribution
 */
gulp.task('build', [
  'clean',
  'check-target',
  'config-file',
  'copy-index',
  'copy-htaccess',
  'copy-libraries',
  'copy-slim'
]);

/**
 * Default Task (help)
 */
gulp.task('default', function () {
  console.log('');
  console.log('Sensor Server');
  console.log('');
  console.log('Usage:');
  console.log('   gulp build --target=name   create a distribution with the config file of the target');
  console.log('   gulp clean                 delete the distribution folder');
});
