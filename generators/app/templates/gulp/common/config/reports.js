/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    yuidoc = require('gulp-yuidoc');

var runSequence = require('run-sequence');

gulp.task('reports:clean', function () {
    return gulp
        .src([ options.targetFolderPath + '/yuidoc', options.targetFolderPath + '/report-<%= model.linting %>-checkstyle.xml' ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('reports:doc', function () {
    return gulp
        .src(options.srcFolderPath + '/app/**/*.js')
        .pipe(yuidoc())
        .pipe(gulp.dest(options.targetFolderPath + '/yuidoc'));
});

<%= linting.taskConfiguration %>

module.exports = function() {
    return runSequence('reports:clean', ['reports:doc', 'reports:<%= model.linting %>']);
};

