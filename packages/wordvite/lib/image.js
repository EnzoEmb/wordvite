"use strict";

/*
|--------------------------------------------------------------------------
| Wordvite v0.1.0 Image Optimizer
|--------------------------------------------------------------------------
*/
var fs = require('fs'); // const { readdirSync } = require('fs')


var path = require('path');

var sharp = require('sharp');

var chokidar = require('chokidar');

var chalk = require('chalk');

function optimize_images() {
  var IS_WATCH = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var SRC_FOLDER = './src/img/';
  var OUTPUT_FOLDER = './assets/img/';

  if (IS_WATCH) {
    console.log(chalk.cyan('  watching images for optimization...'));
    chokidar.watch(SRC_FOLDER).on('add', function (event, path) {
      optimizeImage(event);
    });
    chokidar.watch(SRC_FOLDER).on('unlink', function (event, path) {
      removeImage(event);
    });
    chokidar.watch(SRC_FOLDER).on('unlinkDir', function (event, path) {
      removeFolder(event);
    });
  } else {
    // process all images from src without chokidar
    console.log(chalk.cyan('optimizing images folder...'));
    walkDir(SRC_FOLDER, function (filePath) {
      optimizeImage(filePath);
    });
  } // function processFolder(folder) {
  //   fs.readdir(folder, (err, files) => {
  //     // console.log(files);
  //     files.forEach(file => {
  //       if (!fs.statSync(folder + '/' + file).isDirectory()) {
  //         optimizeImage(folder + file);
  //         // console.log(file);
  //       } else {
  //         processFolder(file)
  //         // console.log(file)
  //       }
  //     });
  //   });
  // }


  function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(function (f) {
      var dirPath = path.join(dir, f);
      var isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
  }

  ;

  function removeFolder(path) {
    var mirror_folder = path.replace('src', 'assets');

    if (fs.existsSync(mirror_folder)) {
      fs.rmdirSync(mirror_folder, {
        recursive: true
      });
    }
  }

  function optimizeImage(path) {
    var file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png

    var extension = file.substr(file.lastIndexOf('.') + 1); // .png

    var filename_without_extension = file.split('.').slice(0, -1).join('.'); // my_image

    var file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.'); // subfolder\my_image

    var file_with_folder = path.replace(/\\/g, "/").replace("src/img/", ""); // subfolder\my_image.png

    var folder = file_with_folder.split('/').slice(0, -1).join(); // subfolder/
    // console.log('file', file)
    // console.log('path', path)
    // console.log('file_without_extension', file_without_extension)
    // console.log('file_with_folder', file_with_folder)
    // console.log('folder', folder)

    var i = sharp(fs.readFileSync(path)); // create folder if dont exists

    if (!fs.existsSync(OUTPUT_FOLDER + folder)) {
      fs.mkdirSync(OUTPUT_FOLDER + folder, {
        recursive: true
      });
    } // Convert to .webp


    if (!fs.existsSync(OUTPUT_FOLDER + file_without_extension + '.webp')) {
      i.toFormat('webp', {
        quality: 50
      });
      i.toFile(OUTPUT_FOLDER + file_without_extension + '.webp').then(function () {
        return console.log(chalk.bgGreen.black('Converted'), file, 'to WEBP');
      })["catch"](function (e) {
        return console.log(chalk.bgRed.black('Failed converting'), file, e, 'skipping...');
      });
    } // Optimize same format


    if (!fs.existsSync(OUTPUT_FOLDER + file_with_folder)) {
      i.toFormat(extension, {
        quality: 50
      });
      i.toFile(OUTPUT_FOLDER + file_with_folder).then(function () {
        return console.log(chalk.bgGreen.black('Optimized'), file);
      })["catch"](function (e) {
        return console.log(chalk.bgRed.black('Failed converting'), file, e, 'skipping...');
      });
    }
  }

  function removeImage(path) {
    var file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png

    var extension = file.substr(file.lastIndexOf('.') + 1); // .png

    var filename_without_extension = file.split('.').slice(0, -1).join('.'); // my_image

    var file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.'); // subfolder\my_image

    var file_with_folder = path.replace(/\\/g, "/").replace("src/img/", ""); // subfolder\my_image.png

    var folder = file_with_folder.split('/').slice(0, -1).join(); // subfolder/
    // fs.unlinkSync('./assets/img/'+file);
    // fs.unlinkSync('./assets/img/'+filename_without_extension+'webp');

    if (fs.existsSync(OUTPUT_FOLDER + file_with_folder)) {
      fs.unlink(OUTPUT_FOLDER + file_with_folder, function (err) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Removed', file);
      });
    }

    if (fs.existsSync(OUTPUT_FOLDER + folder + '/' + filename_without_extension + '.webp')) {
      fs.unlink(OUTPUT_FOLDER + folder + '/' + filename_without_extension + '.webp', function (err) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Removed', filename_without_extension + '.webp');
      });
    }
  }
}

module.exports = {
  optimize_images: optimize_images
};