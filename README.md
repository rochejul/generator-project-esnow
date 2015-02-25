# generator-project-esnow [![Build Status](https://travis-ci.org/rochejul/generator-project-esnow.svg?branch=master)](https://travis-ci.org/rochejul/generator-project-esnow)
Yeoman generator to create ES next generation project (based on ES6 / ES2015, ES7 ...).

## Goal

Provide an easy way to set up a ES project based on ES6 / ES2015, ES7, etc ...

We can generate a project based on:
- Grunt / Gulp
- Karma & Jasmine
- Bower
- 6to5 / babel / traceur

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
Default: `6to5`

ES transpiler. Choices between 6to5, babel and traceur

### prompts.downloadDependencies
Type: `Boolean`
Default: `false`

Shall we download at the end of the generation the npm and bower dependencies of the project ?

## Project commands

* Run tests: ```sh npm test ```
* Run compilation: ```sh npm run compile ```
* Run distribution: ```sh npm run dist ```
* Run reports: ```sh npm run report ```

## License

MIT © [Julien Roche](https://github.com/rochejul)
