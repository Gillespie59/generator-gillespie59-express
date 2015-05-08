(function(){
	'use strict';
	var generators = require('yeoman-generator');

	/**
	* Prompt information to the user in
	* order to customize the application
	*/
	var generator = generators.Base.extend({
		prompting: function () {
			var done = this.async();
			this.prompt({
				type: 'input',
				name: 'name',
				message: 'Your project name',
				default: this.appname // Default to current folder name
			}, function (answers) {
				this.appName = answers.name;
				done();
			}.bind(this));
		}
	});

	/**
	* Create package.json file
	*/
	generator.prototype.packagejson = function() {
		var pkg = {
			'name': this.appName,
			'version': '0.0.0',
			'dependencies': {}
		};
		this.write('package.json', JSON.stringify(pkg));
	};

	/**
	* Install NPM dependencies
	*/
	generator.prototype.installNpmDependencies = function() {
		var dependencies = [
      'express',
			'winston'
		];
		this.npmInstall(dependencies, { 'save': true });
	};
	module.exports = generator;
})();
