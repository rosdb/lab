const path = require('path');
const shell = require('shelljs');

const DIST_DIR = path.resolve(__dirname, '../', 'dist');

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

// --- Program
(function run() {
  clean([DIST_DIR]);
  shell.mkdir('-p', `${DIST_DIR}/public`);
  shell.exit(0);
})();
