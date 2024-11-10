import dbConnect from '../../utils/mongodb';
import Store from '../../models/Store';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        try {
          const store = await Store.findById(req.query.id);
          if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
          return res.status(200).json({ success: true, data: store });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      } else {
        try {
          const stores = await Store.find({});
          return res.status(200).json({ success: true, data: stores });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      }

    case 'POST':
      try {
        const { telegram_id, name, owner_id, description, additionalFields } = req.body;
        const store = new Store({ telegram_id, name, owner_id, description, additionalFields });
        await store.save();
        return res.status(201).json({ success: true, data: store });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Store ID is required' });
      try {
        const { telegram_id, name, owner_id, description, additionalFields } = req.body;
        const store = await Store.findByIdAndUpdate(req.query.id, { telegram_id, name, owner_id, description, additionalFields }, { new: true });
        if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
        return res.status(200).json({ success: true, data: store });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      if (!req.query.id) return res.status(400).json({ success: false, message: 'Store ID is required' });
      try {
        const store = await Store.findByIdAndDelete(req.query.id);
        if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
        return res.status(200).json({ success: true, message: 'Store deleted successfully' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
