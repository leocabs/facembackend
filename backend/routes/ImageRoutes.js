const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// POST: Upload image data
router.post('/upload', async (req, res) => {
    try {
      const { userId, id, image, timestamp, dominantEmotion, emotion } = req.body;
  
      const newImage = new Image({
        userId,         // <-- this was missing
        id,
        image,
        timestamp,
        dominantEmotion,
        emotion
      });
  
      await newImage.save();
      res.status(201).json({ message: 'Image data saved successfully.' });
    } catch (error) {
      console.error(error);  // For debugging
      res.status(500).json({ message: 'Error saving image data.', error: error.message });
    }
  });
  

// GET: Fetch all images
router.get('/all', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);  // For debugging
    res.status(500).json({ message: 'Error fetching image data.', error: error.message });
  }
});


router.get('/', (req, res) => {
  res.send("Hello");
});


// GET: Fetch images for a specific user (optional, if needed)
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const images = await Image.find({ userId });
    res.status(200).json(images);
  } catch (error) {
    console.error(error);  // For debugging
    res.status(500).json({ message: 'Error fetching user image data.', error: error.message });
  }
});
// DELETE multiple images by IDs
router.delete('/images/delete', async (req, res) => {
    try {
      const { ids } = req.body; // Expecting an array of IDs in the request body
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No IDs provided.' });
      }
  
      // Delete images with the specified IDs
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

  
module.exports = router;
