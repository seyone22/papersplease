//eceives HTTP requests sent to the base users route /api/users

// Import necessary modules and functions from the 'helpers/api' directory
import { apiHandler, usersRepo } from 'helpers/api';

// Define the default export as an API handler function
export default apiHandler({
    get: getAll // Associate the 'getAll' function with the HTTP GET method
});

// Function to handle the HTTP GET request and retrieve all users
async function getAll(req, res) {
    try {
        // Call the 'getAll' function from the 'usersRepo' object to fetch all users from the database
        const users = await usersRepo.getAll();

        // Return the users data as a JSON response with a 200 status code
        return res.status(200).json(users);
    } catch (error) {
        // If there's an error during the process, handle it and send an appropriate error response
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
