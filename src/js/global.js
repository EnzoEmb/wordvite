import 'vite/dynamic-import-polyfill';

import '../css/vendor.css'
import '../css/global.css'

const version = document.querySelector('.wv-version')
version.innerHTML = 'v0.1.0'


// hmr
if (import.meta.hot) {
  import.meta.hot.accept()
}