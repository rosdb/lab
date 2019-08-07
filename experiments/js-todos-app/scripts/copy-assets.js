const path = require('path');
const shell = require('shelljs');

const DIST_DIR = path.resolve(__dirname, '../', 'dist');
const DIST_SRC_DIR = path.resolve(__dirname, '../', 'dist/src');
const PUBLIC_DIR = path.resolve(__dirname, '../', 'public');
const SCRIPTS_DIR = path.resolve(__dirname, '../', 'src/scripts', '../');
const STYLES_DIR = path.resolve(__dirname, '../', 'src/styles');

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
  copy(SCRIPTS_DIR, DIST_SRC_DIR);
  copy(STYLES_DIR, DIST_SRC_DIR);
  shell.exit(0);
})();
