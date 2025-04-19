import mongoose from 'mongoose';

const connectDB = async () => {
  // If the connection is already established, skip reconnecting
  if (mongoose.connections[0].readyState) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'facematrix',  // Your actual DB name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    // Log the error to help with debugging
    console.error('❌ MongoDB connection error:', err);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
