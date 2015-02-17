/*global require: true, describe: true, it: true*/

/**
 * Tests around the transpiler service
 *
 * @author Julien Roche
 * @version 0.0.1
 * @since 0.0.1
 */

describe('transpiler service tests - ', function () {
	'use strict';

	var chai = require('chai'),
        GeneratorModel = require('../../generators/app/model'),
        TranspilerService = require('../../generators/app/services/transpiler');

	it('should exports', function () {
		chai.expect(TranspilerService).to.exist();
	});

	describe('and the method "getNpmDependencies" should ', function () {
		it('exist', function () {
			chai.expect(TranspilerService.getNpmDependencies).to.exist();
		});

		describe('return a text of npm dependencies to inject into the package.json file, for ', function () {
            describe('6to5 and ', function () {
                it('grunt', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.SIXTOFIVE, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('6to5');
                });

                it('gulp', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.SIXTOFIVE, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('6to5');
                });
            });

            describe('babel and ', function () {
                it('grunt', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.BABEL, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('babel');
                });

                it('gulp', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.BABEL, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('babel');
                });
            });

            describe('traceur and ', function () {
                it('grunt', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.TRACEUR, GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT)).to.contain('traceur');
                });

                it('gulp', function () {
                    chai.expect(TranspilerService.getNpmDependencies(GeneratorModel.TRANSPILER_ENUM.TRACEUR, GeneratorModel.BUILD_SYSTEM_ENUM.GULP)).to.contain('traceur');
                });
            });
        });
	});
});