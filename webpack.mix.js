let mix = require('laravel-mix');
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

mix.setPublicPath('assets')

/**
 * 
 * JS
 */
mix.js('src/js/homepage.js', 'js')
// mix.js('src/js/page_1.js', 'js')
// mix.js('src/js/page_2.js', 'js')

/**
 * 
 * SASS
 */
mix.sass('src/sass/app.scss', 'css');



/**
 * 
 * Webpack Config
 */

if (mix.inProduction()) {
  
  mix.webpackConfig({
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!img/**'],
      }),
      new ChunksWebpackPlugin({
        generateChunksManifest: true,
        generateChunksFiles: false,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          }
        }
      },
    },
  });

} else {

  mix.webpackConfig({
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!img/**', '!hot'],
      }),
    ],
  });

}



mix.disableNotifications();