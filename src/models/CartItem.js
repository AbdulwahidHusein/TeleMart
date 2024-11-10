// /models/Product.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  cart_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: false },
  additionalFields: { type: Map, of: mongoose.Schema.Types.Mixed, required: false },
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
