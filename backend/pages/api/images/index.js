// pages/api/images/index.js
import connectDB from '../../lib/connectDB'; // Adjusted path to connectDB
import Image from '../../models/Image'; // Ensure the Image model is correct

export default async function handler(req, res) {
  // CORS Headers (this can be more dynamic, but this will allow all origins)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle OPTIONS pre-flight requests
  }

  try {
    await connectDB(); // Connect to MongoDB

    if (req.method === 'GET') {
      // Fetch all images
      const images = await Image.find(); // Adjust this to your query logic
      return res.status(200).json(images);
    } else if (req.method === 'DELETE') {
      // Delete image by id from query params
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
    } else {
      // Handle other methods
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).json({ message: 'Error processing request' });
  }
}
