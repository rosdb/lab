const path = require('path');
const shell = require('shelljs');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_PUBLIC_DIR = path.resolve(DIST_DIR, 'public');

// --- Cleaner
function clean(targets) {
  if (!Array.isArray(targets)) {
    shell.exit(1);
    return;
  }

  shell.echo('Clean project...');
  shell.rm('-r', targets);
}

// --- Program
(function run() {
  clean([DIST_DIR]);
  shell.mkdir('-p', DIST_PUBLIC_DIR);
  shell.exit(0);
})();
