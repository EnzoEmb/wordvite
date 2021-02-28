
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
    assetsDir: './',
    rollupOptions: {
      input: {
        global: resolve(__dirname, 'src/js/global.js'),
        global_css: resolve(__dirname, 'src/css/vendor.css'),
        homepage: resolve(__dirname, 'src/js/homepage.js'),
      },
      output: {
        dir: 'assets/js'
        // entryFileNames: `js/[name].js`,
        // chunkFileNames: `js/[name].js`,
        // assetFileNames: `js/[name].[ext]`
      }
    }
  },
}