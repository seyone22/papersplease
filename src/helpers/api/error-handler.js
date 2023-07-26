//used catch all errors and remove the need for duplicated error handling code throughout the Next.js 

// Export the errorHandler function as a named export
export {errorHandler};

// The errorHandler function is a utility function to handle errors and format error responses
function errorHandler(err, res) {
    // Check if the 'err' parameter is a string, indicating a custom application error
    if (typeof (err) === 'string') {
        // Custom application error
        // Determine if the error message indicates a 404 Not Found error
        const is404 = err.toLowerCase().endsWith('not found');

        // Set the appropriate status code based on whether it's a 404 error or a general error (400)
        const statusCode = is404 ? 404 : 400;

        // Respond with a JSON object containing the error message and the corresponding status code
        return res.status(statusCode).json({message: err});
    }

    // Check if the 'err' parameter has a name property equal to 'UnauthorizedError'
    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        // Respond with a JSON object indicating an invalid token (401 Unauthorized)
        return res.status(401).json({message: 'Invalid Token'});
    }

    // If the error is not a custom application error or an unauthorized JWT error, default to a 500 server error
    // Log the error to the console for debugging purposes
    console.error(err);

    // Respond with a JSON object containing the error message and a 500 status code
    return res.status(500).json({message: err.message});
}

