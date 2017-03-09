'use strict';

function writeApplicationConfig() {

  this.fs.copyTpl(
    this.templatePath('_package.json'),
    this.destinationPath('package.json'),
    {
      packageName: this.props.projectName.dasherized,
      descripcionProyect: this.props.projectDescription
    }
  );

  this.fs.copyTpl(
    this.templatePath('_README.md'),
    this.destinationPath('README.md'),
    {
      packageName: this.props.projectName.dasherized,
      descripcionProject: this.props.projectDescription
    }
  );

  this.fs.copyTpl(
    this.templatePath('_index.js'),
    this.destinationPath('index.js'),
    {
      packageName: this.props.projectName.dasherized
    }
  );

  this.fs.copy(
    this.templatePath('server/__tests__/index.js'),
    this.destinationPath('server/__tests__/index.js')
  );

  this.fs.copyTpl(
    this.templatePath('server/routes/example.js'),
    this.destinationPath('server/routes/example.js'),
    {
      packageName: this.props.projectName.dasherized
    }
  );

}

module.exports = function() {
  writeApplicationConfig.apply(this);
}
