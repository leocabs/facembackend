require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Image Schema
const emotionSchema = new mongoose.Schema({
  icon: String,
  mood: String,
  color: String,
  number: Number
});

const imageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  id: { type: Number, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, required: true },
  dominantEmotion: { type: String, required: true },
  emotion: { type: [emotionSchema], required: true }
});

const Image = mongoose.model('Image', imageSchema);

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware for JSON and URL-encoded body parsing
app.use(express.json({ limit: '10mb' })); // Adjusted to 10MB limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'facematrix' })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// POST: Upload image data
app.post('/images/upload', async (req, res) => {
  try {
    const { userId, id, image, timestamp, dominantEmotion, emotion } = req.body;

    // Check for required fields
    if (!userId || !id || !image || !timestamp || !dominantEmotion || !emotion) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newImage = new Image({ userId, id, image, timestamp, dominantEmotion, emotion });
    await newImage.save();
    res.status(201).json({ message: 'Image data saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving image data.', error: error.message });
  }
});

// GET: Fetch all images
app.get('/images/all', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching image data.', error: error.message });
  }
});

// GET: Fetch images for a specific user
app.get('/images/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const images = await Image.find({ userId });
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user image data.', error: error.message });
  }
});

// DELETE: Delete multiple images by IDs
app.delete('/images/delete', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided.' });
    }

    // Check for valid ObjectId values
    if (!ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid IDs provided.' });
    }

    const result = await Image.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No images found with the provided IDs.' });
    }

    res.status(200).json({ message: `${result.deletedCount} images deleted successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting images.', error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send("Hello from FaceMatrix API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
