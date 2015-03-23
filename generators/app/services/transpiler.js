/*global module: true, require: true, __dirname: true */

/**
 * Transpiler utilities module
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
    TEMPLATES_PATH = __dirname + '/templates/',

    /**
     * File which contains npm dependencies
     *
     * @private
     * @enum {string}
     */
    NPM_DEPENDENCIES_FILENAME = 'npm-dependencies-',

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
     * Get the npm dependencies for the specified transpiler and build system
     *
     * @method
     * @static
     * @param {TranspilerEnum} transpiler
     * @param {BuildSystemEnum} buildSystem
     * @returns {string}
     */
    'getNpmDependencies': function (transpiler, buildSystem) {
        return fs.readFileSync(TEMPLATES_PATH + transpiler + path.sep + NPM_DEPENDENCIES_FILENAME + buildSystem + TXT_EXTENSION).toString();
    }
};