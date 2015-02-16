/*jshint camelcase: false, -W083*/
/*global System: true */

(function (karma) {
    'use strict';

    karma.loaded = function() { }; // make it async

    var
        /**
         * All tests collected
         * @type {string[]}
         */
        tests = [],

        /**
         * End of javascript files
         *
         * @private
         * @constant
         * @type {string}
         */
        END_OF_FILE = '.js',

        loadedTestFileInc = 0;

    /**
     * Try to start karma (do it only when all test files are loaded)
     *
     * @method
     * @private
     */
    function _tryStartKarma() {
        loadedTestFileInc++;

        if (loadedTestFileInc === tests.length) {
            karma.start();
        }
    }

    // Filter tests files
    for (var file in karma.files) {
        if (karma.files.hasOwnProperty(file)) {
            if (/Spec\.js$/.test(file)) {
                tests.push(file);
            }
        }
    }

    // Load tests files
    for (var i = 0, modulePath; i < tests.length; ++i) {
        modulePath = tests[i];
        modulePath = modulePath.substr(modulePath.indexOf('test/'));
        modulePath = modulePath.substr(0, modulePath.lastIndexOf(END_OF_FILE));
        modulePath = 'app/' + modulePath;

        console.info('Load test: ' + modulePath);

        System
            .import(modulePath)
            .then(_tryStartKarma)
            .catch(function (ex) {
                console.error(ex.stack || ex);
                _tryStartKarma();
            });
    }
})(window.__karma__);