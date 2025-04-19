require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/ImageRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment port in production

// CORS setup (optional to restrict origins)
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://facematrix.vercel.app']
  : ['http://localhost:5173', 'http://localhost:5000'];

app.use(cors({ origin: allowedOrigins }));

// Middleware for JSON and URL-encoded body parsing with size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'facematrix',  // Your actual DB name here
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route handling for image uploads
app.use('/api/images', imageRoutes); // Ensure ImageRoutes is correctly defined

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
