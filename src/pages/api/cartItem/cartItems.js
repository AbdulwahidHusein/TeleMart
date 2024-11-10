import dbConnect from '../../../utils/mongodb';
import CartItem from '../../../models/CartItem';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        try {
          const cartItem = await CartItem.findById(req.query.id);
          if (!cartItem) return res.status(404).json({ success: false, message: 'CartItem not found' });
          return res.status(200).json({ success: true, data: cartItem });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      } else {
        try {
          const cartItems = await CartItem.find({});
          return res.status(200).json({ success: true, data: cartItems });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      }

    case 'POST':
      try {
        const { cart_id, product_id, quantity, additionalFields } = req.body;
        const cartItem = new CartItem({ cart_id, product_id, quantity, additionalFields });
        await cartItem.save();
        return res.status(201).json({ success: true, data: cartItem });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'CartItem ID is required' });
      try {
        const { cart_id, product_id, quantity, additionalFields } = req.body;
        const cartItem = await CartItem.findByIdAndUpdate(req.query.id, { cart_id, product_id, quantity, additionalFields }, { new: true });
        if (!cartItem) return res.status(404).json({ success: false, message: 'CartItem not found' });
        return res.status(200).json({ success: true, data: cartItem });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'CartItem ID is required' });
      try {
        const cartItem = await CartItem.findByIdAndDelete(req.query.id);
        if (!cartItem) return res.status(404).json({ success: false, message: 'CartItem not found' });
        return res.status(200).json({ success: true, message: 'CartItem deleted successfully' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
