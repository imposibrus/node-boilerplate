
const gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
    }),
    tsProject = $.typescript.createProject('src/tsconfig.json');

gulp.task('compile:server', () => {
    return gulp.src(['src/**/*.ts', 'definitions/**.ts'])
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'compile:server',
                    message: err.message,
                };
            })
        }))
        .pipe(tsProject())
        .pipe($.rename((path) => {
            if (path.basename + path.extname === 'www.js') {
                path.extname = '';
            }
        }))
        .pipe(gulp.dest('dst'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', gulp.series('compile:server'));
});

gulp.task('compile', gulp.series('compile:server'));
gulp.task('default', gulp.parallel('compile', 'watch'));
gulp.task('build', gulp.parallel('compile'));
