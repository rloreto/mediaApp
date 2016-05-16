/*var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "64c873b66c26e36ac3e75603c848d1a8",
      secret: "1a5d49f145bb8d53",
      user_id: "69390832@N03",
      access_token: "72157668071774231-05bae2f5c7d41dcc",
      access_token_secret: "0bf38847bb39673d"
    };*/

var util = require('util');
var api_key = '64c873b66c26e36ac3e75603c848d1a8';
const co = require('co-express');
var Q = require('q');

var mapFlickrObjects = function(flickrApiObject) {
  var images = [];

  if (flickrApiObject && flickrApiObject.photo) {
    flickrApiObject.photo.forEach(function(item) {
      images.push({
        title: item.title,
        url: util.format('https://farm%s.staticflickr.com/%s/%s_%s_n.jpg', item.farm, item.server, item.id, item.secret),
        user: item.user,
        id: item.id,
        provider: 'flickr'
      });
    });
  }

  return images;
};

var getImages =function(query, page, perPage){
  var deferred = Q.defer();

  var Flickr = require("node-flickr");
  var keys = {
    api_key: api_key
  }
  flickr = new Flickr(keys);

  var ss =  flickr.get("photos.search", {
    text: query,
    page: page,
    per_page: perPage
  }, function(err, result) {
    if (err || result.stat !== 'ok') {
      deferred.reject(new Error(err));
    } else{
      var medias = mapFlickrObjects(result.photos)
      var maxPage = parseInt(result.photos.total / result.photos.perpage) +1;

      deferred.resolve({
        isLastPage: result.photos.page === maxPage,
        medias: medias
      });
    }
  });

  return deferred.promise;
}


exports.findByPage = co(function*(query, page, perPage) {
  return yield getImages(query, page, perPage);
});
