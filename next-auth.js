// next-auth.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from "./models/User";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign-in form (e.g., "Sign in with...")
            name: 'Credentials',
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            authorize: async (credentials) => {
                try {
                    const user = await User.findOne({username: credentials.username});
                    console.log('Authorizing with credentials:', credentials);
                    if (user && user.password === credentials.password) {
                        // User is authenticated, return the user object
                        return Promise.resolve(user);
                    } else {
                        // User is not authenticated, return null
                        return Promise.resolve(null);
                    }
                } catch (error) {
                    // Handle any errors that occur during the authentication process
                    console.error('Error during authentication:', error);
                    return Promise.resolve(null); // Return null to indicate an error
                }
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async session(session, user) {
            session.id = user._id.toString();
            return Promise.resolve(session);
        },
        async jwt(token, user) {
            if (user) {
                token.id = user._id.toString();
            }
            return Promise.resolve(token);
        }
    },
    database: {
        type: 'mongodb',
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
});
