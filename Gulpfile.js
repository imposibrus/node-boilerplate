
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*', 'webpack-stream']
    }),
    webpackConfig = require('./webpack.config'),
    tsConfig = require('./tsconfig.json');

gulp.task('webpack', function() {
  return gulp.src('public/js/main.ts')
      .pipe($.webpackStream(webpackConfig))
      .pipe(gulp.dest('public/build'));
});

gulp.task('genBlocks', ['webpack'], function() {
  var manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'build', 'webpack-assets.json'))),
      scriptsJade = [
        'script(src="/public/build/'+ manifest['commons.chunk']['js'] +'")',
        'script(src="/public/build/'+ manifest['main']['js'] +'")'
      ].join('\n'),
      stylesJade = [
        'link(rel="stylesheet", href="/public/build/'+ manifest['main']['css'] +'")'
      ].join('\n');

  fs.writeFileSync(path.join(__dirname, 'views', 'blocks', '_styles.jade'), stylesJade);
  fs.writeFileSync(path.join(__dirname, 'views', 'blocks', '_scripts.jade'), scriptsJade);
});

gulp.task('babel:server', function() {
  return gulp.src(['src/**/*.ts', 'definitions/**.ts'])
      .pipe($.typescript(tsConfig.compilerOptions))
      .pipe($.rename(function(path) {
        if(path.basename + path.extname == 'www.js') {
          path.extname = '';
        }
      }))
      .pipe(gulp.dest('dst'))
      .on('error', console.error);
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

  gulp.watch('public/css/*.styl', ['webpack']);
  gulp.watch('src/**/*.ts', ['babel:server']);
  gulp.watch('views/**/*.jade').on('change', browserSync.reload);
  gulp.watch('public/js/**/*.ts', ['webpack']);
  gulp.watch('public/build/**/*.js').on('change', browserSync.reload);
  gulp.watch('public/build/**/*.css').on('change', browserSync.reload);
});

require('./gulp-dev-tasks')(gulp);

gulp.task('babel', ['babel:server']);
gulp.task('default', ['webpack', 'genBlocks', 'babel', 'watch']);
gulp.task('deploy', ['webpack', 'genBlocks', 'babel']);
