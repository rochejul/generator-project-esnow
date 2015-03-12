/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),
    copy2 = require('gulp-copy2'),
    babel = require('gulp-babel');

var runSequence = require('run-sequence');

var targetFolder = options.targetFolderPath + '/compiled';

gulp.task('compile:clean', function () {
    return gulp
        .src([ targetFolder ], { 'read': false })
        .pipe(clean({ 'force': true }));
});

gulp.task('compile:copy', function () {
    return copy2([
        { 'src': options.srcFolderPath + '/**/*', 'dest': targetFolder + '/' },
        { 'src': options.nodeModulesFolderPath + '/es6-module-loader/dist/es6-module-loader.js*', 'dest': targetFolder + '/' },
        { 'src': options.nodeModulesFolderPath + '/systemjs/dist/system.js*', 'dest': targetFolder + '/' },
        { 'src': options.nodeModulesFolderPath + '/babel/browser-polyfill.js', 'dest': targetFolder + '/' }
    ]);
});

gulp.task('compile:replace', function () {
    return gulp
        .src([ 'index.html' ], { 'cwd': options.srcFolderPath })
        .pipe(replace('<!-- Inject here ES6 runtime if needed -->', '<script type="text/javascript" charset="UTF-8" src="./es6-module-loader.js"></script><script type="text/javascript" charset="UTF-8" src="./system.js"></script><script type="text/javascript" charset="UTF-8" src="./browser-polyfill.js"></script>'))
        .pipe(gulp.dest(targetFolder));
});

gulp.task('compile:babel', function () {
    return gulp
        .src([ 'app/**/*.js' ], { 'cwd': options.srcFolderPath })
        .pipe(sourcemaps.init())
        .pipe(babel({
            'keepModuleIdExtensions': false,
            'modules': 'system'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/', { 'cwd': targetFolder }));
});

module.exports = function() {
    return runSequence('compile:clean', 'compile:copy', 'compile:replace', 'compile:babel');
};