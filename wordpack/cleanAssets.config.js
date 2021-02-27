const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.cyan('cleaning assets folder...'))

fs.readdir('./dist/js', (err, files) => {
  if (err) console.log(err);
  // console.log(files)
  for (const file of files) {
    if (file != "img") {

      fs.unlink(path.join('./assets/js', file), err => {
        if (err) console.log(err);
      });
    }
  }
});