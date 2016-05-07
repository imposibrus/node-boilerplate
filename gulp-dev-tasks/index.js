
var fs = require('fs'),
    path = require('path'),
    pluralize = require('pluralize'),
    $ = require('gulp-load-plugins')();

module.exports = function(gulp) {
  gulp.task('generate:model', function() {
    var name = getArgsForCommand('--name')[0],
        pluralForm = pluralize(name),
        modelName = pluralize.singular(name.charAt(0).toUpperCase() + name.slice(1)),
        alreadyExist = fs.existsSync(path.join(__dirname, '../src/models', modelName + '.js')),
        exportTemplate = `export {default as ${modelName}} from './${modelName}';\n`;

    if(alreadyExist && process.argv.indexOf('--force') == -1) {
      console.error('File `src/models/%s.js` already exist. Use `--force` option for override.', modelName);
      return false;
    }

    return gulp.src('gulp-dev-tasks/gulp-templates/model.tpl')
        .pipe($.template({modelName: modelName, pluralForm: pluralForm}))
        .pipe($.rename(modelName + '.js'))
        .pipe(gulp.dest('src/models'))
        .on('end', function() {
          var modelsIndexPath = path.join(__dirname, '../src/models/index.ts'),
              modelsIndexContent = fs.readFileSync(modelsIndexPath).toString();

          if(modelsIndexContent.indexOf(exportTemplate) == -1) {
            modelsIndexContent += exportTemplate;
            fs.writeFileSync(modelsIndexPath, modelsIndexContent);
          }
        });
  });

  gulp.task('generate:router', function() {
    var name = getArgsForCommand('--name')[0],
        alreadyExist = fs.existsSync(path.join(__dirname, '../src/routes', name + '.js')),
        importTemplate = `import ${name} from './${name}';\n`;

    if(alreadyExist && process.argv.indexOf('--force') == -1) {
      console.error('File `src/routes/%s.js` already exist. Use `--force` option for override.', name);
      return false;
    }

    return gulp.src('gulp-dev-tasks/gulp-templates/router.js')
        .pipe($.template({}))
        .pipe($.rename(name + '.js'))
        .pipe(gulp.dest('src/routes'))
        .on('end', function() {
          var routesIndexPath = path.join(__dirname, '../src/routes/index.ts'),
              routesIndexContent = fs.readFileSync(routesIndexPath).toString();

          if(routesIndexContent.indexOf(importTemplate) == -1) {
            routesIndexContent = routesIndexContent.replace('const router', importTemplate + '\nconst router');
            routesIndexContent = routesIndexContent.replace('export default router;', `router.use('/${name}', ${name});` + '\n\nexport default router;');
            fs.writeFileSync(routesIndexPath, routesIndexContent);
          }
        });
  });
};

var getArgsForCommand = function(command) {
  var startIndex = process.argv.indexOf(command);
  return process.argv.slice(startIndex + 1);
};
