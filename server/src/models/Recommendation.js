import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true },
  title: String,
  posterPath: String,
  score: Number,
}, { timestamps: true });

export default mongoose.model('Recommendation', recommendationSchema);
