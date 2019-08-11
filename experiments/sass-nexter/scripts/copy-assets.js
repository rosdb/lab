const path = require('path');
const shell = require('shelljs');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

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
  shell.exit(0);
})();
