

var flickrService = require('../../services/flickr');
const co = require('co-express');

exports.findByPage = co(function*(req, res) {
  try {
    var page = req.params.page;
    if (!page) {
      page = 1;
    }
    var query = decodeURI(req.params.query);
    if (!query) {
      query = '';
    }

    var images = yield flickrService.findByPage(query,page, 18);

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});
