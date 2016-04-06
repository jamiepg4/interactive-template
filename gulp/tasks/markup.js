var gulp = require('gulp');
var config = require('../config').markup;
var browserSync  = require('browser-sync');
var mustache = require('gulp-mustache');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(mustache('text.json'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
