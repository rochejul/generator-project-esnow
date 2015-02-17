/*global module: true */

/**
 * Module that contains the transpiler model
 */

'use strict';

var
    _ = require('lodash');

/**
 * @class TranspilerModel
 * @constructor
 * @param {Object} [values]
 */
function TranspilerModel (values) {
    /**
     * @property {string} npmDependencies
     */
    this.npmDependencies = null;

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
TranspilerModel.prototype.toJSON = function () {
    return {
        'npmDependencies': this.npmDependencies
    };
};

// Export the model
module.exports = TranspilerModel;