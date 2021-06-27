#!/usr/bin/env node

// const commander = require('commander');
const archiver = require('../src/archiver');
// import arch from '../src/archiver';

// const { resolve } = require('path');
const path = process.cwd();

// const path = require('path');
// console.log(process.env);

const program = require('commander');

// console.log('Basdasd')


// const program = new commander.Command();

// const brew = program.command('brew');
// brew.command('wordvite')
//   .action(() => {
//     console.log('brew tea');
//   });

program
  .command('zip')
  .description('compress theme into a zip file without node_modules and source files')
  .action(() => {
    console.log('zipping')
    archiver.zip_theme();
  });



program.parse(process.argv);