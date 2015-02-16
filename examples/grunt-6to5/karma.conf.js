/*jshint node:true, strict:false */
/*global module: true, __dirname: true */

// Karma configuration

/**
 * Karma configuration
 * For running tests under PhantomJs, Chrome ... with Jasmine.
 * For generating reports compliant for jUnit, CheckStyle, Cobertura ...
 */
module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        'basePath': './',

        // frameworks to use
        'frameworks': ['jasmine'],

        // list of files / patterns to load in the browser
        'files': [
            'node_modules/es6-module-loader/dist/es6-module-loader.src.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/6to5/browser-polyfill.js',
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
            'karma-6to5-preprocessor'
        ],

        // Preprocessors
        'preprocessors': {
            'src/**/*.js': ['6to5', 'coverage'],
            'test/**/*Spec.js': ['6to5']
        },

        '6to5Preprocessor': {
            'options': {
                'experimental': 'true',
                'sourceMap': 'inline',
                'modules': 'system',
                'keepModuleIdExtensions': false,
                'moduleIds': true,
                'sourceRoot': __dirname.replace(/\\/g, '/') + '/src/app',
                'moduleRoot': 'app'
            },
            'filename': function(file) {
                //return file.originalPath.replace(/\.js$/, '.es5.js');
                if (file.originalPath.indexOf('/test/') >= 0) {
                    return file.originalPath.substr(file.originalPath.indexOf('test/'));
                }

                return file.originalPath;
            },
            'sourceFileName': function(file) {
                if (file.originalPath.indexOf('/test/') >= 0) {
                    return file.originalPath.substr(file.originalPath.indexOf('test/'));
                }

                return file.originalPath;
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