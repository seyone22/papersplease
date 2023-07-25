// Importing necessary modules from React and Next.js
import {useEffect} from 'react';
import {useRouter} from 'next/router';

// Assuming userService is an object with a userValue property
// representing the logged-in user status. (Not defined in this code snippet)
// You should have a userService object with relevant user authentication logic.

// Exporting the Layout component as a named export
export {Layout};

// The Layout component is a functional component that receives a 'children' prop
function Layout({children}) {
    // Access the Next.js router using the useRouter() hook
    const router = useRouter();

    // The useEffect hook is used to perform side effects in functional components
    useEffect(() => {
        // This effect will run only once, when the component is mounted
        // because the dependency array is empty '[]'

        // Check if the user is already logged in using userService.userValue
        if (userService.userValue) {
            // If the user is logged in, redirect them to the home page '/'
            router.push('/');
        }
    }, []); // The empty dependency array ensures the effect runs only once

    // The return statement defines the layout structure for the wrapped components
    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}
