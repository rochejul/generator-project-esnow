/*jshint node:true */
/*global module: true */

// Compile configuration
module.exports = function(grunt, options){
    'use strict';
	
	var
        path = require('path'),
        traceur = require('traceur'),
        fs = require('fs'),
        targetFolder = options.targetFolderPath + '/dist',
        uglifyObj = { };

    uglifyObj[targetFolder + '/main.js'] = [
        options.nodeModulesFolderPath + '/traceur/bin/traceur.js',
        options.nodeModulesFolderPath + '/es6-module-loader/dist/es6-module-loader.src.js',
        options.nodeModulesFolderPath + '/systemjs/dist/system.src.js',
        targetFolder + '/app/**/*.js',
        options.srcFolderPath + '/main.js'
    ];

    grunt.registerTask('dist-traceur-compilation', 'Compile for traceur', function () {
        var done = this.async();

        grunt.file.expand(['src/app/**/*.js']).forEach(function (file) {
            grunt.log.writeln('Compile with traceur: ' + file);

            var filename = file.substr(4),
                compiler = new traceur.NodeCompiler({
                    'experimental': true,
                    'modules': 'instantiate',
                    'moduleName': filename.substr(0, filename.length - 3)
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