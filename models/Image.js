const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  icon: String, // icon path
  mood: String, // 'Happy', 'Sad', etc.
  color: String, // 'bg-blue-100'
  number: Number // number of times detected
});

const imageSchema = new mongoose.Schema({
  userId: {               // Store the user identifier (could be IP, session ID, or unique key)
    type: String,
    required: true
  },
  id: {
    type: Number,          // unique timestamp id
    required: true
  },
  image: {
    type: String,          // base64 image string
    required: true
  },
  timestamp: {
    type: Date,            // ISO timestamp
    required: true
  },
  dominantEmotion: {
    type: String,          // e.g. 'Neutral'
    required: true
  },
  emotion: {
    type: [emotionSchema], // array of emotion objects
    required: true
  }
});

module.exports = mongoose.model('Image', imageSchema);
