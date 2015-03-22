/**
 * Main file of our application
 *
 * @module app/index
 *
 * @version 1.0
 * @version 1.0
 */

'use strict';

import UserService from 'app/utils/user';

var
    ulElement = document.querySelector('ul'),
    inputElement = document.querySelector('input'),
    buttonElement = document.querySelector('button');

buttonElement.addEventListener(
    'click',
    (event) => {
        event.preventDefault();

        let findedUser = UserService.findUser(+inputElement.value);

        if (findedUser) {
            alert('We found the user with firstName ' + findedUser.firstName);

        } else {
            alert('No user was found');
        }
    },
    false
);

UserService
    .fetch()
    .forEach(
        (user) => {
            let liElement = document.createElement('li');
            liElement.innerText = user.firstName + ' ' + user.lastName;
            ulElement.appendChild(liElement);
        }
    );
