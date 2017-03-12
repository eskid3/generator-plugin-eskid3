const statSync = require('fs').statSync;
const resolve = require('path').resolve;

const README_URL = 'https://github.com/elastic/generator-kibana-plugin#getting-started';
const KIBANA_DIR = resolve(process.cwd(), '../kibana');

checkForKibana = function(log) {
  // verify that the kibana repository has been setup correctly
  try {
    const stat = statSync(KIBANA_DIR);
    if (!stat.isDirectory()) {
      const err = new Error('not a directory');
      err.code = 'ENOENT';
      throw err;
      return false;
    }
    else {
      return true;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      log
      .error('Missing Kibana Development Environment')
      .info('Expected location:', KIBANA_DIR)
      .info('See', README_URL);
      return false;
      process.exit(1);
    }

    throw err;
  }
}

checkJavaversion = function(log) {
    var spawn = require('child_process').spawn('java', ['-version']);
    spawn.on('error', function(err){
      log
        .error('Error check java version:' + err)
      process.exit(1);
    })
    spawn.stderr.on('data', function(data) {
        data = data.toString().split('\n')[0];
        var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
        if (javaVersion != false) {
            // TODO: We have Java installed
            log('Java versión installed: ' + javaVersion);
            process.exit(1);
        } else {
            // TODO: No Java installed
            log
              .error('No java installed');
            process.exit(1);
        }
    });
}

checkNodeVersion = function(log) {
  // verify that they are using the correct version of node.js
  function stripV(version) {
    return version[0] === 'v' ? version.slice(1) : version;
  }

  const requiredNodeV = stripV(require(resolve(KIBANA_DIR, 'package.json')).engines.node);
  const nodev = stripV(process.version);
  if (requiredNodeV !== nodev) {
    valor = false;
    log
      .error('Incorrect Node.js Version')
      .info('Required version:', requiredNodeV)
      .info('Current version:', nodev)
      .info('See', README_URL);
    process.exit(1);
  } 
}

module.exports = {
    checkForKibana: checkForKibana,
    checkNodeVersion: checkNodeVersion,
    checkJavaversion: checkJavaversion
}