module.exports = function(app, router) {
  var mediaController = require('./controllers/media');
  var vimeoController = require('./controllers/vimeo');

  router.route('/medias')
    .get(mediaController.findAll)
    .post(mediaController.add);

  router.route('/medias/:id')
    .get(mediaController.findById)
    .put(mediaController.update)
    .delete(mediaController.delete);


  router.route('/vimeos')
    .get(vimeoController.findAll);

  app.use('/api', router);
}
