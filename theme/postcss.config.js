// import { getThemeUrl } from "wordvite";
var wordvite = require("wordvite");


module.exports = {
  plugins: {
    'postcss-nested': {},
    'postcss-url': {
      url: (asset) => {
        return (process.env.NODE_ENV == 'development' ? wordvite.getThemeUrl() + asset.url : '../' + asset.url);
      }
    }
  }
}