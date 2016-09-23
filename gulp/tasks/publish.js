var gulp = require('gulp');
var execSync = require('child_process').execSync;
var p = require('../../package.json');

gulp.task('publish', ['dist'], function() {
    execSync('aws s3 sync ./dist/ ' + p.publishUrl);
});
