import connectDB from '../lib/connectDb';  // Ensure path is correct
import Image from '../models/Image';      // Ensure path to the model is correct

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://facematrix.vercel.app' , 'http://localhost:5000/');  // Or use specific origin like 'https://yourfrontend.com'
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();  // Ensure DB connection
 
    if (req.method === 'GET') {
      // Handle GET request to fetch images
      const images = await Image.find();
      return res.status(200).json(images);
    } 
    else if (req.method === 'DELETE') {
      // Handle DELETE request to delete images
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: 'Missing image ID' });
      }

      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      await Image.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } 
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Error in API handler:', err);
    return res.status(500).json({ message: 'Error processing request' });
  }
}
