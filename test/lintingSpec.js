/*global require: true, describe: true, it: true*/

/**
 * Tests around the linting
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('linting tests - ', function () {
	'use strict';

	var chai = require('chai'),
        LintingModel = require('../generators/app/linting');

	it('should exports', function () {
		chai.expect(LintingModel).to.exist();
	});

    describe('and the constructor should ', function () {
        it('set the default values when no values are set as parameter', function () {
            chai.expect(new LintingModel().toJSON()).to.deep.equal({
                'npmDependencies': null,
                'taskConfiguration': null
            });
        });

        describe('use the values give as parameter ', function () {
            it('without partials default parameters', function () {
                var passedValues = {
                    'npmDependencies': 'some-dependencies',
                    'taskConfiguration': 'some-configuration'
                };

                chai.expect(new LintingModel(passedValues).toJSON()).to.deep.equal({
                    'npmDependencies': 'some-dependencies',
                    'taskConfiguration': 'some-configuration'
                });
            });
        });
    });

	describe('and the method "toJSON" should ', function () {
		it('exists', function () {
			chai.expect(LintingModel.prototype.toJSON).to.exist();
		});

		it('return default values when no changes were done', function () {
            chai.expect(new LintingModel().toJSON()).to.deep.equal({
                'npmDependencies': null,
                'taskConfiguration': null
            });
        });

        it('return default values when no changes were done', function () {
            var model = new LintingModel();
            model.npmDependencies = 'some-dependencies';
            model.taskConfiguration = 'some-configuration';

            chai.expect(model.toJSON()).to.deep.equal({
                'npmDependencies': 'some-dependencies',
                'taskConfiguration': 'some-configuration'
            });
        });
	});
});