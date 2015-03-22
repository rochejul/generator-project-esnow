/**
 * User utilities service
 *
 * @module utils/user
 * @exports UserService
 *
 * @version 1.0
 * @version 1.0
 */

'use strict';

import User from 'app/models/user';

/**
 * In-memory list of users
 * @constant
 * @private
 * @type {User}
 */
const DATA = [
    new User(),
    new User('Jane'),
    new User('John', 'Smith'),
    new User('William', 'Smith')
];

/**
 * @class UserService
 */
export default class UserService {
    /**
     * Fetch all users
     *
     * @method fetch
     * @static
     * @returns {User[]}
     */
    static fetch() {
        return DATA;
    }

    /**
     * Find the user with the identity
     *
     * @method findUser
     * @static
     * @param {number} id
     * @returns {User}
     */
    static findUser(id) {
        return DATA.find(
            (user) => user.id === id
        );
    }
}
