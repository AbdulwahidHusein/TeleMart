import dbConnect from '../../../utils/mongodb';
import CartItem from '../../../models/CartItem';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { cart_item_id } = req.query;
      if (!cart_item_id) return res.status(400).json({ success: false, message: 'CartItem ID is required' });

      const cartItem = await CartItem.findByIdAndDelete(cart_item_id);
      if (!cartItem) return res.status(404).json({ success: false, message: 'CartItem not found' });

      return res.status(200).json({ success: true, message: 'Product removed from cart successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
