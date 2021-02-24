const fs = require('fs');
// const { readdirSync } = require('fs')
const path = require('path');
const sharp = require('sharp');
const chokidar = require('chokidar');
const chalk = require('chalk');

const SRC_FOLDER = './src/img/';
const OUTPUT_FOLDER = './assets/img/';

// check if has --watch args
var IS_WATCH = false;
const args = process.argv;
if (args.includes('--watch')) {
  IS_WATCH = true;
}



if (IS_WATCH) {
  chokidar.watch(SRC_FOLDER).on('add', (event, path) => {
    optimizeImage(event);
  });

  chokidar.watch(SRC_FOLDER).on('unlink', (event, path) => {
    removeImage(event);
  });
  chokidar.watch(SRC_FOLDER).on('unlinkDir', (event, path) => {
    removeFolder(event);
  });

} else {

  // process all images from src without chokidar
  // processFolder(SRC_FOLDER);
  walkDir(SRC_FOLDER, function (filePath) {

    optimizeImage(filePath)



  });



}


// function processFolder(folder) {

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
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};





function removeFolder(path) {

  var mirror_folder = path.replace('src', 'assets')

  if (fs.existsSync(mirror_folder)) {
    fs.rmdirSync(mirror_folder, { recursive: true })
  }
}



function optimizeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png
  const extension = file.substr(file.lastIndexOf('.') + 1);  // .png
  const filename_without_extension = file.split('.').slice(0, -1).join('.')  // my_image
  const file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.') // subfolder\my_image
  const file_with_folder = path.replace(/\\/g, "/").replace("src/img/", "") // subfolder\my_image.png
  const folder = file_with_folder.split('/').slice(0, -1).join() // subfolder/

  // console.log('file', file)
  // console.log('path', path)
  // console.log('file_without_extension', file_without_extension)
  // console.log('file_with_folder', file_with_folder)
  // console.log('folder', folder)




  const i = sharp(fs.readFileSync(path));

  // create folder if dont exists
  if (!fs.existsSync(OUTPUT_FOLDER + folder)) {
    fs.mkdirSync(OUTPUT_FOLDER + folder, {recursive: true});
  }


  // Convert to .webp
  if (!fs.existsSync(OUTPUT_FOLDER + file_without_extension + '.webp')) {
    i.toFormat('webp', { quality: 50 })
    i.toFile(OUTPUT_FOLDER + file_without_extension + '.webp')
      .then(() => console.log(chalk.bgGreen.black('Converted'), file, 'to WEBP'))
      .catch(e => console.log(chalk.bgRed.black('Failed converting'), file, e, 'skipping...'))
  }


  // Optimize same format
  if (!fs.existsSync(OUTPUT_FOLDER + file_with_folder)) {
    i.toFormat(extension, { quality: 50 })
    i.toFile(OUTPUT_FOLDER + file_with_folder)
      .then(() => console.log(chalk.bgGreen.black('Optimized'), file))
      .catch(e => console.log(chalk.bgRed.black('Failed converting'), file, e, 'skipping...'))
  }



}


function removeImage(path) {

  const file = path.substring(path.lastIndexOf('\\') + 1); // my_image.png
  const extension = file.substr(file.lastIndexOf('.') + 1);  // .png
  const filename_without_extension = file.split('.').slice(0, -1).join('.')  // my_image
  const file_without_extension = path.replace(/\\/g, "/").replace("src/img/", "").split('.').slice(0, -1).join('.') // subfolder\my_image
  const file_with_folder = path.replace(/\\/g, "/").replace("src/img/", "") // subfolder\my_image.png
  const folder = file_with_folder.split('/').slice(0, -1).join() // subfolder/

  // fs.unlinkSync('./assets/img/'+file);
  // fs.unlinkSync('./assets/img/'+filename_without_extension+'webp');
  if (fs.existsSync(OUTPUT_FOLDER + file_with_folder)) {
    fs.unlink(OUTPUT_FOLDER + file_with_folder, (err) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('Removed', file);
    })
  }

  if (fs.existsSync(OUTPUT_FOLDER + folder + '/' + filename_without_extension + '.webp')) {
    fs.unlink(OUTPUT_FOLDER + folder + '/' + filename_without_extension + '.webp', (err) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('Removed', filename_without_extension + '.webp');
    })
  }

}