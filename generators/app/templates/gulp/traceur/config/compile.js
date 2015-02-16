/*jshint node:true */
/*global require: true, module: true */

'use strict';

var options = require('../gulp-options.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),
    copy2 = require('gulp-copy2');

var runSequence = require('run-sequence'),
    through2 = require('through2'),
    path = require('path'),
    fs = require('fs'),
    traceur = require('traceur');

var targetFolder = options.targetFolderPath + '/compiled',
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
        { 'src': options.nodeModulesFolderPath + '/traceur/bin/traceur*.js', 'dest': targetFolder + '/' }
    ]);
});

gulp.task('compile:replace', function () {
    return gulp
        .src([ 'index.html' ], { 'cwd': options.srcFolderPath })
        .pipe(replace('<!-- Inject here ES6 runtime if needed -->', '<script type="text/javascript" charset="UTF-8" src="./traceur-runtime.js"></script><script type="text/javascript" charset="UTF-8" src="./es6-module-loader.js"></script><script type="text/javascript" charset="UTF-8" src="./system.js"></script>'))
        .pipe(gulp.dest(targetFolder));
});

gulp.task('compile:traceur', function () {
    return gulp
        .src([ 'app/**/*.js' ], { 'cwd': options.srcFolderPath })
        .pipe(sourcemaps.init())
        .pipe(_traceurGulpStream())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/', { 'cwd': targetFolder }));
});

module.exports = function() {
    return runSequence('compile:clean', 'compile:copy', 'compile:replace', 'compile:traceur');
};