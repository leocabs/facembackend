// /lib/connectDb.js
import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('✅ Already connected to MongoDB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'facematrix', // Your actual DB name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw new Error('MongoDB connection error');
  }
};

export default connectDb;
