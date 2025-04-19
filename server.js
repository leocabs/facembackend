require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/ImageRoutes');
const cors = require('cors');

const app = express();
const PORT = 5000;

// CORS setup (optional to restrict origins)
app.use(cors());  // You can specify origins like: app.use(cors({ origin: 'http://yourfrontend.com' }));

// Middleware for JSON and URL-encoded body parsing with size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'facematrix',  // 👈 your actual DB name here
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route handling for image uploads
app.use('/api/images', imageRoutes);
app.use('/api', imageRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
