import connectDB from '@/lib/connectDB'; // or '../../lib/connectDB' depending on your folder
import Image from '@/models/Image';       // your Mongoose model for images

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectDB();

  if (req.method === 'GET') {
    try {
      const images = await Image.find(); // or filter based on user if needed
      return res.status(200).json(images);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching images' });
    }
  } 
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: 'Missing image id' });
      }
      await Image.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting image' });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
