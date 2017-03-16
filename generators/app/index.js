'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var NodeGit = require("nodegit");
var cloneURL = "https://github.com/tomas-teston/generator-kibana-plugin";
var resolve = require("path").resolve;
var localPath = resolve(process.cwd(), '../Kibana');
var cloneOptions = {};

var myFunctions = require('./env');
var prompts = require('./prompts');
var writes = require('./writes');

var kibanaOk = false;

module.exports = Generator.extend({

  // Check environment
  initializing: function (){
    var done_mio = this.async();
    this.kibanaOk = myFunctions.checkEnviroment(this.log);
    done_mio();
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

  install: function() {
    if (this.props.instkbn === true) {
      var done = this.async();
      console.log("descargando Kibana . . .");
      var cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions).then(function(repository) {
        // Work with the repository object here.
        console.log("Exito!.Everything is ready");
        done();
      })
      .catch(function(err) { console.error(err); });
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
