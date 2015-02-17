/*global require: true, describe: true, it: true*/

/**
 * Tests around the transpiler
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('transpiler tests - ', function () {
	'use strict';

	var chai = require('chai'),
        TranspilerModel = require('../generators/app/transpiler');

	it('should exports', function () {
		chai.expect(TranspilerModel).to.exist();
	});

    describe('and the constructor should ', function () {
        it('set the default values when no values are set as parameter', function () {
            chai.expect(new TranspilerModel().toJSON()).to.deep.equal({
                'npmDependencies': null
            });
        });

        describe('use the values give as parameter ', function () {
            it('without partials default parameters', function () {
                var passedValues = {
                    'npmDependencies': 'some-dependencies'
                };

                chai.expect(new TranspilerModel(passedValues).toJSON()).to.deep.equal({
                    'npmDependencies': 'some-dependencies'
                });
            });
        });
    });

	describe('and the method "toJSON" should ', function () {
		it('exists', function () {
			chai.expect(TranspilerModel.prototype.toJSON).to.exist();
		});

		it('return default values when no changes were done', function () {
            chai.expect(new TranspilerModel().toJSON()).to.deep.equal({
                'npmDependencies': null
            });
        });

        it('return default values when no changes were done', function () {
            var model = new TranspilerModel();
            model.npmDependencies = 'some-dependencies';

            chai.expect(model.toJSON()).to.deep.equal({
                'npmDependencies': 'some-dependencies'
            });
        });
	});
});