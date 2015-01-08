/** Regular npm dependendencies */
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var pkg = require('./package.json');

/** Gulp dependencies */
var jshint = require('gulp-jshint');

/** Grab-bag of build configuration. */
var config = {
    jsVendorFiles: [
        './bower_components/angular/angular.js'
    ],
    jsAppFiles: [
        // base services
        './app.js'
    ]
};


/** *****************************************
 * Default Task
 ** ***************************************** */
gulp.task('default', ['validate']);

/** *****************************************
 * Tasks for javascript validation
 ** ***************************************** */
gulp.task('validate', function() {
    return gulp.src(config.jsAppFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-summary')()));
});

/** *****************************************
 * Tasks for Watch features
 ** ***************************************** */
gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*', ['default']);
});
