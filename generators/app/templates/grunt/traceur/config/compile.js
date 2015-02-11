/*jshint node:true */
/*global module: true */

// Compile configuration
module.exports = function(grunt, options){
    'use strict';
	
	var
        path = require('path'),
        traceur = require('traceur'),
        fs = require('fs'),
        targetFolder = options.targetFolderPath + '/compiled';

    grunt.registerTask('compile-traceur-compilation', 'Compile for traceur', function () {
        var done = this.async();

        grunt.file.expand(['src/app/**/*.js']).forEach(function (file) {
            grunt.log.writeln('Compile with traceur: ' + file);

            var filename = file.substr(4),
                compiler = new traceur.NodeCompiler({
                    'experimental': true,
                    'modules': 'instantiate',
                    'moduleName': filename.substr(0, filename.length - 3),
                    'sourceMaps': 'inline'
                });

            var
                inputFilePath = compiler.normalize(file),
                outputFilePath = compiler.normalize(targetFolder + '/' + filename),
                content = fs.readFileSync(file);

            grunt.file.mkdir(path.dirname(outputFilePath));
            fs.writeFileSync(
                outputFilePath,
                compiler.write(
                    compiler.transform(
                        compiler.parse(
                            content.toString(),
                            inputFilePath
                        ),
                        undefined,
                        inputFilePath
                    ),
                    inputFilePath
                )
            );
        });

        done();
    });

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
                            'src': ['es6-module-loader.*'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        },
                        {
                            'expand': true,
                            'cwd': options.nodeModulesFolderPath + '/systemjs/dist',
                            'src': ['system.*'],
                            'dest': targetFolder + '/',
                            'flatten': false
                        },
                        {
                            'expand': true,
                            'cwd': options.nodeModulesFolderPath + '/traceur/bin',
                            'src': ['traceur*.js'],
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
                            'string': '<script type="text/javascript" charset="UTF-8" src="./traceur-runtime.js"></script><script type="text/javascript" charset="UTF-8" src="./es6-module-loader.js"></script><script type="text/javascript" charset="UTF-8" src="./system.js"></script>'
                        }
                    ]
                }
            }
        }
    };
};