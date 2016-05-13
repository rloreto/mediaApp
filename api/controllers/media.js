var mongoose = require('mongoose');
var Media = require('../../models/media');
const co = require('co-express');

//GET - Return all medias in the DB
exports.findByPage = co(function*(req, res) {
  try {
    var page = req.params.page;
    if (!page) {
      page = 1;
    }
    const pageSize = 18;
    const total = yield Media.count({}).exec();
    const medias = yield Media.find().skip(pageSize * (page - 1)).limit(pageSize).exec();

    var maxPage = parseInt(total / pageSize) + 1;

    res.status(200).json({
      isLastPage: parseInt(page) === maxPage,
      medias: medias
    });
  } catch (e) {
    res.send(500, e.message);
  }
});

exports.add = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var media = new Media({
    title: req.body.title,
    id: req.body.providerId,
    user: req.body.user,
    provider: req.body.provider
  });

  media.save(function(err, media) {
    if (err) return res.status(500).send(err.message);
    res.status(200).json(media);
  });
};

exports.findById = function(req, res) {
  Media.findById(req.params.id, function(err, media) {
    if (err) return res.send(500).senf(err.message);

    console.log('GET /media/' + req.params.id);
    res.status(200).json(media);
  });
};

exports.update = function(req, res) {
  Media.findById(req.params.id, function(err, media) {
    media.title = req.body.title;
    media.providerId = req.body.providerId;
    media.user = req.body.user;
    media.provider = req.body.provider;

    media.save(function(err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).json(media);
    });
  });
};

exports.delete = function(req, res) {
  Media.findById(req.params.id, function(err, media) {
    media.remove(function(err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    })
  });
};
