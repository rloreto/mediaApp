var mongoose = require('mongoose');
var Media = require('../../models/media');
var Favorite = require('../../models/favorite');
const co = require('co-express');
var Q = require('q');

//GET - Return all medias in the DB
exports.findByPage = co(function*(req, res) {
  try {
    var page = req.params.page;
    if (!page) {
      page = 1;
    }
    const pageSize = 18;
    const total = yield Media.count({}).exec();
    const medias = yield Media.find().populate('likes').skip(pageSize * (page - 1)).limit(pageSize).sort({
        date: -1 //Sort by Date Added DESC
    }).exec();

    var maxPage = parseInt(total / pageSize) + 1;

    res.status(200).json({
      isLastPage: parseInt(page) === maxPage,
      medias: medias
    });
  } catch (e) {
    res.send(500, e.message);
  }
});


exports.add = co(function*(req, res) {
  console.log('POST');
  console.log(req.body);

  try{
    var user = req.body.user.toLowerCase()
    var id =req.body.id.replace('/','_');
    var provider = req.body.provider;
    var title = req.body.title;
    var url = req.body.url;

    var media = yield Media.findOne({
      id: id,
      provider: provider
    }).exec();


    if(!media){
      media = new Media({
        title: title,
        id: id,
        user: user,
        provider: provider,
        url: url
      });

      media = yield media.save();
    }


    var favorite = yield Favorite.findOne({
      media: media._id,
      user: user
    }).exec();

    if(!favorite){
      favorite = new Favorite({
        user: user,
        _media: media._id
      });
      yield favorite.save();
    }

    media.likes.push(favorite);
    media.save();

    res.status(200).json(media);

  } catch (e) {
    res.status(500).send(e);
  }

});




exports.delete = co(function*(req, res) {
  try{
    if(!req.body.user){
      res.status(200).send('the user field is required.');
      return;
    }
    var mediaId =req.params.mediaId;
    var user = req.body.user;

    var filter = {
      _media: mediaId,
      user: user
    };
    var returnObject = {};
    var favorite = yield  Favorite.findOne(filter).exec();

    var media = yield  Media.findById(favorite._media).populate('likes').exec();
    var indexToDelete= media.likes.indexOf(new mongoose.mongo.ObjectID(mediaId));

    for (var i = 0; i < media.likes.length; i++) {
      var like =  media.likes[i];
      if(like._media.toString() === media._id.toHexString() && like.user === user){
        media.likes.splice(i, 1);
          yield media.save();
        break;
      }
    }

    if(favorite.length>0){
      returnObject = yield favorite[0].remove();
    }

    res.status(200).json(returnObject);
  } catch (e) {
    res.status(500).send(e);
  }

});
