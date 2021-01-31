'use strict';

const gulp = require('gulp');
const run = require('gulp-run-command').default;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer');
const sass = require('gulp-dart-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const mqpacker = require('@lipemat/css-mqpacker');
const terser = require('gulp-terser');


gulp.task('cordova-watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js').on('change', gulp.series('copy-js'));
    run('cordova run browser --live-reload')();
});

// Copy MaterializeCSS + jQuery JS-files
gulp.task('js', function () {
    return gulp.src(['node_modules/@materializecss/materialize/dist/js/materialize.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(newer('./www/js'))
        .pipe(notify({message: 'Copy JS files'}))
        .pipe(gulp.dest('./www/js'));
});

// Copy src-files
gulp.task('copy-js', function () {
    return gulp.src('./src/js/**/*.js')
        //.pipe(newer('./www/js'))
        .pipe(gulp.dest('./www/js/'));
});

// Compile sass into CSS (/www/css/) & auto-inject into browser
gulp.task('sass', function () {
    const processors = [
        mqpacker({sort: true})
    ];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'SASS compile error!',
                message: '<%= error.message %>'
            })
        }))
        .pipe(sourcemaps.init())
        // outputStyle: nested (default), expanded, compact, compressed
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefix("last 2 versions"))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/css'));
});

// Optimize CSS just before publishing
gulp.task('minify-css', function () {
    return gulp.src('./www/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./www'));
});

// Optimize JS just before publishing
gulp.task('minify-js', function () {
    return gulp.src('./src/js/**/*.js')
        //.pipe(sourcemaps.init())
        .pipe(terser())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/js/'));
});


gulp.task('default', gulp.series('js', 'copy-js', 'sass', 'cordova-watch'));
gulp.task('minify', gulp.series('minify-css', 'minify-js'));
gulp.task('publish', gulp.series('js', 'sass', 'minify-css', 'minify-js'));