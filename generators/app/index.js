'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var NodeGit = require("nodegit");
var cloneURL = "https://github.com/tomas-teston/generator-kibana-plugin";
var localPath = require("path").join(__dirname, "tmp");
var cloneOptions = {};

var myFunctions = require('./env');
var prompts = require('./prompts');
var writes = require('./writes');

var kibanaOk = undefined;

module.exports = Generator.extend({

  // Check environment
  initializing: function (){
    this.kibanaOk = myFunctions.checkForKibana(this.log);
    myFunctions.checkNodeVersion(this.log);
    //myFunctions.checkJavaversion(this.log);
  },

  // Ask the user
  prompting: function () {
    prompts.apply(this);
  },
  
  // Write files
  writing: function() {
    writes.config.apply(this);
    writes.app.apply(this);
  },

  conflicts: function() {
    /*console.log("Downloading Kibana . . .");
    var done = this.async();
    var cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions).then(function(repository) {
      // Work with the repository object here.
      console.log("Hola que aseeee");
      done();
    })
    .catch(function(err) { console.error(err); });*/
    console.log("Valor de kibanaOk: " + this.kibanaOk);
    if (this.kibanaOk !== undefined) {
      const done = this.async();
      this.prompt({
        type: 'list',
        name: 'kbnOk',
        message: 'Install kibana?',
        choices: ['yes', 'no']
      }, function (answers) {
        console.log("Valor:" + answers);
        done();
        //this.kbnVersion = answers.kbn === 'si' ? 'si' : answers.kbnVersion;
      }.bind(this));
    } else {
      console.log("Error en variable kibana");
    }
  }

  // Install dependencies
  /*install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('Everything is ready!');
      }
    });
    //this.installDependencies();
    //this.npmInstall();
    //this.runInstall('bower');
  }*/
});
