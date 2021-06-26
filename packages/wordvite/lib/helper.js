"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeStringExtension = removeStringExtension;

function removeStringExtension(string) {
  return string.split('.').slice(0, -1).join('.');
}