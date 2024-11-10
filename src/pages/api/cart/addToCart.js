import dbConnect from '../../../utils/mongodb';
import Cart from '../../../models/Cart';
import CartItem from '../../../models/CartItem';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { user_id, product_id, quantity } = req.body;
      if (!user_id || !product_id || !quantity) return res.status(400).json({ success: false, message: 'User ID, Product ID, and Quantity are required' });

      const product = await Product.findById(product_id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

      const cart = await Cart.findOne({ user_id });
      if (!cart) return res.status(404).json({ success: false, message: 'Cart not found for this user' });

      // Create or update the CartItem
      let cartItem = await CartItem.findOne({ cart_id: cart._id, product_id });
      if (cartItem) {
        // Update existing CartItem
        cartItem.quantity += quantity;
      } else {
        // Create a new CartItem
        cartItem = new CartItem({ cart_id: cart._id, product_id, quantity });
      }

      await cartItem.save();
      return res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
