module.exports = function(app, router) {
  var mediaController = require('./controllers/media');

  router.route('/medias')
    .get(mediaController.findAll)
    .post(mediaController.add);

  router.route('/medias/:id')
    .get(mediaController.findById)
    .put(mediaController.update)
    .delete(mediaController.delete);

  app.use('/api', router);
}
