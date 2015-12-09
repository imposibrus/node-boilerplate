
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    rename = require("gulp-rename"),
    babel = require('gulp-babel'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config'),
    template = require('gulp-template'),
    pluralize = require('pluralize'),
    sourceMaps = require('gulp-sourcemaps');

gulp.task('generate:model', function() {
  var name = getArgsForCommand('--name')[0],
      pluralForm = pluralize(name),
      modelName = pluralize.singular(name.charAt(0).toUpperCase() + name.slice(1)),
      alreadyExist = fs.existsSync(path.join(__dirname, 'src/models', modelName + '.js')),
      exportTemplate = `export {default as ${modelName}} from './${modelName}';\n`;

  if(alreadyExist && process.argv.indexOf('--force') == -1) {
    console.error('File `src/models/%s.js` already exist. Use `--force` option for override.', modelName);
    return false;
  }

  return gulp.src('gulp-templates/model.tpl')
      .pipe(template({modelName: modelName, pluralForm: pluralForm}))
      .pipe(rename(modelName + '.js'))
      .pipe(gulp.dest('src/models'))
      .on('end', function() {
        var modelsIndexPath = path.join(__dirname, 'src/models/index.js'),
            modelsIndexContent = fs.readFileSync(modelsIndexPath).toString();

        if(modelsIndexContent.indexOf(exportTemplate) == -1) {
          modelsIndexContent += exportTemplate;
          fs.writeFileSync(modelsIndexPath, modelsIndexContent);
        }
      });
});

gulp.task('generate:router', function() {
  var name = getArgsForCommand('--name')[0],
      alreadyExist = fs.existsSync(path.join(__dirname, 'src/routes', name + '.js')),
      importTemplate = `import ${name} from './${name}';\n`;

  if(alreadyExist && process.argv.indexOf('--force') == -1) {
    console.error('File `src/routes/%s.js` already exist. Use `--force` option for override.', name);
    return false;
  }

  return gulp.src('gulp-templates/router.js')
      .pipe(template({}))
      .pipe(rename(name + '.js'))
      .pipe(gulp.dest('src/routes'))
      .on('end', function() {
        var routesIndexPath = path.join(__dirname, 'src/routes/index.js'),
            routesIndexContent = fs.readFileSync(routesIndexPath).toString();

        if(routesIndexContent.indexOf(importTemplate) == -1) {
          routesIndexContent = routesIndexContent.replace('const router', importTemplate + '\nconst router');
          routesIndexContent = routesIndexContent.replace('export default router;', `router.use('/${name}', ${name});` + '\n\nexport default router;');
          fs.writeFileSync(routesIndexPath, routesIndexContent);
        }
      });
});

var getArgsForCommand = function(command) {
  var startIndex = process.argv.indexOf(command);
  return process.argv.slice(startIndex + 1);
};

gulp.task('webpack', function() {
  return gulp.src('public/js/main.js')
      .pipe(webpackStream(webpackConfig))
      .pipe(sourceMaps.init())
      .pipe(sourceMaps.write('.'))
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
  return gulp.src(['src/**/*.js'])
      .pipe(babel())
      .pipe(gulp.dest('dst'))
      .on('error', console.error);
});

gulp.task('babel:bin', function() {
  return gulp.src(['src/bin/www'])
      .pipe(babel())
      .pipe(rename('bin/www'))
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
  gulp.watch('src/**/*.js', ['babel:server']);
  gulp.watch('src/bin/www', ['babel:bin']);
  gulp.watch('views/**/*.jade').on('change', browserSync.reload);
  gulp.watch('public/js/**/*.js', ['webpack']);
  gulp.watch('public/build/**/*.js').on('change', browserSync.reload);
  gulp.watch('public/build/**/*.css').on('change', browserSync.reload);
});

gulp.task('babel', ['babel:server', 'babel:bin']);
gulp.task('default', ['webpack', 'genBlocks', 'babel', 'watch']);
gulp.task('deploy', ['webpack', 'genBlocks', 'babel']);
