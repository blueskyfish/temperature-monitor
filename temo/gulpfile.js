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
  configFile = 'shares/config/' + target + '.config.php';

var
  model = {
    target: target,
    datetime: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
    version: pkg.version
  },
  settings = {
    ext: '.php'
  };


gulp.task('clean', function (done) {
  del(['dist'], function (err, paths) {
    done();
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
    .pipe(gulp.dest('dist/shares/config'));
});

gulp.task('copy-server-htaccess', ['clean'], function () {
  return gulp.src(['server/.htaccess'])
    .pipe(ejs(model, { ext: ''}))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('copy-server-index', ['clean'], function () {
  return gulp.src(['server/index.php'])
    .pipe(ejs(model, settings))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('copy-server-library', ['clean'], function () {
  return gulp.src('server/lib/*.php')
    .pipe(ejs(model, settings))
    .pipe(gulp.dest('dist/server/lib'));
});

gulp.task('copy-libraries', ['clean', 'copy-libaries-htaccess'], function () {
  return gulp.src(['shares/lib/*.php'])
    .pipe(ejs(model, settings))
    .pipe(gulp.dest('dist/shares/lib'));
});

gulp.task('copy-libaries-htaccess', ['clean'], function () {
  return gulp.src(['shares/.htaccess'])
    .pipe(ejs(model, { ext: ''}))
    .pipe(gulp.dest('dist/shares'));
});

gulp.task('copy-slim', ['clean'], function () {
  return gulp.src('shares/Slim/**/**')
    .pipe(gulp.dest('dist/shares/Slim'));
});

gulp.task('copy-index', ['clean'], function () {
  return gulp.src('index.html')
    .pipe(ejs(model, { ext: 'html'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-all', [
  'config-file',
  'copy-server-index',
  'copy-server-htaccess',
  'copy-server-library',
  'copy-libraries',
  'copy-slim',
  'copy-index'
]);

/**
 * Build a distribution
 */
gulp.task('build', [
  'check-target',
  'copy-all'
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
