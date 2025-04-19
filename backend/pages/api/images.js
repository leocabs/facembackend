import connectDB from './lib/connectDB';
import Image from '../models/Image';  // Your Mongoose model

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB(); // Connect to MongoDB

    if (req.method === 'GET') {
      // Fetch all images
      const images = await Image.find();
      return res.status(200).json(images);
    } 
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: 'Missing image id' });
      }

      // Check if the image exists
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Delete the image
      await Image.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Image deleted successfully' });
    }
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).json({ message: 'Error processing request' });
  }
}
