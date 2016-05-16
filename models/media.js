var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var mediaSchema = new Schema({
  title:    { type: String },
  id:  { type: String },
  url:  { type: String },
  user:   { type: String },
  provider:  { type: String },
  date: { type: Date, default: Date.now },
  likes : [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]
});

module.exports = mongoose.model('Media', mediaSchema);
