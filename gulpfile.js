
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    cssMin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus', function () {
  gulp.src(['public/css/main.styl'])
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/css'))
      .pipe(livereload());
});

gulp.task('cssmin', function() {
  gulp.src([
    'public/css/main.css'
  ])
      .pipe(sourcemaps.init())
      .pipe(cssMin())
      .pipe(concat('build.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', function() {
  gulp.src([
    'public/bower_components/noty/js/noty/packaged/jquery.noty.packaged.min.js',
    'public/js/plugins.js',
    'public/js/main.js'
  ])
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('build.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/css/*.styl', ['stylus']);
  gulp.watch('views/**/*.jade').on('change', livereload.changed);
  gulp.watch('public/js/**/*.js').on('change', livereload.changed);
});

gulp.task('default', ['stylus', 'watch']);
gulp.task('deploy', ['stylus', 'cssmin', 'uglify']);
