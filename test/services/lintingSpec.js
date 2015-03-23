/*global require: true, describe: true, it: true*/

/**
 * Tests around the linting service
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('linting service tests - ', function () {
	'use strict';

	var chai = require('chai'),
        GeneratorModel = require('../../generators/app/model'),
        LintingService = require('../../generators/app/services/linting');

	it('should exports', function () {
		chai.expect(LintingService).to.exist();
	});

	describe('and the method "getNpmDependencies" should ', function () {
		it('exist', function () {
			chai.expect(LintingService.getNpmDependencies).to.exist();
		});

		describe('return a text of npm dependencies to inject into the package.json file, for ', function () {
            describe('jshint and ', function () {
                it('grunt', function () {
                    chai.expect(LintingService.getNpmDependencies(GeneratorModel.LINTING_ENUM.JSHINT, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('jshint');
                });

                it('gulp', function () {
                    chai.expect(LintingService.getNpmDependencies(GeneratorModel.LINTING_ENUM.JSHINT, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('jshint');
                });
            });

            describe('eslint and ', function () {
                it('grunt', function () {
                    chai.expect(LintingService.getNpmDependencies(GeneratorModel.LINTING_ENUM.ESLINT, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('eslint');
                });

                it('gulp', function () {
                    chai.expect(LintingService.getNpmDependencies(GeneratorModel.LINTING_ENUM.ESLINT, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('eslint');
                });
            });
        });

        describe('return a text of system builder configuration to inject into the config/reports.js file, for ', function () {
            describe('jshint and ', function () {
                it('grunt', function () {
                    chai.expect(LintingService.getTaskConfiguration(GeneratorModel.LINTING_ENUM.JSHINT, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('jshint');
                });

                it('gulp', function () {
                    chai.expect(LintingService.getTaskConfiguration(GeneratorModel.LINTING_ENUM.JSHINT, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('jshint');
                });
            });

            describe('eslint and ', function () {
                it('grunt', function () {
                    chai.expect(LintingService.getTaskConfiguration(GeneratorModel.LINTING_ENUM.ESLINT, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('eslint');
                });

                it('gulp', function () {
                    chai.expect(LintingService.getTaskConfiguration(GeneratorModel.LINTING_ENUM.ESLINT, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('eslint');
                });
            });
        });
	});
});