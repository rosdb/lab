const path = require('path');
const shell = require('shelljs');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_SRC_DIR = path.resolve(DIST_DIR, 'src');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const SCRIPTS_DIR = path.resolve(ROOT_DIR, 'src', 'scripts');
const STYLES_DIR = path.resolve(ROOT_DIR, 'src', 'styles');

// --- Copy
function copy(from, target) {
  if (typeof from !== 'string' && typeof target !== 'string') {
    shell.exit(1);
    return;
  }

  shell.echo('Copy from...');
  shell.echo(`Source: ${from.toString()}`);
  shell.echo(`Target: ${target.toString()}`);
  shell.cp('-r', from, target);
}

// --- Program
(function run() {
  copy(PUBLIC_DIR, DIST_DIR);
  shell.mkdir('-p', DIST_SRC_DIR); // Create dist/src folder before copy styles and scripts
  copy(STYLES_DIR, DIST_SRC_DIR);
  copy(SCRIPTS_DIR, DIST_SRC_DIR);
  shell.exit(0);
})();
