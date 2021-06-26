"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptFiles = getScriptFiles;

var _helper = require("./helper");

var fs = require('fs');

var _require = require('path'),
    resolve = _require.resolve; // import * as fs from 'fs';
// import {resolve} from 'path';


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
      var name_no_extension = (0, _helper.removeStringExtension)(file);
      main_js_files[name_no_extension] = resolve(__dirname, 'src/js/' + file);
    });
  });
  return main_js_files;
} // module.exports = {
//   getScriptFiles
// }