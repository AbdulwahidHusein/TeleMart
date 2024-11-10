import dbConnect from '../../../utils/mongodb';
import Cart from '../../../models/Cart';
import CartItem from '../../../models/CartItem';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { user_id } = req.body;
      if (!user_id) return res.status(400).json({ success: false, message: 'User ID is required' });

      const cart = await Cart.findOne({ user_id }).populate('cart_items');
      if (!cart) return res.status(404).json({ success: false, message: 'Cart not found for this user' });

      let totalAmount = 0;
      const items = await CartItem.find({ cart_id: cart._id }).populate('product_id');
      items.forEach(item => {
        totalAmount += item.product_id.price * item.quantity;
      });

      // Proceed to payment (integration with a payment provider like Stripe or PayPal)

      return res.status(200).json({ success: true, message: 'Checkout successful', totalAmount });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
