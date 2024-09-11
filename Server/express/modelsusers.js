import mongoose from 'mongoose';

// Define the schema for a to-do item
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for the `users` collection
const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  tasks: [
      {
          text: String,
          isEditing: Boolean,
          done: Boolean
      }
  ]
});


// Create the model for the `users` collection
const User = mongoose.model('User', userSchema, 'users');

// Export the model
export default User;

