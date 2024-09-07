import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/user.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to match your React app's URL
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Define a route to handle form submission
app.post('/print', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    // Create a new user instance
    const newUser = new User({ name, password });

    // Save user to MongoDB
    await newUser.save();

    res.status(201).json({ message: 'User saved successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

