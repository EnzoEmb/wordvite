const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.cyan('cleaning assets folder...'))

// remove old files
if (fs.existsSync('./assets/js')) {
  fs.readdir('./assets/js', (err, files) => {
    if (err) console.log(err);
    for (const file of files) {
      if (file != "img") {
        fs.unlink(path.join('./assets/js', file), err => {
          if (err) console.log(err);
        });
      }
    }
  });
}

// remove watch file
if (fs.existsSync('./assets/watch')) {
  fs.unlink(path.join('./assets/', 'watch'), err => {
    if (err) console.log(err);
  });
}
