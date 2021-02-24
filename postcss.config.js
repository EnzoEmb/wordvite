module.exports = {
  // parser: 'sugarss',
  // map: false,
  plugins: {
    'postcss-nested': {},
    'postcss-url': {
        url: (asset) => {
            // if (asset.url[0] === '/') {
                // return `/static${asset.url}`;
            // }
            // return asset.url;
            return `http://wordvite.test/wp-content/themes/wordvite/assets/${asset.url}`;
        }
    }
  }
}