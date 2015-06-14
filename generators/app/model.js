/*global module: true */

/**
 * Module that contains the main model (or generator model)
 */

'use strict';

var
    _ = require('lodash'),
    Constant = require('node-const');

/**
 * @class GeneratorModel
 * @constructor
 * @param {Object} [values]
 */
function GeneratorModel (values) {
    /**
     * @property {boolean} createProjectFolder
     */
    this.createProjectFolder = false;

    /**
     * @property {string} projectName
     */
    this.projectName = 'esnow-project';

    /**
     * @property {string} projectDescription
     */
    this.projectDescription = null;

    /**
     * @property {string} projectVersion
     */
    this.projectVersion = '1.0.0';

    /**
     * @property {string} transpiler
     */
    this.transpiler = GeneratorModel.TRANSPILER_ENUM.BABEL;

    /**
     * @property {string} linting
     */
    this.linting = GeneratorModel.LINTING_ENUM.ESLINT;

    /**
     * @property {boolean} git
     */
    this.git = true;

    /**
     * @property {string} buildSystem
     */
    this.buildSystem = GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT;

    /**
     * @property {boolean} downloadDependencies
     */
    this.downloadDependencies = false;

    if (values) {
        _.extend(this, values);
    }
}

/**
 * @name TranspilerEnum
 * @enum {string}
 */
GeneratorModel.TRANSPILER_ENUM = {
    'BABEL': 'babel',
    'SIXTOFIVE': '6to5',
    'TRACEUR': 'traceur'
};

Constant(GeneratorModel.TRANSPILER_ENUM);

/**
 * @name BuildSystemEnum
 * @enum {string}
 */
GeneratorModel.BUILD_SYSTEM_ENUM = {
    'GRUNT': 'grunt',
    'GULP': 'gulp'
};

Constant(GeneratorModel.BUILD_SYSTEM_ENUM);

/**
 * @name LintingEnum
 * @enum {string}
 */
GeneratorModel.LINTING_ENUM = {
    'ESLINT': 'eslint',
    'JSHINT': 'jshint'
};

Constant(GeneratorModel.LINTING_ENUM);

/**
 * Return a JSON object to represent the model
 *
 * @method
 * @returns {Object}
 */
GeneratorModel.prototype.toJSON = function () {
    return {
        'createProjectFolder': this.createProjectFolder,
        'projectName': this.projectName,
        'projectDescription': this.projectDescription,
        'projectVersion': this.projectVersion,
        'transpiler': this.transpiler,
        'buildSystem': this.buildSystem,
        'downloadDependencies': this.downloadDependencies
    };
};

// Export the model
module.exports = GeneratorModel;