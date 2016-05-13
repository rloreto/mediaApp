module.exports = function(app, router) {
  var mediaController = require('./controllers/media');
  var vimeoController = require('./controllers/vimeo');

  router.route('/medias')
    .get(mediaController.findByPage)
    .post(mediaController.add);

  router.route('/medias/:page')
      .get(mediaController.findByPage);

  router.route('/medias/:id')
    .get(mediaController.findById)
    .put(mediaController.update)
    .delete(mediaController.delete);

  router.route('/vimeos')
    .get(vimeoController.findByPage);
  router.route('/vimeos/:page')
    .get(vimeoController.findByPage);


  app.use('/api', router);
}
