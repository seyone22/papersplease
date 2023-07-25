//takes a handler as an argument and returns another function to handle incoming API requests

// Import necessary modules from the 'app/api' file (assuming these are defined there)
import { errorHandler, jwtMiddleware } from 'app/api';

// Export the apiHandler function as a named export
export { apiHandler };

// The apiHandler function is a higher-order function that wraps route handlers with middleware and error handling
function apiHandler(handler) {
    // The returned function is an async function that will handle incoming API requests
    return async (req, res) => {
        // Get the HTTP method of the incoming request and convert it to lowercase
        const method = req.method.toLowerCase();

        // Check if the provided 'handler' supports the HTTP method of the incoming request
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // Apply global middleware (in this case, jwtMiddleware) to the incoming request and response objects
            // The jwtMiddleware function is assumed to handle authentication and user authorization
            await jwtMiddleware(req, res);

            // Call the appropriate route handler based on the HTTP method of the incoming request
            // The route handler is selected from the 'handler' object based on the HTTP method (e.g., handler.get, handler.post, etc.)
            await handler[method](req, res);
        } catch (err) {
            // If an error occurs during middleware or route handler execution, the error is caught here

            // Apply the global error handler (in this case, errorHandler) to handle the error
            // The errorHandler function is assumed to handle formatting and responding with error messages
            errorHandler(err, res);
        }
    };
}

