const mongoose = require('mongoose');

const MatchResultSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  results: { type: Object, required: true }, // Ball by ball results
});

module.exports = mongoose.model('MatchResult', MatchResultSchema);