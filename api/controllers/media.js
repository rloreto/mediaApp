var vimeoService = require('../../services/flickr');
var flickrService = require('../../services/flickr');
const co = require('co-express');

//GET - Return all medias in the DB
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

    const total = yield vimeoService(query,page, 9);
    const medias = yield flickrService(page,page, 9);

    var maxPage = parseInt(total / pageSize) + 1;

    res.status(200).json({
      isLastPage: parseInt(page) === maxPage,
      medias: medias
    });
  } catch (e) {
    res.send(500, e.message);
  }
});
