import dbConnect from '../../../utils/mongodb';
import CartItem from '../../../models/CartItem';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { cart_id } = req.query;
      if (!cart_id) return res.status(400).json({ success: false, message: 'Cart ID is required' });

      const cartItems = await CartItem.find({ cart_id }).populate('product_id');
      return res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
