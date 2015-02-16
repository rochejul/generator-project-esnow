/*jshint node:true */
/*global module: true */

// Tests configuration
module.exports = function (grunt, options) {
    'use strict';

    return {
        'tasks': {
            // Karma part
            'karma': {
                'tests': {
                    'configFile': 'karma.conf.js',
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
                }
            },

            // Other parts
            'clean': {
                'tests': {
                    'src': [options.targetFolderPath + '/coverage-reports', options.targetFolderPath + '/report-test-junit.xml']
                }
            }
        }
    };
};