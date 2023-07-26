// Importing the required module
import {model, models, Schema} from 'mongoose';

// Creating a new Mongoose schema for the "users" collection
const userSchema = new Schema({
    // User's unique username
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // User's email address (also unique to ensure each user has a unique email)
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // User's password (Note: In a production environment, you should encrypt the password for security)
    password: {
        type: String,
        required: true,
    },
    // Date and time when the user's account was created (default: current date/time)
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating a model named "User" from the "userSchema"
const User = models.User || model('User', userSchema);

// Specifying the collection name as "users" for the "User" model
User.schema.set('collection', 'users');

// Exporting the "User" model to be used in other parts of the application
export default User;
