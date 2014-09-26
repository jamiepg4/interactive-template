var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var jsonminify = require('gulp-jsonminify');
var revall = require('gulp-rev-all');
var clean = require('gulp-clean');

gulp.task('clean', ['build'], function() {
    return gulp.src('./dist', {read: false})
                .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('./build/**')
            .pipe(revall({ignore: [/^\/favicon.ico$/g, /^\/index.html/g]}))
            .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['copy'], function() {

    gulp.src('./dist/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src('./dist/app.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));

    gulp.src(['./dist/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'));

});