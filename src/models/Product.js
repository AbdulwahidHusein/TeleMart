// /models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  store_id : {type: Number, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  additionalFields: { type: Map, of: mongoose.Schema.Types.Mixed, required: false },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
