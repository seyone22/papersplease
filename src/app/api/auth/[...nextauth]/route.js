import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Add access_token to the token right after signin
            if (account?.accessToken) {
                token.accessToken = account.accessToken
                console.log('TEST', account, token);
            }
            return token
        },
        session({session, token}) {
            if (session.user) {
                session.user.id = token.sub;
                session.accessToken = token.accessToken
                session.user.image = token.picture
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};