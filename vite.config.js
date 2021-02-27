
import legacy from '@vitejs/plugin-legacy'
const { resolve } = require('path')


export default ({ command, mode }) => {

  // var postcss_config = (mode == 'development' ? 'wordpack/postcss.config.js' : 'wordpack/postcss.prod.js'); 
  // console.log(mode);

  return {

    //   css: {
    //     postcss: {

    //       plugins: {
    //         'postcss-nested': {},
    //       'postcss-url': {
    //         url: (asset) => {
    //           // if (asset.url[0] === '/') {
    //           // return `/static${asset.url}`;
    //           // }
    //           // return asset.url;
    //           return (mode == 'development' ? `http://wordvite.test/wp-content/themes/wordvite/assets/${asset.url}` : `../${asset.url}`);
    //         }
    //       }
    //     }

    //   }
    // },


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
      // target: 'es2018',
      // our entry
      assetsDir: './',
      rollupOptions: {
        input: {
          app: resolve(__dirname, 'src/js/app.js'),
          page_1: resolve(__dirname, 'src/js/page_1.js'),
          //     asdasd: resolve(__dirname, 'src/css/app.css')
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

}