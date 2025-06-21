import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [{
    tmdbId: String,
    title: String,
    posterPath: String,
  }],
}, { timestamps: true });

export default mongoose.model('Favorite', favoriteSchema);
