/*global module: true, require: true, process: true*/

/**
 * Definition of an yeoman generator to generate en esnow project
 */

'use strict';

var
    // Import dependencies
    yeoman = require('yeoman-generator'),
    packageJSON = require('../../package.json'),
    messageUtils = require('./services/messages'),
    promptUtils = require('./services/prompt'),
    lintingUtils = require('./services/linting'),
    transpilerUtils = require('./services/transpiler'),
    GeneratorProject = require('./model'),
    LintingModel = require('./linting'),
    TranspilerModel = require('./transpiler');

var
    // Constants
    LOCAL_DIRECTORY = './';

// Export the generator
module.exports = yeoman.generators.Base.extend({
    /**
     * Called to initialize the generator if needed
     *
     * @method
     */
    'initializing': function () {
        this.log();
        this.log(messageUtils.getDotLogMessage());
        this.log(messageUtils.getStartLogMessage());
        this.log(messageUtils.getDotLogMessage());
        this.log();

        this.log('Welcome to the EsNow generator for your project (current version:', packageJSON.version, ')');
        this.log();
        this.model = new GeneratorProject();
        this.transpiler = null;
        this.linting = null;
    },

    /**
     * Called to ask if we have to create the folder
     *
     * @method
     */
    'promptcreateProjectFolder': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'confirm',
                'name': 'createProjectFolder',
                'message': 'Shall we create the project folder?',
                'default': this.model.createProjectFolder,
                'validate': promptUtils.projectNamePrompt
            },
            function (answers) {
                this.model.createProjectFolder = answers.createProjectFolder;
                done();
            }.bind(this)
        );
    },

    /**
    * Called to ask the name of your project
    *
    * @method
    */
    'promptProjectName': function () {
        var done = this.async();

        this
            .prompt(
                {
                    'type': 'input',
                    'name': 'projectName',
                    'message': 'Your project name',
                    'default': this.model.projectName,
                    'validate': promptUtils.requiredPrompt
                },
                function (answers) {
                    this.model.projectName = answers.projectName.trim().toLowerCase();
                    done();
                }.bind(this)
            );
    },

    /**
    * Called to ask the description of your project
    *
    * @method
    */
    'promptProjectDescription': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'input',
                'name': 'projectDescription',
                'message': 'Your project description',
                'default': this.model.projectDescription
            },
            function (answers) {
                this.model.projectDescription = answers.projectDescription;
                done();
            }.bind(this)
        );
    },

    /**
    * Called to ask the version of your project
    *
    * @method
    */
    'promptProjectVersion': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'input',
                'name': 'projectVersion',
                'message': 'Your project version',
                'default': this.model.projectVersion,
                'validate': promptUtils.semverPrompt
            },
            function (answers) {
                this.model.projectVersion = answers.projectVersion;
                done();
            }.bind(this)
        );
    },

    /**
     * Called to ask the transpiler to use
     *
     * @method
     */
    'promptTranspiler': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'list',
                'name': 'transpiler',
                'message': 'Choose the transpiler to use',
                'default': this.model.transpiler,
                'choices': promptUtils.convertEnumToChoices(GeneratorProject.TRANSPILER_ENUM)
            },
            function (answers) {
                this.model.transpiler = answers.transpiler;
                done();
            }.bind(this)
        );
    },

    /**
     * Called to ask the build system to use
     *
     * @method
     */
    'promptBuildSystem': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'list',
                'name': 'buildSystem',
                'message': 'Choose the build system to use',
                'default': this.model.buildSystem,
                'choices': promptUtils.convertEnumToChoices(GeneratorProject.BUILD_SYSTEM_ENUM)
            },
            function (answers) {
                this.model.buildSystem = answers.buildSystem;
                done();
            }.bind(this)
        );
    },

    /**
     * Called to ask the linting to use
     *
     * @method
     */
    'promptLinting': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'list',
                'name': 'linting',
                'message': 'Choose the linting to use',
                'default': this.model.linting,
                'choices': promptUtils.convertEnumToChoices(GeneratorProject.LINTING_ENUM)
            },
            function (answers) {
                this.model.linting = answers.linting;
                done();
            }.bind(this)
        );
    },

    /**
     * Called to ask if we have to download the node and bower dependencies
     *
     * @method
     */
    'promptDownloadDependencies': function () {
        var done = this.async();

        this
            .prompt(
            {
                'type': 'confirm',
                'name': 'downloadDependencies',
                'message': 'Shall we download the node and bower dependencies?',
                'default': this.model.downloadDependencies
            },
            function (answers) {
                this.model.downloadDependencies = answers.downloadDependencies;
                done();
            }.bind(this)
        );
    },

    /**
     * Copy files
     *
     * @method
     */
    'writing': function () {
        this.log('The project will be generated with the following options:');
        this.log(JSON.stringify(this.model.toJSON(), null, '\t'));

        var
            rootFolder = LOCAL_DIRECTORY;

        if (this.model.createProjectFolder) {
            rootFolder = this.model.projectName;
            this.dest.mkdir(rootFolder);
        }

        // Update some models
        this.transpiler = new TranspilerModel({
            'npmDependencies': transpilerUtils.getNpmDependencies(this.model.transpiler, this.model.buildSystem)
        });

        this.linting = new LintingModel({
            'npmDependencies': lintingUtils.getNpmDependencies(this.model.linting, this.model.buildSystem),
            'taskConfiguration': lintingUtils.getTaskConfiguration(this.model.linting, this.model.buildSystem)
        });

        // Copy all needed files
        this.directory('./base', rootFolder);
        this.copy('./linting/.' + this.model.linting + 'rc', rootFolder + '/.' + this.model.linting + 'rc');
        this.directory('./' + this.model.buildSystem + '/common', rootFolder);
        this.directory('./' + this.model.buildSystem + '/' + this.model.transpiler, rootFolder);
    },

    /**
     * Called when the generator has finished
     *
     * @method
     */
    'end': function () {
        if (this.model && this.model.downloadDependencies) {
            this.log('We will download now the NPM dependencies');

            if (this.model.createProjectFolder) {
                process.chdir(this.destinationRoot() + '/' + this.model.projectName); // Because we have create a subdirectory ...
                // see http://stackoverflow.com/questions/22361446/yeoman-generator-installing-project-dependencies-in-custom-folder
            }

            this.installDependencies({
                'bower': true,
                'npm': true,
                'skipInstall': false,
                'skipMessage': false,
                'callback': function () {
                    this.log();
                    this.log('Finished ! Thank you and good luck !');
                    this.log();
                    this.log(messageUtils.getDotLogMessage());
                    this.log(messageUtils.getEndLogMessage());
                    this.log(messageUtils.getDotLogMessage());
                    this.log();

                }.bind(this)
            });

        } else {
            this.log();
            this.log('Finished ! Thank you and good luck !');
            this.log();
            this.log(messageUtils.getDotLogMessage());
            this.log(messageUtils.getEndLogMessage());
            this.log(messageUtils.getDotLogMessage());
            this.log();
        }
    }
});