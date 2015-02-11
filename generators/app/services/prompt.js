/*global module: true*/

/**
 * Prompt utilities module
 */

'use strict';

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
            i;

        for (i in enumeration) {
            if (enumeration.hasOwnProperty(i)) {
                choices.push({ 'name': enumeration[i], 'value': enumeration[i] });
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
     */
    'requiredPrompt': function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();

        // Do async stuff
        setTimeout(function() {
            if (input === null || input === undefined || input === '') {
                // Pass the return value in the done callback
                done('You need to provide something');
                return;
            }
            // Pass the return value in the done callback
            done(true);
        }, 3000);
    }
};