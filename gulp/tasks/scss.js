var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
module.exports = function(config) {

    gulp.task('scss', function () {
        gulp.src(config.src)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', function(){}))
            .pipe(prefix("last 5 version", "> 1%", "ie 8", "ie 7"))
            .pipe(sourcemaps.write(config.distBase))
            .pipe(gulp.dest(config.dist));
    });
};