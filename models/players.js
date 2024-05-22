const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // WK, BAT, AR, BWL
  team: { type: String, required: true }, // RR, CSK
});

module.exports = mongoose.model('Player', PlayerSchema);