var gulp = require('gulp');
var execSync = require('exec-sync');
var util = require('gulp-util');
var p = require('../../package.json');

gulp.task('clear-server', ['dist'], function() {
    execSync('gsutil -m rm "' + p.publishUrl + '**"', true);
});

gulp.task('update-server', ['clear-server'], function() {
    execSync('gsutil -m cp -R ./dist/** ' + p.publishUrl, true);
});

gulp.task('publish', ['update-server'], function() {
    util.log(util.colors.green('Published:'), " >>> ", util.colors.red(p.previewUrl));
});