var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var jsonminify = require('gulp-jsonminify');
var clean = require('gulp-clean');
var revall = require('gulp-rev-all');
var util = require('gulp-util');
var p = require('../../package.json');

gulp.task('clean', ['build'], function() {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('./build/**')
            .pipe(revall({
                ignore: [/^\/favicon.ico$/g, /^\/index.html/g, /^\/images/g],
                prefix: global.previewUrl || p.previewUrl
            }))
            .pipe(gulp.dest('dist'));
});

gulp.task('analytics', ['copy'], function() {

    var analyticsId = 4270;
    util.log(util.colors.green('Analytics ID:'), " >>> ", util.colors.red(p.postId));

    var analyticsUrl = "http://fusion.net/?post_type=fusion_interactive&p=" + analyticsId + "&analytics";

});

gulp.task('dist', ['analytics'], function() {

    gulp.src(['./dist/**/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'));

    gulp.src('./dist/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));

    return gulp.src('./dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});