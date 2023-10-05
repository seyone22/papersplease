// next-auth.js

import NextAuth from 'next-auth';

export default NextAuth({
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
