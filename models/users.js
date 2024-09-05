import mongoose from 'mongoose';

// Define the schema for the `users` collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create the model for the `users` collection
const User = mongoose.model('User', userSchema, 'users');

// Export the model
export default User;
