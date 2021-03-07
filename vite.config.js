
import legacy from '@vitejs/plugin-legacy'
const { resolve } = require('path')


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
      input: {
        global: resolve(__dirname, 'src/js/global.js'),
        homepage: resolve(__dirname, 'src/js/homepage.js'),
      },
      output: {
        dir: 'assets/js'
      }
    }
  },
}