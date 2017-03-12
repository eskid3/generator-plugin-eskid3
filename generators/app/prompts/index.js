'use strict';

var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');

var prompts = require('./prompts');

function generateProjectName(name) {
    var projectName = {
        original: name,
        dasherized: S(name).dasherize().s,
        camelized: S(name).camelize().s,
    };

    projectName.camelized = (
        projectName.camelized.charAt(0).toLowerCase() +
        projectName.camelized.slice(1)
    );

    if ( S(projectName.dasherized).startsWith('-') ) {
        projectName.dasherized = S(projectName.dasherized).chompLeft('-').s;
    }

    return projectName;
}

module.exports = function(){
    

    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sublime ' + chalk.red('generator-plugin-kibana-eskid3') + ' generator!'
    ));


    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      // 
      this.props = props;
      this.props.projectName = generateProjectName(props.projectName);
      this.props.projectDescription = this.props.projectDescription ||
                                    this.props.projectName.original;

      done();
    }.bind(this));
}

