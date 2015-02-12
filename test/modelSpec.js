/*global require: true, describe: true, it: true*/

/**
 * Tests around the model
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('model tests - ', function () {
	'use strict';

	var chai = require('chai'),
        GeneratorModel = require('../generators/app/model');

	it('should exports', function () {
		chai.expect(GeneratorModel).to.exist();
	});

    describe('and the constructor should ', function () {
        it('set the default values when no values are set as parameter', function () {
            chai.expect(new GeneratorModel().toJSON()).to.deep.equal({
                'createProjectFolder': false,
                'projectName': 'esnow-project',
                'projectDescription': null,
                'projectVersion': '1.0.0',
                'transpiler': GeneratorModel.TRANSPILER_ENUM.SIXTOFIVE,
                'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT,
                'downloadDependencies': false
            });
        });

        describe('use the values give as parameter ', function () {
            it('with partials default parameters', function () {
                var passedValues = {
                    'createProjectFolder': true,
                    'projectName': 'my-project',
                    'projectDescription': 'a description',
                    'projectVersion': '2.0.0',
                    'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR,
                    'buildSystem': null,
                    'downloadDependencies': true
                };

                chai.expect(new GeneratorModel(passedValues).toJSON()).to.deep.equal(passedValues);
            });

            it('without partials default parameters', function () {
                var passedValues = {
                    'projectName': 'my-project',
                    'projectVersion': '2.0.0',
                    'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR,
                    'downloadDependencies': true
                };

                chai.expect(new GeneratorModel(passedValues).toJSON()).to.deep.equal({
                    'createProjectFolder': false,
                    'projectName': 'my-project',
                    'projectDescription': null,
                    'projectVersion': '2.0.0',
                    'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR,
                    'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT,
                    'downloadDependencies': true
                });
            });
        });
    });

	describe('and the method "toJSON" should ', function () {
		it('exists', function () {
			chai.expect(GeneratorModel.prototype.toJSON).to.exist();
		});

		it('return default values when no changes were done', function () {
            chai.expect(new GeneratorModel().toJSON()).to.deep.equal({
                'createProjectFolder': false,
                'projectName': 'esnow-project',
                'projectDescription': null,
                'projectVersion': '1.0.0',
                'transpiler': GeneratorModel.TRANSPILER_ENUM.SIXTOFIVE,
                'buildSystem': GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT,
                'downloadDependencies': false
            });
        });

        it('return default values when no changes were done', function () {
            var model = new GeneratorModel();
            model.createProjectFolder = true;
            model.projectName = 'my-project';
            model.projectDescription = 'a description';
            model.projectVersion = '2.0.0';
            model.transpiler = GeneratorModel.TRANSPILER_ENUM.TRACEUR;
            model.buildSystem = null;
            model.downloadDependencies = true;

            chai.expect(model.toJSON()).to.deep.equal({
                'createProjectFolder': true,
                'projectName': 'my-project',
                'projectDescription': 'a description',
                'projectVersion': '2.0.0',
                'transpiler': GeneratorModel.TRANSPILER_ENUM.TRACEUR,
                'buildSystem': null,
                'downloadDependencies': true
            });
        });
	});
});