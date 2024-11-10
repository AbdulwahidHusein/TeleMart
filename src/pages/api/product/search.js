import dbConnect from '../../../utils/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  // Handle GET requests
  if (req.method === 'GET') {
    const { searchTerm = '', page = 1, limit = 10 } = req.query;

    // Search products in name or description field
    try {
      // Perform the search using regex to find matching products in name or description (case-insensitive)
      const products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      })
        .skip((page - 1) * limit)  // Skip previous pages
        .limit(parseInt(limit))    // Limit the number of items per page
        .populate('store_id');     // Populate store_id if needed

      // Count total products matching the search
      const totalProducts = await Product.countDocuments({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      });

      // Send the result with pagination details
      return res.status(200).json({
        success: true,
        data: products,
        pagination: {
          totalProducts,
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
