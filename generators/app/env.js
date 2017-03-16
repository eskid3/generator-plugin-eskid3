"use strict"
const statSync = require('fs').statSync;
const resolve = require('path').resolve;

const README_URL = 'https://github.com/elastic/generator-kibana-plugin#getting-started';
const KIBANA_DIR = resolve(process.cwd(), '../kibana');


var checkNodeVersion = function() {
  // verify that they are using the correct version of node.js
  function stripV(version) {
    return version[0] === 'v' ? version.slice(1) : version;
  }

  var requiredNodeV = stripV(require(resolve(KIBANA_DIR, 'package.json')).engines.node);
  var nodev = stripV(process.version);

  var requiredNodeV_aux = requiredNodeV.split(".");
  nodev = nodev.split(".");

  if (nodev[0] < requiredNodeV_aux[0]) {
    return requiredNodeV;
  } else if (nodev[0] === requiredNodeV_aux[0]) {
    if (nodev[1] < requiredNodeV_aux[1]) {
      return requiredNodeV;
    } else if (nodev[1] === requiredNodeV_aux[1]) {
      if (nodev[2] < requiredNodeV_aux[2]) {
        return requiredNodeV;
      } else if (nodev[2] === requiredNodeV_aux[2]) {
        return undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

var checkJavaVersion = function(log) {
    /*var spawn = require('child_process').spawn('java', ['-version']);
    spawn.on('error', function(err){
      log
        .error('Error check java version:' + err)
      process.exit(1);
    })
    spawn.stderr.on('data', function(data) {
        data = data.toString().split('\n')[0];
        var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
        if (javaVersion !== false && resultado === undefined) {
            // TODO: We have Java installed
            console.log("Entro");
            resultado = javaVersion;
        }
    });*/
    var exec = require('child_process').exec;
    exec('java -version', function(error, stdout, stderr) {
        if (stderr === undefined) {
          log
              .error('No java installed')
              .info('Java is required');
            process.exit(1);
        }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
}

var checkEnviroment = function(log) {
  // verify that the kibana repository has been setup correctly
  try {
    const stat = statSync(KIBANA_DIR);
    if (!stat.isDirectory()) {
      /*const err = new Error('not a directory');
      err.code = 'ENOENT';
      throw err;*/
      return true;
    } else {
      var respuesta_version = checkNodeVersion();
      if (respuesta_version !== undefined){
        log
          .error('Incorrect Node.js Version')
          .info('Upgrade your version to a higher than ' + respuesta_version);
        process.exit(1);
      } else {
        var resultado = checkJavaVersion(log);
        return false;
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      /*log
      .error('Missing Kibana Development Environment')
      .info('Expected location:', KIBANA_DIR)
      .info('See', README_URL);
      
      process.exit(1);*/
      return true;
    }

    throw err;
  }
}

module.exports = {
    checkEnviroment: checkEnviroment
}