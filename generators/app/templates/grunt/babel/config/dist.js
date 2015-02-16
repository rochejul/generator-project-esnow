/*jshint node:true */
/*global module: true */

// Compile configuration
module.exports = function(grunt, options){
    'use strict';
	
	var targetFolder = options.targetFolderPath + '/dist',
        uglifyObj = { };

    uglifyObj[targetFolder + '/main.js'] = [
        options.nodeModulesFolderPath + '/es6-module-loader/dist/es6-module-loader.src.js',
        options.nodeModulesFolderPath + '/systemjs/dist/system.src.js',
        options.nodeModulesFolderPath + '/babel/browser-polyfill.js',
        targetFolder + '/app/**/*.js',
        options.srcFolderPath + '/main.js'
    ];

    return {
        'tasks': {
            'clean': {
                'dist': {
                    'src': [targetFolder]
                },
                'dist-cleaning': {
                    'src': [targetFolder + '/app']
                }
            },

            'copy': {
                'dist': {
                    'files': [
                        {
                            'expand': true,
                            'cwd': options.srcFolderPath + '/',
                            'src': ['**/*', '!app/'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        }
                    ]
                }
            },

			'babel': {
                'dist': {
                    'options': {
                        'modules': 'system',
                        'keepModuleIdExtensions': false,
                        'moduleIds': true,
                        'sourceMap': false,
                        'sourceRoot': 'src/app',
                        'moduleRoot': 'app'
                        // command to launch manually:
                        // > 6to5 src/app --modules system --module-ids --source-root src/app --module-root app --out-file ../target/dist-6to5/main.js
                    },
					'files': [
						{
                            'expand': true,
                            'cwd': options.srcFolderPath + '/app',
                            'src': ['**/*.js'],
                            'dest': targetFolder + '/app',
                            'flatten': false
                        }
					]
                }
		   },

            'uglify': {
                'dist': {
                    'options': {
                        'toplevel': true,
                        'ascii_only': true,
                        'beautify': false,
                        'max_line_length': 10000,
                        'defines': {
                            'DEBUG': ['name', 'false']
                        },
                        'mangle': true
                    },
                    'files': uglifyObj
                }
            }
        }
    };
};