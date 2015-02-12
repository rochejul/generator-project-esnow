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

	describe('and the method "convertEnumToChoices" should ', function () {
		it('exist', function () {
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

    describe('and the method "requiredPrompt" should ', function () {
        it('exist', function () {
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

    describe('and the method "semverPrompt" should ', function () {
        it('exist', function () {
           chai.expect(PromptService.semverPrompt).to.exist();
        });

        it('return false when we have not a valid semver value', function () {
            chai.expect(PromptService.semverPrompt()).to.equal('You need to provide a semver value');
            chai.expect(PromptService.semverPrompt(undefined)).to.equal('You need to provide a semver value');
            chai.expect(PromptService.semverPrompt(null)).to.equal('You need to provide a semver value');
            chai.expect(PromptService.semverPrompt('')).to.equal('You need to provide a semver value');
            chai.expect(PromptService.semverPrompt('a.b.c')).to.equal('You need to provide a semver value');
            chai.expect(PromptService.semverPrompt('1.a.0')).to.equal('You need to provide a semver value');
        });

        it('return true when we have a valid semver value', function () {
            chai.expect(PromptService.semverPrompt('1.0.0')).to.be.true();
            chai.expect(PromptService.semverPrompt('1.0.0-snapshot')).to.be.true();
        });
    });

    describe('and the method "projectNamePrompt" should ', function () {
        it('exist', function () {
            chai.expect(PromptService.projectNamePrompt).to.exist();
        });

        it('return false when we have not a valid project name value', function () {
            chai.expect(PromptService.projectNamePrompt()).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
            chai.expect(PromptService.projectNamePrompt(undefined)).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
            chai.expect(PromptService.projectNamePrompt(null)).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
            chai.expect(PromptService.projectNamePrompt('')).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
            chai.expect(PromptService.projectNamePrompt('a.b.c')).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
            chai.expect(PromptService.projectNamePrompt('a b')).to.equal('You need to provide a valid project name (without spaces, special characters, and in lowercase)');
        });

        it('return true when we have a valid project name value', function () {
            chai.expect(PromptService.projectNamePrompt('project')).to.be.true();
            chai.expect(PromptService.projectNamePrompt('my-project')).to.be.true();
        });
    });
});