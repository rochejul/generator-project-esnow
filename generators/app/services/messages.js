/*global module: true, require: true, __dirname: true */

/**
 * Messages utilities module
 */

'use strict';

var
    fs = require('fs'),
    Constant = require('node-const'),

    /**
     * File caching
     *
     * @private
     * @enum {string}
     */
    CACHE_FILE_CONTENTS = {
        'DOT': fs.readFileSync(__dirname + '/../messages/dot.txt').toString(),
        'END': fs.readFileSync(__dirname + '/../messages/end.txt').toString(),
        'START': fs.readFileSync(__dirname + '/../messages/start.txt').toString()
    };

Constant(CACHE_FILE_CONTENTS);

// Export the service
module.exports = {
    /**
     * Get the dot message to log
     *
     * @method
     * @static
     * @returns {string}
     */
    'getDotLogMessage': function () {
        return CACHE_FILE_CONTENTS.DOT;
    },

    /**
     * Get the end message to log
     *
     * @method
     * @static
     * @returns {string}
     */
    'getEndLogMessage': function () {
        return CACHE_FILE_CONTENTS.END;
    },

    /**
     * Get the start message to log
     *
     * @method
     * @static
     * @returns {string}
     */
    'getStartLogMessage': function () {
        return CACHE_FILE_CONTENTS.START;
    }
};