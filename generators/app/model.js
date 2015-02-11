/*global module: true */

/**
 * Module that contains the model
 */

'use strict';

/**
 * @class GeneratorModel
 * @constructor
 */
function GeneratorModel () {
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
    this.transpiler = GeneratorModel.TRANSPILER_ENUM.SIXTOFIVE;

    /**
     * @property {string} buildSystem
     */
    this.buildSystem = GeneratorModel.BUILD_SYSTEM_ENUM.GRUNT;

    /**
     * @property {boolean} downloadDependencies
     */
    this.downloadDependencies = false;
}

/**
 * @name TranspilerEnum
 * @enum {string}
 */
GeneratorModel.TRANSPILER_ENUM = {
    'SIXTOFIVE': '6to5',
    'TRACEUR': 'traceur'
};

/**
 * @name BuildSystemEnum
 * @enum {string}
 */
GeneratorModel.BUILD_SYSTEM_ENUM = {
    'GRUNT': 'grunt'
};

/**
 * Return a JSON objerct to represent the model
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