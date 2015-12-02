var gulp = require('gulp');
var config = require('../gulp.paths');


require('./tasks/scss')(config.scss);

gulp.task('watch', function () {
    gulp.watch(config.scss.base + "**/*", ['scss']);
});

gulp.task('default', ['scss']);