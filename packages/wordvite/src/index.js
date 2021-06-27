const fs = require('fs');
const { resolve } = require('path');

import { removeStringExtension } from './helper';



/**
 * 
 * Get js files from source folder to add to vite config folder
 */
function getScriptFiles() {
  var main_js_files = {};
  var files = fs.readdirSync(process.cwd() + '/src/js');
  files.forEach(function (file) {
    var name_no_extension = removeStringExtension(file);
    main_js_files[name_no_extension] = resolve(process.cwd(), 'src/js/' + file);
  });
  return main_js_files;
}




// module.exports = {
//   getScriptFiles
// }

export { getScriptFiles };