[![Build Status](https://travis-ci.org/rochejul/generator-project-esnow.svg?branch=master)](https://travis-ci.org/rochejul/generator-project-esnow)
[![Dependency Status](https://david-dm.org/rochejul/generator-project-esnow.svg)](https://david-dm.org/rochejul/generator-project-esnow)
[![devDependency Status](https://david-dm.org/rochejul/generator-project-esnow/dev-status.svg)](https://david-dm.org/rochejul/generator-project-esnow#info=devDependencies)

# generator-project-esnow
Yeoman generator to create ES next generation project (based on ES6 / ES2015, ES7 ...).

## Goal

Provide an easy way to set up a ES project based on ES6 / ES2015, ES7, etc ...

We can generate a project based on:
- Grunt / Gulp
- Karma & Jasmine
- Bower
- 6to5 / babel / traceur
- Eslint / JsHint

With basics tasks, such as:
- running metrics (documentation, JavaScript hints)
- running tests
- development compilation
- production compilation

## Install

```sh
$ npm install --save-dev --global generator-project-esnow
```

## Usage

```sh
$ npm yo project-esnow
```

or

```sh
$ npm yo
```

and choose the Project-Esnow generator into the list

## Prompts

### prompts.createProjectFolder
Type: `Boolean`
Default: `false`

Shall we generate a folder with the project name or install files into the current folder

### prompts.projectName
Type: `String`
Default: `esnow-project`
Required: true

Name of the project

### prompts.projectDescription
Type: `String`

Description of the project

### prompts.projectVersion
Type: `String`
Default: `1.0.0`

Version of the project. Based on the semver convention. See https://docs.npmjs.com/misc/semver

### prompts.transpiler
Type: `String`
Default: `babel`

ES transpiler. Choices between 6to5, babel and traceur

### prompts.linting
Type: `String`
Default: `eslint`

ES linting. Choices between eslint and jshint

### prompts.downloadDependencies
Type: `Boolean`
Default: `false`

Shall we download at the end of the generation the npm and bower dependencies of the project ?

## Project commands

* Run tests: ```sh npm test ```
* Run compilation: ```sh npm run compile ```
* Run distribution: ```sh npm run dist ```
* Run reports: ```sh npm run report ```

If you want to run bower commands:

* ```sh npm run bower install ```
* ```sh npm run bower prune ```
* ...

If you want to run gulp commands if you are in a gulp project:

* ```sh npm run gulp compile ```
* ```sh npm run gulp dist ```
* ...

If you want to run grunt commands if you are in a grunt project:

* ```sh npm run grunt compile ```
* ```sh npm run grunt dist ```
* ...

## License

MIT © [Julien Roche](https://github.com/rochejul)
