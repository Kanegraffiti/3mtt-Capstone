import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: [{ type: String }],
  releaseDate: String,
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
