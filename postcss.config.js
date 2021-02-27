// console.log(process.env.NODE_ENV)

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
            return ( process.env.NODE_ENV == 'development' ? `http://wordvite.test/wp-content/themes/wordvite/src/${asset.url}` : '../'+asset.url);
        }
    }
  }
}