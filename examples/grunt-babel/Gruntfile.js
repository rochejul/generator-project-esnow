/*jshint node:true */
/*global module: true, __dirname: true */

module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Grunt configuration
    grunt.initConfig(
        require('load-grunt-configs')(
            grunt,
            {
                'targetFolderPath': './target',
                'srcFolderPath': './src',
                'nodeModulesFolderPath': './node_modules',
                'dirname': __dirname
            }
        )
    );

    // A very basic defaukt task.
    grunt.registerTask('default', 'Log some stuff.', function () {
        grunt.log.write('Logging some stuff...').ok();
    });

    // Task for the reports
    grunt.registerTask('reports', [
        'clean:reports',
        'yuidoc:reports',
        'jshint:reports'
    ]);

    // Task for the tests
    grunt.registerTask('tests', [
        'clean:tests',
        'karma:tests'
    ]);

    // Task for the development "light"
	grunt.registerTask('compile', [
        'clean:compile',
        'copy:compile',
        'combine:compile',
        'babel:compile'
    ]);

    // Task for the distribution
    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'babel:dist',
        'uglify:dist',
        'clean:dist-cleaning'
    ]);
};
