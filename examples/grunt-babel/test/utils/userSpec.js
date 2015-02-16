/*global describe: true, it: true, expect: true*/

/**
 * Test the user service
 * @module test/utils/userSpec
 */

'use strict';

import UserService from 'app/utils/user';

describe('Utils - User ', function () {
    it('must return something', function () {
        expect(UserService).toBeDefined();
    });

    describe('and the method "UserService.findUser" should return the user ', function () {
        it('except if the id is not recognized', function () {
            expect(UserService.findUser).toBeDefined();
            expect(UserService.findUser(-100)).not.toBeDefined();
        });

        it('with the id to 1', function () {
            let user = UserService.findUser(1);

            expect(user).not.toBeNull();
            expect(user.toJSON()).toEqual({
                'id': 1,
                'firstName': 'John',
                'lastName': 'Doe'
            });
        });
    });
});
