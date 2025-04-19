const mongoose = require('mongoose');
const Image = require('./models/Image');  // Adjust path accordingly

const saveImage = async () => {
  const newImage = new Image({
    userId: 'Iloveyoupat',  // Sample user ID
    id: Date.now(),     // Using current timestamp as unique ID
    image: 'data:image/png;base64,...',  // Example base64 image string
    timestamp: new Date(),
    dominantEmotion: 'Happy',
    emotion: [
      {
        icon: 'path/to/happy-icon.png',
        mood: 'Happy',
        color: 'bg-blue-100',
        number: 10
      },
      {
        icon: 'path/to/neutral-icon.png',
        mood: 'Neutral',
        color: 'bg-gray-100',
        number: 5
      }
    ]
  });

  try {
    await newImage.save();  // Save image to DB
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

mongoose.connect('mongodb+srv://leonard:Iloveyoupat@leopat.m53ip.mongodb.net/facematrix?retryWrites=true&w=majority&appName=Leopat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    saveImage();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
