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
    var done = this.async();
    myFunctions.checkForKibana(this.log);
    myFunctions.checkNodeVersion(this.log);
    console.log("descargando Kibana . . .");
    var cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions).then(function(repository) {
      // Work with the repository object here.
      console.log("Hola que aseeee");
      done();
    })
    .catch(function(err) { console.error(err); });
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

  // Install dependencies
  install: function () {
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
  }
});
