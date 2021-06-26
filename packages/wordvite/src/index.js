const fs = require('fs');
const { resolve } = require('path');

import { removeStringExtension } from './helper';

/**
 * 
 * Get js files from source folder to add to vite config folder
 */
function getScriptFiles() {
  var main_js_files = [];
  var scripts_folder = './src/js';
  fs.readdir(scripts_folder, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      // var name_no_extension = file.split('.').slice(0, -1).join('.');
      var name_no_extension = removeStringExtension(file);
      main_js_files[name_no_extension] = resolve(__dirname, 'src/js/' + file);
    });
  });

  return main_js_files;
}



// module.exports = {
//   getScriptFiles
// }

export { getScriptFiles };