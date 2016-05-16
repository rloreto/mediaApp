var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var favoriteSchema = new Schema({
  user:   { type: String },
  date: { type: Date, default: Date.now },
  _media: { type: Schema.Types.ObjectId, ref: 'Media' },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
