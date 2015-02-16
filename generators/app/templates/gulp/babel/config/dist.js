/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    copy2 = require('gulp-copy2'),
    babel = require('gulp-babel');

var runSequence = require('run-sequence');

var targetFolder = options.targetFolderPath + '/dist';

gulp.task('dist:clean', function () {
    return gulp
        .src([ targetFolder ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('dist:clean:after', function () {
    return gulp
        .src([ targetFolder + '/app' ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('dist:copy', function () {
    return copy2([
        { 'src': options.srcFolderPath + '/**/*', 'dest': targetFolder + '/' }
    ]);
});

gulp.task('dist:babel', function () {
    return gulp
        .src([ 'app/**/*.js' ], { 'cwd': options.srcFolderPath })
        .pipe(babel({
            'modules': 'system',
            'keepModuleIdExtensions': false,
            'moduleIds': true,
            'sourceMap': false,
            'sourceRoot': 'src/app',
            'moduleRoot': 'app'
        }))
        .pipe(gulp.dest('app/', { 'cwd': targetFolder }));
});

gulp.task('dist:uglify', function () {
    return gulp
        .src([
            options.nodeModulesFolderPath + '/es6-module-loader/dist/es6-module-loader.src.js',
            options.nodeModulesFolderPath + '/systemjs/dist/system.src.js',
            options.nodeModulesFolderPath + '/babel/browser-polyfill.js',
            targetFolder + '/app/**/*.js',
            options.srcFolderPath + '/main.js'
        ])
        .pipe(uglify({
            'mangle': true,
            'output': {
                'ascii_only': true,
                'beautify': false
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(targetFolder + '/'));
});

module.exports = function() {
    return runSequence('dist:clean', 'dist:copy', 'dist:babel', 'dist:uglify', 'dist:clean:after');
};