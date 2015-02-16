/**
 * User model
 *
 * @module models/user
 * @exports User
 *
 * @version 1.0
 * @version 1.0
 */

'use strict';

var
    /**
     * Id incrementor
     *
     * @private
     * @type {number}
     */
    _inc = 1;

/**
 * @class User
 */
export default class User {
    /**
     * @constructor
     * @param {string} [firstName = 'John']
     * @param {string} [lastName = 'Doe']
     */
    constructor(firstName = 'John', lastName = 'Doe') {
        /**
         * @property {number} id
         */
        this.id = _inc;
        _inc++;

        /**
         * @property {string} firstName
         */
        this.firstName = firstName;

        /**
         * @property {string} lastName
         */
        this.lastName = lastName;
    }

    /**
     * Clear the form elements
     *
     * @method toJSON
     * @return {Object}
     */
    toJSON() {
        return {
            'id': this.id,
            'firstName': this.firstName,
            'lastName': this.lastName
        };
    }
}