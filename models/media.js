var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var mediaSchema = new Schema({
  title:    { type: String },
  url:  { type: String },
  user:   { type: String },
  provider:  { type: String },
  summary:  { type: String }
});

module.exports = mongoose.model('Media', mediaSchema); 
