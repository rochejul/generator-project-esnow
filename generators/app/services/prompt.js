/*global module: true*/

/**
 * Prompt utilities module
 */

'use strict';

var
    /**
     * Empty char
     *
     * @private
     * @constant
     * @type {string}
     */
    EMPTY_CHAR = '';

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
    }
};