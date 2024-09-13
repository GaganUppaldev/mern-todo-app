import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/user.js'; // 
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000' 
}));

// Secret key for JWT
const JWT_SECRET = 'eat-sleep-code-repeat'; 

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

// Define the signup route
app.post('/print', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ name, password });
    await newUser.save();

    // Respond with success and a message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Define the login route
app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user exists with the provided name and password
    const user = await User.findOne({ name, password });

    if (user) {
      // Generate JWT token with user ID and name
      const token = jwt.sign({ userID: user._id, name: user.name }, JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });

      // Send the token, user ID, name, and custom message in the response
      res.status(200).json({ 
        message: 'Login successful', // Custom message
        token, // Send the JWT token to the frontend
        userID: user._id, // Send the userID
        name: user.name // Send the user's name
      });
    } else {
      // User not found
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});



// Define the route to save a task
app.post('/save', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by the decoded userID from the token
    const user = await User.findById(decoded.userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new task with a unique ID
    const newTask = {
      _id: new mongoose.Types.ObjectId(), // Unique ID
      text: req.body.text,
      isEditing: false,
      done: false
    };

    // Add the new task to the user's tasks array
    user.tasks.push(newTask);
    await user.save();

    res.status(201).json({ message: 'Task saved successfully', task: newTask });
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ message: 'Failed to save task' });
  }
});


// Route to fetch user's tasks
app.get('/tasks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by the decoded userID from the token
    const user = await User.findById(decoded.userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user's tasks
    res.status(200).json(user.tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Define the edit route
app.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;

  try {
    const updatedTask = await User.findOneAndUpdate(
      { "tasks._id": id },
      { $set: { "tasks.$.text": text, "tasks.$.done": done } },
      { new: true }
    );

    if (updatedTask) {
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Define the delete route
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { "tasks._id": id },
      { $pull: { tasks: { _id: id } } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});





// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
