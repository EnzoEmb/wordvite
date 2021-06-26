
import legacy from '@vitejs/plugin-legacy'
const { resolve } = require('path')
const fs = require('fs');


// get js files
var main_js_files = [];
fs.readdir('./src/js', function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    // console.log(file);
    var name = file.replace('.js', "");
    // main_js_files.push(name, resolve(__dirname, 'src/js/' + file))
    main_js_files[name] = resolve(__dirname, 'src/js/' + file);

  });
  // console.log(main_js_files);
});



export default {
  root: 'src',
  base: './',
  publicDir: 'assets',

  plugins: [
    legacy({
      targets: ['defaults']
    })
  ],

  build: {
    outDir: resolve(__dirname, 'assets/'),
    emptyOutDir: false,
    manifest: true,
    assetsDir: './',
    rollupOptions: {
      // input: {
      //   global: resolve(__dirname, 'src/js/global.js'),
      //   homepage: resolve(__dirname, 'src/js/homepage.js'),
      // },
      input: main_js_files,
      output: {
        dir: 'assets/js'
      }
    }
  },
}