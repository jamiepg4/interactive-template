var gulp = require('gulp');
var execSync = require('child_process').execSync;
var p = require('../../package.json');

gulp.task('clear-server', ['dist'], function() {
    execSync('gsutil -m rm "' + p.publishUrl + '**"', true);
});

gulp.task('publish', ['clear-server'], function() {
    execSync('gsutil -m cp -R ./dist/** ' + p.publishUrl, true);
});