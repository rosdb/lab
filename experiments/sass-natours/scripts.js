const path = require('path');
const shell = require('shelljs');

const DIST = path.resolve(__dirname, 'dist');

const PUBLIC = path.resolve(__dirname, 'public');

// --- Copy
function copy(from, target) {
  if (typeof from !== 'string' && typeof target !== 'string') {
    shell.exit(1);
    return;
  }

  shell.echo('Copy from...');
  shell.echo(`Source: ${PUBLIC.toString()}`);
  shell.echo(`Target: ${DIST.toString()}`);
  shell.cp('-r', from, target);
}

// --- Program
(function run() {
  copy(PUBLIC, DIST);
  shell.exit(0);
})();
