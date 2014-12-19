/* jshint node: true, unused: true */
'use strict';

/**
 * Node core modules
 */
var http = require('http');


/**
 * npm packaged modules
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('node-sass');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');
var chalk = require('chalk');
var del = require('del');
var connect = require('connect');
var connectLiveReload = require('connect-livereload');
var serveStatic = require('serve-static');


/**
 * Constants
 */
var LOCAL_PORT = 9001;

gulp.task('build', ['images', 'normalize', 'fonts'], function() {
  var css = sass.renderSync({
    file: 'source/scss/styles.scss',
    outputStyle: 'compressed'
  });
  return gulp.src('source/*.html')
    .pipe(replace('/* INSERT_CSS_HERE */', css))
    .pipe(gulp.dest('build'));
});

gulp.task('stage', ['build'], function() {
  return gulp.src('build/**')
    .pipe(gulp.dest('/Users/joe/Sites/iop/rwjf'));
});

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('fonts', function() {
  return gulp.src('source/fonts/*.eot')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('normalize', function() {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(rename('_lib/_normalize.scss'))
    .pipe(replace('/*!', '/*'))
    .pipe(gulp.dest('source/scss'));
});

gulp.task('images', function() {
  return gulp.src('source/images/*')
    .pipe(gulp.dest('build/images'));
});

/**
 * webserver - start up a livereload-enabled webserver.
 * The connect-livereload middleware injects the livereload snippet
 */
gulp.task('webserver', ['build', 'stage'], function() {
  var reporter = function() {
    gutil.log(
      "Local webserver listening on:",
      chalk.magenta(LOCAL_PORT),
      '(http://localhost:' + LOCAL_PORT + ')'
    );
  };
  var app = connect()
    .use(connectLiveReload())
    .use(serveStatic('build'));
  http.createServer(app).listen(LOCAL_PORT, null, null, reporter);
});

/**
 * watch - rebuild on changes to files in source, live-reload changed filed
 */
gulp.task('watch', ['webserver'], function() {
  livereload.listen();
  gulp.watch('source/**/*', ['build', 'stage'])
  gulp.watch('build/**/*')
    .on('change', livereload.changed)

});