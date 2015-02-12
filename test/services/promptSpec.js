/*global require: true, describe: true, it: true*/

/**
 * Tests around the prompt service
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('prompt service tests - ', function () {
	'use strict';

	var chai = require('chai'),
        PromptService = require('../../generators/app/services/prompt');

	it('should exports', function () {
		chai.expect(PromptService).to.exist();
	});

	describe('"convertEnumToChoices" should ', function () {
		it('exists', function () {
			chai.expect(PromptService.convertEnumToChoices).to.exist();
		});

		it('return an array of prompt choices from an enum', function () {
            var
                FAKE_ENUM = {
                    'ENUM1': 'val1',
                    'ENUM2': 'val2'
                };

            chai.expect(PromptService.convertEnumToChoices(FAKE_ENUM)).to.deep.equal([
                { 'name': 'Val1', 'value': 'val1' },
                { 'name': 'Val2', 'value': 'val2' }
            ]);
        });
	});

    describe('"requiredPrompt" should ', function () {
        it('exists', function () {
            chai.expect(PromptService.requiredPrompt).to.exist();
        });

        it('return the error message when the value is undefined', function () {
            chai.expect(PromptService.requiredPrompt()).to.equal('You need to provide something');
            chai.expect(PromptService.requiredPrompt(undefined)).to.equal('You need to provide something');
        });

        it('return the error message when the value is null', function () {
            chai.expect(PromptService.requiredPrompt(null)).to.equal('You need to provide something');
        });

        it('return the error message when the value is an empty string', function () {
            chai.expect(PromptService.requiredPrompt('')).to.equal('You need to provide something');
        });

        it('return true otherwise', function () {
            chai.expect(PromptService.requiredPrompt('1.0.0')).to.be.true();
        });
    });
});