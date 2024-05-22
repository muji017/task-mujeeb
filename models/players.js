const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  team: { type: String, required: true }, 
});

module.exports = mongoose.model('Player', PlayerSchema);