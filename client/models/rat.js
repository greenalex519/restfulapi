const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Rat', RatSchema);
