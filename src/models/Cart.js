// /models/Cart.js
import mongoose from 'mongoose';

// interface CartProps {
//   id?: mongoose.Schema.Types.ObjectId;
//   user_id: mongoose.Schema.Types.ObjectId;
//   additionalFields?: Map<string, any>;
// }

const CartSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  additionalFields: { type: Map, of: mongoose.Schema.Types.Mixed, required: false },
});

export default mongoose.models.Cart || mongoose.model<CartProps>('Cart', CartSchema);
