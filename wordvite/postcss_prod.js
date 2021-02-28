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
            return `../${asset.url}`;
        }
    }
  }
}