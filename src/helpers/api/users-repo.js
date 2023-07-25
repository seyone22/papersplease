// Import necessary modules from external libraries
import getConfig from 'next/config';
import jwt from 'jsonwebtoken'; // Assuming 'jsonwebtoken' and 'bcryptjs' are installed
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

// Get server runtime configuration from Next.js
// 'serverRuntimeConfig' is assumed to be defined in 'next.config.js'
const { serverRuntimeConfig } = getConfig();

// Import the 'User' model from 'helpers/api' (assuming it represents the user schema in the database)
const User = db.User;

// Export the 'usersRepo' object with various repository functions as named exports
export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Repository function to authenticate a user with username and password
async function authenticate({ username, password }) {
    // Find the user in the database based on the provided username
    const user = await User.findOne({ username });

    // Check if the user exists and if the provided password matches the hashed password in the database
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // Create a JWT token that is valid for 7 days (configured using 'expiresIn' option)
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // Return the user object along with the generated token
    return {
        ...user.toJSON(),
        token
    };
}

// Repository function to get all users from the database
async function getAll() {
    return await User.find();
}

// Repository function to get a user by their ID from the database
async function getById(id) {
    return await User.findById(id);
}

// Repository function to create a new user in the database
async function create(params) {
    // Check if the provided username is already taken
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Create a new user instance with the provided parameters
    const user = new User(params);

    // Hash the password using bcrypt if it's provided
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // Save the user in the database
    await user.save();
}

// Repository function to update an existing user in the database
async function update(id, params) {
    // Find the user in the database based on the provided ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) throw 'User not found';

    // Check if the updated username is already taken by another user
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Hash the password if it was provided
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // Copy the properties from the 'params' object to the 'user' object
    Object.assign(user, params);

    // Save the updated user in the database
    await user.save();
}

// Repository function to delete a user from the database by their ID
async function _delete(id) {
    await User.findByIdAndRemove(id);
}
