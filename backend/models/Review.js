const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  rating: Number,
});

module.exports = mongoose.model('Review', ReviewSchema);
