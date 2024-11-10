import dbConnect from '../../../../utils/mongodb';
import Cart from '../../../../models/Cart';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { user_id } = req.query;  // Assuming user_id is passed as query parameter
      if (!user_id) return res.status(400).json({ success: false, message: 'User ID is required' });

      const cart = await Cart.findOne({ user_id }).populate('cart_items');
      if (!cart) return res.status(404).json({ success: false, message: 'Cart not found for this user' });

      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
