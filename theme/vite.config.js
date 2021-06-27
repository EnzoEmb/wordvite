
import legacy from '@vitejs/plugin-legacy';
import { getScriptFiles } from "wordvite";
import { resolve } from 'path';

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
      input: getScriptFiles(),
      output: {
        dir: 'assets/js'
      }
    }
  },
}