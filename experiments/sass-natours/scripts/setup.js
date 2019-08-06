const path = require('path');
const shell = require('shelljs');

const DIST_DIR = path.resolve(__dirname, '../', 'dist');
const PUBLIC_DIR = path.resolve(__dirname, '../', 'public');

// --- Copy
function copy(from, target) {
  if (typeof from !== 'string' && typeof target !== 'string') {
    shell.exit(1);
    return;
  }

  shell.echo('Copy from...');
  shell.echo(`Source: ${PUBLIC_DIR.toString()}`);
  shell.echo(`Target: ${DIST_DIR.toString()}`);
  shell.cp('-r', from, target);
}

// --- Program
(function run() {
  copy(PUBLIC_DIR, DIST_DIR);
  shell.exit(0);
})();
