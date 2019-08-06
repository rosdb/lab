const path = require('path');
const shell = require('shelljs');

const DIST_DIR = path.resolve(__dirname, '../', 'dist');
const PUBLIC_DIR = path.resolve(__dirname, '../', 'public');

// --- Helpers
function formattingList(files) {
  if (!Array.isArray(files)) {
    shell.exit(1);
    return;
  }

  return files.length >= 1
    ? files.join('\n').toString()
    : 'Specifies a list of file to delete.';
}

// --- Cleaner
function clean(targets) {
  if (!Array.isArray(targets)) {
    shell.exit(1);
    return;
  }

  shell.echo('Clean project...');
  shell.echo(formattingList(targets));
  shell.rm('-r', targets);
}

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
  clean([DIST_DIR]);
  copy(PUBLIC_DIR, DIST_DIR);
  shell.exit(0);
})();
