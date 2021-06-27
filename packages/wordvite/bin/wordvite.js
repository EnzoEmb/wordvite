#!/usr/bin/env node

const archiver = require('../src/archiver');
const image = require('../src/image');
const path = process.cwd();
const program = require('commander');
// const cp = require('child_process');
const { spawn, execSync } = require('child_process');
// const vite = require('vite');

// watch (no arguments)
if (!process.argv.slice(2).length) {
  // console.log('WATCHHH')
  // console.log(vite);
  // vite.build();
  // vite();
  // cp.exec('vite --config my-config.js', function(e, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   if (e) throw e;
  // });
  // execSync('npm run vite', function(e, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  //   if (e) throw e;
  // });
  // var spawna = spawn('npx vite');     
  // spawna.stdout.on('data', function(msg){         
  //     console.log(msg.toString())
  // });
  // console.log(path);
  spawn('npx vite', {
    stdio: 'inherit',
    shell: true
  });


  // execSync('npm run vite', (err, stdout, stderr) => {
  //   if (err) {
  //     // node couldn't execute the command
  //     return;
  //   }

  //   // the *entire* stdout and stderr (buffered)
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  // });
}

// build
program
  .command('build')
  .description('main build process')
  .action(() => {
    console.log('BUILDDD')
  });




// image optimize
program
  .command('images')
  .option('-w, --watch', 'is in watching mode')
  .description('optimize images')
  .action((options) => {
    if (options.watch) {
      image.optimize_images(true);
    } else {
      image.optimize_images();
    }
  });




// zip
program
  .command('zip')
  .description('compress theme into a zip file without node_modules and source files')
  .action(() => {
    // console.log('zipping')
    archiver.zip_theme();
  });



program.parse(process.argv);
