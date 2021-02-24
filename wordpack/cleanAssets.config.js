const fs = require('fs');
const path = require('path');



fs.readdir('./assets', (err, files) => {
  if (err) console.log(err);
  // console.log(files)
  for (const file of files) {
    if (file != "img") {

      fs.unlink(path.join('./assets/', file), err => {
        if (err) console.log(err);
      });
    }
  }
});