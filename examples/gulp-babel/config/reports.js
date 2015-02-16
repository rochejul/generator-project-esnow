/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    yuidoc = require('gulp-yuidoc'),
    jshint = require('gulp-jshint'),
    jshintXMLReporter = require('gulp-jshint-xml-file-reporter');

var runSequence = require('run-sequence');

gulp.task('reports:clean', function () {
    return gulp
        .src([ options.targetFolderPath + '/yuidoc', options.targetFolderPath + '/report-jshint-checkstyle.xml' ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('reports:doc', function () {
    return gulp
        .src(options.srcFolderPath + '/app/**/*.js')
        .pipe(yuidoc())
        .pipe(gulp.dest(options.targetFolderPath + '/yuidoc'));
});

gulp.task('reports:jshint', function () {
    return gulp
        .src(options.srcFolderPath + '/app/**/*.js')
        .pipe(jshint({ 'lookup': true }))
        .pipe(jshint.reporter(jshintXMLReporter))
        .on('end', jshintXMLReporter.writeFile({
            'format': 'checkstyle',
            'filePath': options.targetFolderPath + '/report-jshint-checkstyle.xml'
        }));
});

module.exports = function() {
    return runSequence('reports:clean', ['reports:doc', 'reports:jshint']);
};

