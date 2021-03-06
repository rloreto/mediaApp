
var vimeoService = require('../../services/vimeo');
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

    var vimeos = yield vimeoService.findByPage(query, page, 18);

    res.status(200).json(vimeos);
  } catch (err) {
    res.status(500).json(err);
  }

});
