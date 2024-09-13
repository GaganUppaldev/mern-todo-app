// models/user.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique identifier for each task
  text: String,
  isEditing: Boolean,
  done: Boolean
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  tasks: [taskSchema] // Array of tasks
});

export default mongoose.model('User', userSchema);

