/*global module: true, require: true, __dirname: true */

/**
 * Linting utilities module
 */

'use strict';

var
    fs = require('fs'),
    path = require('path'),

    /**
     * Templates path
     *
     * @private
     * @enum {string}
     */
    TEMPLATES_PATH = __dirname + '/templates/linting/',

    /**
     * File which contains npm dependencies
     *
     * @private
     * @enum {string}
     */
    NPM_DEPENDENCIES_FILENAME = 'npm-dependencies-',

    /**
     * File which contains task configuration
     *
     * @private
     * @enum {string}
     */
    TASK_CONFIGURATION_FILENAME = 'task-configuration-',

    /**
     * File text extension
     *
     * @private
     * @enum {string}
     */
    TXT_EXTENSION = '.txt';

// Export the service
module.exports = {
    /**
     * Get the npm dependencies for the specified linting and build system
     *
     * @method
     * @static
     * @param {LintingEnum} linting
     * @param {BuildSystemEnum} buildSystem
     * @returns {string}
     */
    'getNpmDependencies': function (linting, buildSystem) {
        return fs.readFileSync(TEMPLATES_PATH + linting + path.sep + NPM_DEPENDENCIES_FILENAME + buildSystem + TXT_EXTENSION).toString();
    },

    /**
     * Get the task configuration for the specified linting and build system
     *
     * @method
     * @static
     * @param {LintingEnum} linting
     * @param {BuildSystemEnum} buildSystem
     * @returns {string}
     */
    'getTaskConfiguration': function (linting, buildSystem) {
        return fs.readFileSync(TEMPLATES_PATH + linting + path.sep + TASK_CONFIGURATION_FILENAME + buildSystem + TXT_EXTENSION).toString();
    }
};