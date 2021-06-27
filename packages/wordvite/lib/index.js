"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptFiles = getScriptFiles;

var _helper = require("./helper");

var fs = require('fs');

var _require = require('path'),
    resolve = _require.resolve;

/**
 * 
 * Get js files from source folder to add to vite config folder
 */
function getScriptFiles() {
  var main_js_files = {};
  var files = fs.readdirSync(process.cwd() + '/src/js');
  files.forEach(function (file) {
    var name_no_extension = (0, _helper.removeStringExtension)(file);
    main_js_files[name_no_extension] = resolve(process.cwd(), 'src/js/' + file);
  });
  return main_js_files;
} // module.exports = {
//   getScriptFiles
// }