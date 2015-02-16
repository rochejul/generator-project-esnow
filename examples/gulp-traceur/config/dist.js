/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    copy2 = require('gulp-copy2');

var runSequence = require('run-sequence'),
    through2 = require('through2'),
    path = require('path'),
    fs = require('fs'),
    traceur = require('traceur');

var targetFolder = options.targetFolderPath + '/dist',
    separatorREgEx = new RegExp('\\' + path.sep, 'g');

/**
 * Return a gulp pipe for the traceur process
 *
 * @method
 * @private
 * @returns {Function}
 */
function _traceurGulpStream() {
    return through2.obj(function (file, enc, cb) {
        var
            filePath = file.path.substr(options.dirname.length + 1), // To be on the root folder
            filename = filePath.substr(4), // To be on the src folder
            compiler = new traceur.NodeCompiler({
                'experimental': true,
                'modules': 'instantiate',
                'moduleName': filename.substr(0, filename.length - 3).replace(separatorREgEx, '/')
            }),
            inputFilePath = compiler.normalize(filePath);

        try {
            file.contents = new Buffer(compiler.write(
                compiler.transform(
                    compiler.parse(
                        fs.readFileSync(file.path).toString(),
                        inputFilePath
                    ),
                    undefined,
                    inputFilePath
                ),
                inputFilePath
            ));

            this.push(file);
            cb();

        } catch (e) {
            this.emit('error', new gutil.PluginError('gulp-traceur', 'Exit code with ' + e));
            this.push(file);
            cb();
        }
    });
}

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

gulp.task('dist:traceur', function () {
    return gulp
        .src([ 'app/**/*.js' ], { 'cwd': options.srcFolderPath })
        .pipe(_traceurGulpStream())
        .pipe(gulp.dest('app/', { 'cwd': targetFolder }));
});

gulp.task('dist:uglify', function () {
    return gulp
        .src([
            options.nodeModulesFolderPath + '/traceur/bin/traceur*.js',
            options.nodeModulesFolderPath + '/es6-module-loader/dist/es6-module-loader.src.js',
            options.nodeModulesFolderPath + '/systemjs/dist/system.src.js',
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
    return runSequence('dist:clean', 'dist:copy', 'dist:traceur', 'dist:uglify', 'dist:clean:after');
};