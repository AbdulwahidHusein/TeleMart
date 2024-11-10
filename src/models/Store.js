// /models/Product.js
import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  telegram_id: { type: Number, required: false },
  name: { type: String, required: true },
  owner_id : {type: Number, required: true},
  description: String,
  additionalFields: { type: Map, of: mongoose.Schema.Types.Mixed, required: false },
});

export default mongoose.models.Store || mongoose.model('Store', StoreSchema);
