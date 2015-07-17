
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync').create(),
    cssMin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus', function () {
  return gulp.src(['public/css/main.styl'])
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.stream());
});

gulp.task('cssmin', function() {
  return gulp.src([
    'public/css/main.css'
  ])
      .pipe(sourcemaps.init())
      .pipe(cssMin())
      .pipe(concat('build.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', function() {
  return gulp.src([
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

gulp.task('watch', function(cb) {
  browserSync.init({
    notify: false,
    https: false,
    open: false,
    proxy: 'node-boilerplate.local'
  }, cb);

  process.on('exit', function() {
    browserSync.exit();
  });

  gulp.watch('public/css/*.styl', ['stylus']);
  gulp.watch('views/**/*.jade').on('change', browserSync.reload);
  gulp.watch('public/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['stylus', 'watch']);
gulp.task('deploy', ['stylus', 'cssmin', 'uglify']);
