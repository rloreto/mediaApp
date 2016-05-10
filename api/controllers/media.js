var mongoose = require('mongoose');
var Media = require('../../models/media');

//GET - Return all tvshows in the DB
exports.findAll = function(req, res) {
  Media.find(function(err, medias) {
    if (err) {
      res.send(500, err.message);
    }

    console.log('GET /media');
    res.status(200).jsonp(medias);
  });
};

exports.add = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var media = new Media({
    title: req.body.title,
    url: req.body.url,
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
      if(err) return res.send(500).senf(err.message);

      console.log('GET /media/' + req.params.id);
          res.status(200).json(media);
      });
};

exports.update = function(req, res) {
  Media.findById(req.params.id, function(err, media) {
    media.title = req.body.title;
    media.url = req.body.url;
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
          if(err) return res.status(500).send(err.message);
    res.status(200).send();
      })
  });
};
