module.exports = function(app, router) {
  var favoriteMediaController = require('./controllers/favoriteMedia');
  var vimeoController = require('./controllers/vimeo');
  var flickrController = require('./controllers/flickr');



  router.route('/favorites')
    .get(favoriteMediaController.findByPage);
  router.route('/favorites/:page')
    .get(favoriteMediaController.findByPage);

  router.route('/favorite')
    .post(favoriteMediaController.add);
  router.route('/favorite/:mediaId')
    .delete(favoriteMediaController.delete);


  router.route('/vimeo/:query')
    .get(vimeoController.findByPage);
  router.route('/vimeo/:query/:page')
    .get(vimeoController.findByPage);
  router.route('/flickr/:query')
    .get(flickrController.findByPage);
  router.route('/flickr/:query/:page')
    .get(flickrController.findByPage);

  app.use('/api', router);
}
