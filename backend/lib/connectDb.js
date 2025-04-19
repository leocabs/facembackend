import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
