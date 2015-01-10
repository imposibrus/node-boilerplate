
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    cssMin = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglifyjs'),
    header = require('gulp-header'),
    pkg = require('./package.json');

gulp.task('stylus', function () {
  gulp.src(['public/css/main.styl'])
      .pipe(stylus())
      .pipe(gulp.dest('public/css'))
      .pipe(livereload());
});

gulp.task('cssmin', function() {
  gulp.src(['public/css/main.css'])
      .pipe(cssMin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', function() {
  gulp.src(['public/js/main.js'])
      .pipe(uglify('main.min.js', {
        outSourceMap: true
      }))
      .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/css/*.styl', ['stylus']);
});

gulp.task('default', ['stylus', 'watch']);
