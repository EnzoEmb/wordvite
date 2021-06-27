"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptFiles = getScriptFiles;
exports.getThemeUrl = getThemeUrl;

var _helper = require("./helper");

var fs = require('fs');

var _require = require('path'),
    resolve = _require.resolve;

var WV_CONFIG = require(process.cwd() + '/wordvite.config.js');

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
}
/**
 * 
 * Get wordpress theme url 
 */


function getThemeUrl() {
  return WV_CONFIG.dev_url + '/wp-content/themes/' + WV_CONFIG.theme_name + '/assets/';
} // module.exports = {
//   getScriptFiles
// }