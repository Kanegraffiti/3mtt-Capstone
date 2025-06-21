import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  movies: [{
    tmdbId: String,
    title: String,
    posterPath: String,
    status: { type: String, enum: ['To Watch','Watching','Watched'], default: 'To Watch' },
  }],
}, { timestamps: true });

export default mongoose.model('Watchlist', watchlistSchema);
