
var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    gulp = require('gulp'),
    Promise = require('bluebird'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackCompiler = require('webpack')(require('./webpack.config')),
    {GenStylesLinks, GenScriptsLinks} = require('./gulpTemplateLinkGen'),
    readFileAsync = Promise.promisify(fs.readFile),
    writeFileAsync = Promise.promisify(fs.writeFile),
    buildDir = path.join(__dirname, 'public', 'build'),
    viewsDir = path.join(__dirname, 'views');

gulp.task('webpack', (cb) => {
    webpackCompiler.run(cb);
});

gulp.task('genBlocks', (cb) => {
    readFileAsync(path.join(buildDir, 'webpack-assets.json')).then((data) => {
        let manifest;

        try {
            manifest = JSON.parse(data.toString());
        } catch (err) {
            return cb(err);
        }

        return Promise.join(
            writeFileAsync(path.join(viewsDir, 'blocks', '_styles.pug'), new GenStylesLinks(manifest, 'main').gen()),
            writeFileAsync(path.join(viewsDir, 'blocks', '_scripts.pug'), new GenScriptsLinks(manifest, 'main').gen())
        ).then(() => {
            cb();
        });
    }).catch(cb);
});

gulp.task('babel:server', () => {
  return gulp.src(['src/**/*.js'])
      .pipe(babel())
      .pipe(gulp.dest('dst'))
      .on('error', console.error);
});

gulp.task('babel:bin', () => {
  return gulp.src(['src/bin/www'])
      .pipe(babel())
      .pipe(rename('bin/www'))
      .pipe(gulp.dest('dst'))
      .on('error', console.error);
});

gulp.task('watch', (cb) => {
    let webpackWatcher;

    browserSync.init({
        notify: false,
        https: false,
        open: false,
        online: false,
        reloadThrottle: 500,
        proxy: {
            target: 'node-boilerplate.local',
            middleware: [
                webpackHotMiddleware(webpackCompiler),
                (req, res, next) => {
                    const fileName = path.basename(url.parse(req.url).pathname);

                    /hot-update.(js|js\.map|json)$/.test(fileName) && res.on('finish', () => {
                        setTimeout(() => {
                            fs.unlink(path.join(buildDir, fileName), (err) => {
                                if (err) {
                                    console.error(err);
                                    // return;
                                }

                                // console.log('removed', fileName);
                            });
                        }, 5000);
                    });
                    next();
                }
            ]
        },
        files: [
            'views/**/*.pug',
            'public/build/**/*.css',
            'dst/**/*.js'
        ]
    }, () => {
        webpackWatcher = webpackCompiler.watch({
            aggregateTimeout: 300,
            poll: 1000
        }, (err, stats) => {
            // console.log('webpack watch cb', stats.toJson());
        });

        cb();
    });

    process.on('exit', () => {
        webpackWatcher.close();
        browserSync.exit();
    });

    gulp.watch('src/**/*.ts', gulp.series('babel:server'));
    gulp.watch('public/build/webpack-assets.json', gulp.series('genBlocks'));
});

gulp.task('babel', gulp.parallel('babel:server', 'babel:bin'));
gulp.task('build', gulp.parallel(gulp.series('webpack', 'genBlocks'), 'babel'));
gulp.task('default', gulp.parallel('babel', 'watch'));
