import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('\u2705 MongoDB connected');
  } catch (err) {
    console.error('\u274c MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
