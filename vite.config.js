
const { resolve } = require('path')


export default {

  root: 'src',
  base: './',


  build: {
    outDir: resolve(__dirname, 'assets/js/'),
    emptyOutDir: false,
    manifest: true,
    target: 'es2018',
    // our entry
    rollupOptions: {
      input: {
        homepage: resolve(__dirname, 'src/js/homepage.js'),
        page_1: resolve(__dirname, 'src/js/page_1.js')
      },
      output: {

        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
}