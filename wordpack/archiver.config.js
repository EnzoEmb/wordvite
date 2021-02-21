var file_system = require('fs');
var archiver = require('archiver');

var output = file_system.createWriteStream('theme.zip');
var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

// archive.directory('./');

archive.glob('**', {
    ignore: ['node_modules/**', 'wordpack/**', 'theme.zip', 'webpack.mix.js', 'todo.md', 'package.json', 'package-lock.json', 'src/**', '.git/**', './**']
})


archive.finalize();