'use strict';

function writeApplicationApp() {

  this.fs.copyTpl(
    this.templatePath('public/plugin-eskid3.js'),
    this.destinationPath('public/'+this.props.projectName.dasherized+'.js'),
    {
    	packageName: this.props.projectName.dasherized,
    	pluginTitle: this.props.projectName.original,
    	pluginDescripcion: this.props.projectDescription
    }
  );

  this.fs.copyTpl(
    this.templatePath('public/plugin-eskid3.html'),
    this.destinationPath('public/'+this.props.projectName.dasherized+'.html'),
    {
    	packageName: this.props.projectName.dasherized,
    	pluginTitle: this.props.projectName.original
    }
  );

  this.fs.copyTpl(
    this.templatePath('public/plugin-eskid3-Controller.js'),
    this.destinationPath('public/'+this.props.projectName.dasherized+'-Controller.js'),
    {
    	packageName: this.props.projectName.dasherized
    }
  );

  this.fs.copy(
    this.templatePath('public/plugin-eskid3.css'),
    this.destinationPath('public/'+this.props.projectName.dasherized+'.css')
  );

  this.fs.copy(
    this.templatePath('public/lib/vis_d3.js'),
    this.destinationPath('public/lib/vis_d3.js')
  );

}

module.exports = function() {
  writeApplicationApp.apply(this);
}
