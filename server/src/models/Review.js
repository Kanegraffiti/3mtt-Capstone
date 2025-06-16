import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true },
  rating: { type: Number, required: true },
  text: String,
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
