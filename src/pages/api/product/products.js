import dbConnect from '../../../utils/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided
      try {
        const products = await Product.find({})
          .skip((page - 1) * limit) // Skip the previous pages' items
          .limit(parseInt(limit)) // Limit the number of items per page
          .populate('store_id');
        
        const totalProducts = await Product.countDocuments(); // Get the total number of products

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

    case 'POST':
      try {
        const { store_id, name, price, description, additionalFields } = req.body;
        const product = new Product({ store_id, name, price, description, additionalFields });
        await product.save();
        return res.status(201).json({ success: true, data: product });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Product ID is required' });
      try {
        const { store_id, name, price, description, additionalFields } = req.body;
        const product = await Product.findByIdAndUpdate(req.query.id, { store_id, name, price, description, additionalFields }, { new: true });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        return res.status(200).json({ success: true, data: product });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Product ID is required' });
      try {
        const product = await Product.findByIdAndDelete(req.query.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
