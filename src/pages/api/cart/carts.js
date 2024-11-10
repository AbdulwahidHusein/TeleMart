import dbConnect from '../../../utils/mongodb'; // Connect to MongoDB
import Cart from '../../../models/Cart'; // Import Cart model

// Handle GET, POST, PUT, DELETE requests for Cart
export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      // Retrieve all carts or a single cart based on query
      if (req.query.id) {
        try {
          const cart = await Cart.findById(req.query.id).populate('user_id'); // Populate user info
          if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
          return res.status(200).json({ success: true, data: cart });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      } else {
        try {
          const carts = await Cart.find({});
          return res.status(200).json({ success: true, data: carts });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      }

    case 'POST':
      // Create a new Cart
      try {
        const { user_id, additionalFields } = req.body;
        const cart = new Cart({ user_id, additionalFields });
        await cart.save();
        return res.status(201).json({ success: true, data: cart });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      // Update an existing Cart
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Cart ID is required' });
      try {
        const { user_id, additionalFields } = req.body;
        const cart = await Cart.findByIdAndUpdate(req.query.id, { user_id, additionalFields }, { new: true });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        return res.status(200).json({ success: true, data: cart });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      // Delete a Cart
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Cart ID is required' });
      try {
        const cart = await Cart.findByIdAndDelete(req.query.id);
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        return res.status(200).json({ success: true, message: 'Cart deleted successfully' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
