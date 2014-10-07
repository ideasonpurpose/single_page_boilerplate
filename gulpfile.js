/* jshint node: true, unused: true */
'use strict';

var gulp = require('gulp');
var sass = require('node-sass');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var webserver = require('gulp-webserver');
var del = require('del');

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

gulp.task('webserver', ['build', 'stage'], function() {
  return gulp.src('build')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', ['webserver'], function() {
  return gulp.watch('source/**', ['build', 'stage']);
});