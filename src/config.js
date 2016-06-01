const path = require('path');

module.exports = {
  views: {
    path: path.resolve('./views'),
    opts: {
      map: {html: 'nunjucks'},
      extension: 'html'
    }
  },
  statics: {
    path: path.resolve('./public'),
    opts: {gzip: true}
  }
};
