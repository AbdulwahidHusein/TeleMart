import dbConnect from '../../../utils/mongodb'; // Import dbConnect to connect to MongoDB
import User from '../../../models/User'; // Import the User model

// Handle GET, POST, PUT, DELETE requests
export default async function handler(req, res) {
  await dbConnect(); // Ensure the database connection

  switch (req.method) {
    case 'GET':
      // Get all users or a single user based on a query parameter (e.g., tg_id)
      if (req.query.id) {
        try {
          const user = await User.findById(req.query.id); // Get user by ID
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          return res.status(200).json({ success: true, data: user });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      } else {
        // Get all users if no query parameter is provided
        try {
          const users = await User.find({}); // Fetch all users
          return res.status(200).json({ success: true, data: users });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      }

    case 'POST':
      // Create a new user
      try {
        const { first_name, last_name, username, tg_id, additionalFields } = req.body;
        const user = new User({
          first_name,
          last_name,
          username,
          tg_id,
          additionalFields,
        });
        await user.save(); // Save the new user to the database
        return res.status(201).json({ success: true, data: user });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      // Update an existing user
      if (!req.query.id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      try {
        const { first_name, last_name, username, tg_id, additionalFields } = req.body;
        const user = await User.findByIdAndUpdate(
          req.query.id,
          { first_name, last_name, username, tg_id, additionalFields },
          { new: true } // Return the updated user
        );
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      // Delete a user
      if (!req.query.id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      try {
        const user = await User.findByIdAndDelete(req.query.id); // Find and delete the user
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
