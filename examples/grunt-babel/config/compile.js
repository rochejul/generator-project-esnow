/*jshint node:true */
/*global module: true */

// Compile configuration
module.exports = function(grunt, options){
    'use strict';
	
	var targetFolder = options.targetFolderPath + '/compiled';

    return {
        'tasks': {
            'clean': {
                'compile': {
                    'src': [targetFolder]
                }
            },

            'copy': {
                'compile': {
                    'files': [
                        {
                            'expand': true,
                            'cwd': options.srcFolderPath + '/',
                            'src': ['**'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        },
                        {
                            'expand': true,
                            'cwd': options.nodeModulesFolderPath + '/es6-module-loader/dist',
                            'src': ['es6-module-loader.js*'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        },
                        {
                            'expand': true,
                            'cwd': options.nodeModulesFolderPath + '/systemjs/dist',
                            'src': ['system.js*'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        },
                        {
                            'expand': true,
                            'cwd': options.nodeModulesFolderPath + '/babel',
                            'src': ['browser-polyfill.js'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        }
                    ]
                }
            },

            'combine': {
                'compile': {
                    'input': targetFolder + '/index.html',
                    'output': targetFolder + '/index.html',
                    'tokens': [
                        {
                            'token': '<!-- Inject here ES6 runtime if needed -->',
                            'string': '<script type="text/javascript" charset="UTF-8" src="./es6-module-loader.js"></script><script type="text/javascript" charset="UTF-8" src="./system.js"></script><script type="text/javascript" charset="UTF-8" src="./browser-polyfill.js"></script>'
                        }
                    ]
                }
            },
			
			'babel': {
                'compile': {
                    'options': {
                        'sourceMap': 'inline',
                        'keepModuleIdExtensions': false,
                        'modules': 'system'/*,
                        'resolveModuleSource': function (originalSource) { // https://github.com/6to5/6to5/issues/471
                            return originalSource;
                        }*/
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
		  }
        }
    };
};