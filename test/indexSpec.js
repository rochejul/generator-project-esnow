/*global require: true, describe: true, it: true, before: true*/

/**
 * Tests around the generator itself
 *
 * @see http://yeoman.io/authoring/testing.html
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('generator tests - ', function () {
	'use strict';

    var
        APP_PATH = '../generators/app',
        TARGET_PATH = '../target/generator-tests';

	var path = require('path'),
        yeoman = require('yeoman-generator'),
        helpers = yeoman.test,
        assert = yeoman.assert,
        GeneratorModel = require('../generators/app/model');

    describe('esnow generator should copy based files, like ', function () {
        before(function (done) {
            helpers
                .run(path.join( __dirname, APP_PATH))
                .inDir(path.join( __dirname, TARGET_PATH))
                .withPrompts(new GeneratorModel().toJSON())
                .on('end', done);
        });

        it('node files', function () {
            assert.file(['package.json', '.npmrc']);
        });

        it('git files', function () {
            assert.file(['.gitattributes', '.gitignore']);
        });

        it('bower files', function () {
            assert.file(['bower.json', '.bowerrc']);
        });

        it('tests files', function () {
            assert.file(['karma.conf.js', 'test/indexSpec.js', 'test/utils/userSpec.js']);
        });

        it('app files', function () {
            assert.file(['src/main.js', 'src/app/index.js', 'src/app/models/user.js', 'src/app/utils/user.js']);
        });
    });

    describe('and the option "createProjectFolder" ', function () {
        describe('with the value to false should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel().toJSON())
                    .on('end', done);
            });

            it('create into the current folder', function () {
                assert.file(['package.json']);
            });
        });

        describe('with the value to true should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'createProjectFolder': true }).toJSON())
                    .on('end', done);
            });

            it('create a sub folder', function () {
                assert.file(['esnow-project/package.json']);
            });
        });
    });

    describe('Check when we use the grunt build system ', function () {
        describe('with 6to5 should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel().toJSON())
                    .on('end', done);
            });

            it('contains a Gruntfile.js file', function () {
                assert.file(['Gruntfile.js']);
            });

            it('contains a dependency to 6to5', function () {
                assert.fileContent('package.json', /(6to5)/g);
            });
        });

        describe('with babel should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'transpiler': GeneratorModel.TRANSPILER_ENUM.BABEL }).toJSON())
                    .on('end', done);
            });

            it('contains a Gruntfile.js file', function () {
                assert.file(['Gruntfile.js']);
            });

            it('contains a dependency to babel', function () {
                assert.fileContent('package.json', /(babel)/g);
            });
        });

        describe('with traceur should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR }).toJSON())
                    .on('end', done);
            });

            it('contains a Gruntfile.js file', function () {
                assert.file(['Gruntfile.js']);
            });

            it('contains a dependency to traceur', function () {
                assert.fileContent('package.json', /(traceur)/g);
            });
        });
    });

    describe('Check when we use the gulp build system ', function () {
        describe('with 6to5 should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GULP }).toJSON())
                    .on('end', done);
            });

            it('contains a gulpfile.js file', function () {
                assert.file(['gulpfile.js', 'gulp-options.js']);
            });

            it('contains a dependency to 6to5', function () {
                assert.fileContent('package.json', /(6to5)/g);
            });
        });

        describe('with babel should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GULP, 'transpiler': GeneratorModel.TRANSPILER_ENUM.BABEL }).toJSON())
                    .on('end', done);
            });

            it('contains a gulpfile.js file', function () {
                assert.file(['gulpfile.js', 'gulp-options.js']);
            });

            it('contains a dependency to babel', function () {
                assert.fileContent('package.json', /(babel)/g);
            });
        });

        describe('with traceur should ', function () {
            before(function (done) {
                helpers
                    .run(path.join( __dirname, APP_PATH))
                    .inDir(path.join( __dirname, TARGET_PATH))
                    .withPrompts(new GeneratorModel({ 'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GULP, 'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR }).toJSON())
                    .on('end', done);
            });

            it('contains a gulpfile.js file', function () {
                assert.file(['gulpfile.js', 'gulp-options.js']);
            });

            it('contains a dependency to traceur', function () {
                assert.fileContent('package.json', /(traceur)/g);
            });
        });
    });
});