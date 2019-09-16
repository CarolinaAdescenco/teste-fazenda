'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('browser-sync', gulp.series(function () {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
    gulp.watch(['./src/stylesheets/*.scss', './*.html'], gulp.series(['sass'])).on('change', browserSync.reload);
    gulp.watch(['./src/javascripts/*.js', './*.html'], gulp.series(['min-js'])).on('change', browserSync.reload);
}));

gulp.task('min-js', gulp.series(function () {
    return gulp.src('./src/javascripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(gulp.dest('./public/javascripts'))
}));

gulp.task('sass', gulp.series(function () {
    return gulp.src('./src/stylesheets/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/stylesheets'));
}));

gulp.task('minify-html', function () {
    return gulp.src('./index.html')
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('default', gulp.series(['browser-sync']));