/*jshint node:true */
/*global module: true */

// Server configuration
module.exports = function (grunt, options) {
    'use strict';

    return {
        'tasks': {
            'clean': {
                'reports': {
                    'src': [options.targetFolderPath + '/yuidoc', options.targetFolderPath + '/report-jshint-checkstyle.xml']
                }
            },

            // JsDoc or similare, lia YuiDoc, Docxygen ...
            'yuidoc': {
                'reports': {
                    'name': 'ES6 application demo documentation>',
                    'description': 'An example of doc generation for ES6/7 apps',
                    'version': '1.0.0',
                    'options': {
                        'paths': options.srcFolderPath + '/app',
                        'outdir': options.targetFolderPath + '/yuidoc'
                    }
                }
            },

            // JsHint part
            'jshint': {
                'options': {
                    'force': true,
                    'reporter': 'checkstyle',
                    'reporterOutput': options.targetFolderPath + '/report-jshint-checkstyle.xml',
                    'jshintrc': true // See https://github.com/jshint/jshint/blob/master/examples/.jshintrc
                },
                'reports': {
                    'src': [options.srcFolderPath + '/**/*.js', '!' + options.srcFolderPath + '/bower_components/**/*']
                }
            }
        }
    };
};

