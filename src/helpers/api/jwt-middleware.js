// Import necessary modules from external libraries
// 'expressjwt' is assumed to be an external package installed using npm or yarn
import {expressjwt} from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

// Get server runtime configuration from Next.js
// 'serverRuntimeConfig' is assumed to be defined in 'next.config.js'
const {serverRuntimeConfig} = getConfig();

// Export the jwtMiddleware function as a named export
export {jwtMiddleware};

// The jwtMiddleware function is a utility function that sets up JWT authentication middleware
// It returns a Promise that resolves to the result of the JWT authentication middleware
function jwtMiddleware(req, res) {
    // Create JWT authentication middleware using 'express-jwt' with the provided secret and algorithms
    // The 'secret' is the key used to verify the JWT token
    // 'algorithms' specify the allowed algorithms for token verification, here using HMAC-SHA256 ('HS256')
    const middleware = expressjwt({
        secret: serverRuntimeConfig.secret, // The secret key for JWT token verification
        algorithms: ['HS256'] // The allowed algorithms for token verification
    }).unless({
        // Define an 'unless' configuration to exclude specific routes from JWT authentication
        path: [
            // List of public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate'
        ]
    });

    // Convert the JWT middleware to a Promise using 'util.promisify'
    // This allows the middleware to work with asynchronous code using the 'await' keyword
    // The Promise resolves to the result of the middleware (whether it passes or rejects the request)
    return util.promisify(middleware)(req, res);
}
