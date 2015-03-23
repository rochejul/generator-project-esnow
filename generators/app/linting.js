/*global module: true */

/**
 * Module that contains the linting model
 */

'use strict';

var
    _ = require('lodash');

/**
 * @class LintingModel
 * @constructor
 * @param {Object} [values]
 */
function LintingModel (values) {
    /**
     * @property {string} npmDependencies
     */
    this.npmDependencies = null;

    /**
     * @property {string} taskConfiguration
     */
    this.taskConfiguration = null;

    if (values) {
        _.extend(this, values);
    }
}
/**
 * Return a JSON object to represent the model
 *
 * @method
 * @returns {Object}
 */
LintingModel.prototype.toJSON = function () {
    return {
        'npmDependencies': this.npmDependencies,
        'taskConfiguration': this.taskConfiguration
    };
};

// Export the model
module.exports = LintingModel;