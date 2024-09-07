import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/user.js'; // Ensure the path to user.js is correct

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to match your client-side URL
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Define the login route
app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user exists with the provided name and password
    const user = await User.findOne({ name, password });

    if (user) {
      // User found
      res.status(200).json({ message: 'Login successful' });
    } else {
      // User not found
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

