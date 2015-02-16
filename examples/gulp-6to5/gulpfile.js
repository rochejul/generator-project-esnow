/*jshint node: true */
/*global require: true*/

/**
 * Gulp file declaration
 */

'use strict';

var gulp = require('gulp');

// Load grunt tasks automatically
require('gulp-load-tasks')('config');

// A very basic defaukt task.
gulp.task('default', function () {
    console.log('Logging some stuff...');
});