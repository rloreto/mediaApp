var Vimeo = require('vimeo').Vimeo;

var mapVimeoObjects = function(vimeoApiObject) {

  var vimeoMedias = [];
  if (vimeoApiObject && vimeoApiObject.data) {
    vimeoApiObject.data.forEach(function(item) {
      vimeoMedias.push({
        title: item.name,
        videoHtml: item.embed.html,
        user: item.user,
        description: item.description,
        id: item.uri.substring(item.uri.lastIndexOf('/') + 1)
      });
    });
  }

  return vimeoMedias;
};


//GET - Return all medias in the DB
exports.findByPage = function(req, res) {

  var page = req.params.page;
  if (!page) {
    page = 1;
  }
  var lib = new Vimeo('82546bdc9d30fb4fd7d3050297eca79ff3e01f40', 'zqgE3Lvdov2rE6RZoqv09W0legSx1f8brpSm3PtTbvbgGj61WsEZf/uxZQes6psXJTTRkd3apzNpRJLjwgi4VNJOTEAhfPGPFV/dslpIetiUQE69J3G3KxBVRpvXNreY');
  //var lib = new Vimeo('6603077a6f4c8c3737d6278f831fd645d2ad84af', '7BvHTfwJ/i79kCjeyjdY2Gitg6OG+C3v/PIVHw2dJP4aBSv3KbI/TT4xyuEPl9YjEqe3LTWZEFWIfn+lTKbPebQbOCDqG5ZYyCd4b63XOTvzyXccfSY2Bya/YziZYurE', '1f309077f9e712b884a94e5468028b46');
  lib.generateClientCredentials(['public', 'private'], function(err, access_token) {
    if (err) {
      throw err;
    }

    var token = access_token.access_token;
    lib.access_token = access_token.access_token;


    lib.request( /*options*/ {
      // This is the path for the videos contained within the staff picks channels
      path: '/videos',
      // This adds the parameters to request page two, and 10 items per page
      query: {
        page: page,
        per_page: 18,
        query: 'official music video',
        filter: 'CC'
      }
    }, /*callback*/ function(error, body, status_code, headers) {
      if (err) {
        res.send(500, err.message);
      } else {
        var medias = mapVimeoObjects(body);

        var maxPage = parseInt(body.total / body.per_page) +1;

        var responseData = {
          isLastPage: body.page === maxPage,
          medias: medias
        };
        res.status(200).json(responseData);
      }
    });
  });
};
