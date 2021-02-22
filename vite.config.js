
import legacy from '@vitejs/plugin-legacy'
const { resolve } = require('path')


export default {

  root: 'src',
  base: './',

  plugins: [
    legacy({
      targets: ['defaults']
    })
  ],

  build: {
    outDir: resolve(__dirname, 'assets/'),
    emptyOutDir: false,
    manifest: true,
    target: 'es2018',
    // our entry
    rollupOptions: {
      input: {
        homepage: resolve(__dirname, 'src/js/homepage.js'),
        page_1: resolve(__dirname, 'src/js/page_1.js'),
    //     asdasd: resolve(__dirname, 'src/css/app.css')
      },
      output: {

        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
}