#!/usr/bin/env node

const archiver = require('../src/archiver');
const image = require('../src/image');
const clean = require('../src/clean');
const path = process.cwd();
const program = require('commander');
const { spawn } = require('child_process');

// watch (no arguments)
if (!process.argv.slice(2).length) {

  spawn('cd > assets/watch && npx vite', {
    stdio: 'inherit',
    shell: true
  });

  image.optimize_images(true);
}



// build
program
  .command('build')
  .description('main build process')
  .action(() => {
    console.log('BUILDDD')

    clean.clean_assets();

    spawn('npx vite build', {
      stdio: 'inherit',
      shell: true
    });

    image.optimize_images(true);


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
