var Vimeo = require('vimeo').Vimeo;
const co = require('co-express');
var Q = require('q');

var CLIENT_ID ='82546bdc9d30fb4fd7d3050297eca79ff3e01f40';
var CLIENT_SECRET ='zqgE3Lvdov2rE6RZoqv09W0legSx1f8brpSm3PtTbvbgGj61WsEZf/uxZQes6psXJTTRkd3apzNpRJLjwgi4VNJOTEAhfPGPFV/dslpIetiUQE69J3G3KxBVRpvXNreY';

/*var CLIENT_ID ='6603077a6f4c8c3737d6278f831fd645d2ad84af';
var CLIENT_SECRET ='7BvHTfwJ/i79kCjeyjdY2Gitg6OG+C3v/PIVHw2dJP4aBSv3KbI/TT4xyuEPl9YjEqe3LTWZEFWIfn+lTKbPebQbOCDqG5ZYyCd4b63XOTvzyXccfSY2Bya/YziZYurE';
var ACCESS_TOKEN = '1f309077f9e712b884a94e5468028b46';*/

var mapVimeoObjects = function(vimeoApiObject) {

  var vimeoMedias = [];
  if (vimeoApiObject && vimeoApiObject.data) {
    vimeoApiObject.data.forEach(function(item) {
      vimeoMedias.push({
        title: item.name,
        videoHtml: item.embed.html,
        user: item.user,
        description: item.description,
        id: item.uri.substring(item.uri.lastIndexOf('/') + 1),
        provider: 'vimeo'
      });
    });
  }
  return vimeoMedias;
};

var getVideos = function(query, page, perPage){

  var deferred = Q.defer();
  var lib = new Vimeo(CLIENT_ID, CLIENT_SECRET);
  //var lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

  lib.generateClientCredentials(['public', 'private'], function(err, access_token) {
    if (err) {
      deferred.reject(new Error(err));
    }

    var token = access_token.access_token;
    lib.access_token = access_token.access_token;
    lib.request({
      path: '/videos',
      query: {
        page: page,
        per_page: perPage,
        query: query,
        filter: 'CC'
      }
    }, function(error, body, status_code, headers) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        var medias = mapVimeoObjects(body);
        var maxPage = parseInt(body.total / body.per_page) +1;

        deferred.resolve({
          isLastPage: body.page === maxPage,
          medias: medias
        });
      }
    });
  });
  return deferred.promise;
};

exports.findByPage = co(function*(query, page, perPage) {
  return yield getVideos(query, page, perPage);
});
