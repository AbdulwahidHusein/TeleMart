import dbConnect from '../../../utils/mongodb';
import CartItem from '../../../models/CartItem';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const { cart_item_id, quantity } = req.body;
      if (!cart_item_id || !quantity) return res.status(400).json({ success: false, message: 'CartItem ID and Quantity are required' });

      const cartItem = await CartItem.findById(cart_item_id);
      if (!cartItem) return res.status(404).json({ success: false, message: 'CartItem not found' });

      cartItem.quantity = quantity;
      await cartItem.save();

      return res.status(200).json({ success: true, data: cartItem });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
