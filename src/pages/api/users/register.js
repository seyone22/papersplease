// Import necessary modules and functions from the 'app/api' directory
import { apiHandler, usersRepo } from 'app/api';

// Define the default export as an API handler function
export default apiHandler({
    post: register // Associate the 'register' function with the HTTP POST method
});

// Function to handle the HTTP POST request and register a new user
async function register(req, res) {
    try {
        // Call the 'usersRepo.create' function to create a new user with the data from the request body
        await usersRepo.create(req.body);

        // Return an empty JSON response with a 200 status code to indicate successful registration
        return res.status(200).json({});
    } catch (error) {
        // If there's an error during the registration process, handle it and send an appropriate error response
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
