// /models/Product.js
import mongoose from 'mongoose';
import { type } from 'os';

const UserSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  tg_id : {type: Number, required: false},
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  username: { type: String, required: false },
  additionalFields: { type: Map, of: mongoose.Schema.Types.Mixed, required: false },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
