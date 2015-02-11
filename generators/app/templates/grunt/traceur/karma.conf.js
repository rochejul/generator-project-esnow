/*jshint node:true, strict:false */
/*global module: true */

'use strict';

// Karma traceur framework & preprocessor
var traceur = require('traceur');

function createTraceurPreprocessor(args, config, logger, helper) { // Inspired from https://github.com/karma-runner/karma-traceur-preprocessor
    config = config || {};

    var log = logger.create('preprocessor.traceur');
    var defaultOptions = {
        sourceMaps: false,
        modules: 'amd'
    };

    var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

    var transformPath = args.transformPath || config.transformPath || function(filepath) {
            return filepath.replace(/\.es6.js$/, '.js').replace(/\.es6$/, '.js');
        };

    var moduleName = args.moduleName || config.moduleName;

    return function(content, file, done) {
        log.debug('Processing "%s".', file.originalPath);
        file.path = transformPath(file.originalPath);

        var filename = file.originalPath;
        var duplicatedOptions = helper.merge({ }, options);

        if (moduleName) {
            duplicatedOptions.moduleName = moduleName(file.originalPath, file.path);
        }

        var transpiledContent;
        var compiler = new traceur.NodeCompiler(duplicatedOptions);

        try {
            transpiledContent = compiler.compile(content, filename);

        } catch (e) {
            log.error(e);
            done(new Error('TRACEUR COMPILE ERROR\n', e.toString()));
        }

        return done(null, transpiledContent);
    };
}

createTraceurPreprocessor.$inject = ['args', 'config.traceurPreprocessor', 'logger', 'helper'];


function initTraceurFramework(files) {
    files.unshift({pattern: traceur.RUNTIME_PATH, included: true, served: true, watched: false});
}

initTraceurFramework.$inject = ['config.files'];

// Karma configuration

/**
 * Karma configuration
 * For running tests under PhantomJs, Chrome ... with Jasmine.
 * For generating reports compliant for jUnit, CheckStyle, Cobertura ...
 */
module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        'basePath': './',

        // frameworks to use
        'frameworks': ['jasmine', 'traceur'],

        // list of files / patterns to load in the browser
        'files': [
            'node_modules/es6-module-loader/dist/es6-module-loader.src.js',
            'node_modules/systemjs/dist/system.src.js',
            { 'pattern': 'src/app/**/*', 'included': true },
            { 'pattern': 'test/**/*Spec.js', 'included': true },
            'test/system.conf.js'
        ],

        // list of files to exclude
        'exclude': [ ],

        // Plugins
        'plugins': [ // See http://stackoverflow.com/questions/16905945/can-you-define-custom-plugins-for-karma-runner
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            { 'preprocessor:traceur': ['factory', createTraceurPreprocessor] },
            { 'framework:traceur': ['factory', initTraceurFramework] }
        ],

        // Preprocessors
        'preprocessors': {
            'src/**/*.js': ['traceur', 'coverage'],
            'test/**/*Spec.js': ['traceur']
        },

        'traceurPreprocessor': {
            'options': {
                'modules': 'instantiate',
                'sourceMaps': 'inline'
            },
            'transformPath': function(path) {
                return path.replace(/\.es6$/, '.js');
            },
            'moduleName': function (path) {
                var tempPath = path.substr(__dirname.length + 1);

                if (tempPath.indexOf('src/') === 0) {
                    tempPath = tempPath.substr(4);
                }

                return tempPath.substr(0, tempPath.length - 3);
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        'reporters': ['progress'],

        // web server port
        'port': 9876,

        // cli runner port
        'runnerPort': 9100,

        // enable / disable colors in the output (reporters and logs)
        'colors': true,

        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        'logLevel': config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        'autoWatch': false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        'browsers': ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        'captureTimeout': 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        'singleRun': true
    });
};