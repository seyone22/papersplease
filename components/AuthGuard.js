import {signIn, useSession} from 'next-auth/react';

function AuthGuard({children}) {
    const {data: session, status} = useSession();

    if (status === 'loading') {
        // Show a loading spinner or message while checking the authentication status.
        return <div>Loading...</div>;
    }

    if (!session) {
        // Redirect to the login page if the user is not authenticated.
        signIn();
        return null;
    }

    // Render the protected content if the user is authenticated.
    return children;
}

export default AuthGuard;
