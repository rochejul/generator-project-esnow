/**
 * Main file of our application
 *
 * @version 1.0
 * @version 1.0
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        System
            .import('app/index')
            .then(function () {
                console.info('Application loaded');
            })
            .catch(function (ex) {
                console.error(ex.stack || ex);
            });

    }, false);
})();
