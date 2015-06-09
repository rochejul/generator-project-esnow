/*global module: true*/

/**
 * Prompt utilities module
 */

'use strict';

var
    semver = require('semver');

var
    /**
     * Empty char
     *
     * @private
     * @constant
     * @type {string}
     */
    EMPTY_CHAR = '',

    /**
     * Regular expression to check if we have a valid node project name
     *
     * @private
     * @constant
     * @type {RegExp}
     */
    REGEXP_PROJECT_NAME = /^[a-z0-9_-]+$/;

// Export the service
module.exports = {
    /**
     * @method
     * @static
     * @param {Object} enumeration
     * @returns {{ name: string, value: string }[]}
     */
    'convertEnumToChoices': function (enumeration) {
        var choices = [],
            key,
            i;

        for (i in enumeration) {
            if (enumeration.hasOwnProperty(i)) {
                key = enumeration[i];

                if (key) {
                    key = key.toLowerCase();
                    key = key.charAt(0).toUpperCase() + key.slice(1);
                }

                choices.push({ 'name': key, 'value': enumeration[i] });
            }
        }

        return choices;
    },

    /**
     * We want to have a valid node project name on the prompt
     *
     * @method
     * @static
     * @param {string} input
     * @returns {boolean | string}
     */
    'projectNamePrompt': function (input) {
        if (!input || !REGEXP_PROJECT_NAME.test(input)) {
            return 'You need to provide a valid project name (without spaces, special characters, and in lowercase)';
        }

        return true;
    },

    /**
     * We want to have an input on the prompt
     *
     * @method
     * @static
     * @param {string} input
     * @returns {boolean | string}
     */
    'requiredPrompt': function (input) {
        if (input === null || input === undefined || input === EMPTY_CHAR) {
            return 'You need to provide something';
        }

        return true;
    },

    /**
     * We want to have a semver input on the prompt
     *
     * @method
     * @static
     * @param {string} input
     * @returns {boolean | string}
     */
    'semverPrompt': function (input) {
        if (input && semver.valid(input)) {
            return true;
        }

        return 'You need to provide a semver value';
    }
};