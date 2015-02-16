/*jshint node:true */
/*global require: true, process: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean');

var lodash = require('lodash'),
    karma = require('karma').server,
    through2 = require('through2'),
    runSequence = require('run-sequence');

/**
 * Return a gulp pipe for the Karma process
 *
 * @method
 * @private
 * @returns {Function}
 */
function _karmaGulpStream(options) {
    return through2.obj(function (file, enc, cb) {
        var extendedOptions = lodash.extend({ }, options, { 'configFile': file.path });

        karma.start(
            extendedOptions,
            function (exitCode) {
                if (exitCode) {
                    this.emit('error', new gutil.PluginError('gulp-karma', 'Exit code with ' + exitCode));
                    this.push(file);
                    cb();

                } else {
                    this.push(file);
                    cb();
                }

            }.bind(this)
        );
    });
}

gulp.task('tests:clean', function () {
    return gulp
        .src([ options.targetFolderPath + '/coverage-reports', options.targetFolderPath + '/report-test-junit.xml' ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('tests:karma', function () {
    return gulp
        .src([options.dirname + '/karma.conf.js'])
        .pipe(_karmaGulpStream({
            'runnerPort': 9999,
            'singleRun': true,
            'browsers': ['PhantomJS'],
            'reporters': ['progress', 'junit', 'coverage'],
            'junitReporter': {
                'outputFile': options.targetFolderPath + '/report-test-junit.xml',
                'suite': 'unit'
            },
            'coverageReporter': {
                'type': 'cobertura',
                'dir': options.targetFolderPath + '/coverage-reports',
                'file': 'report-test-cobertura.xml'
            }
        }));
});

gulp.task('tests', ['tests:clean', 'tests:karma'], function () {
    process.exit(0);
});

module.exports = function() {
    return runSequence('tests:clean', 'tests:karma', function () {
        process.exit(0);
    });
};