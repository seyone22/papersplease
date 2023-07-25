// Import necessary modules from React and Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Import alertService from 'services' (not shown in this code snippet)
import { alertService } from 'services';

// Export the Alert component as a named export
export { Alert };

// The Alert component is a functional component that displays alert notifications
function Alert() {
    // Access the Next.js router using the useRouter() hook
   const router = useRouter();

    // Use state to hold the current alert message (null if no alert)
    const [alert, setAlert] = useState(null);
  
    // UseEffect hook with an empty dependency array ([]) to run only once on component mount
    useEffect(() => {
        // Subscribe to new alert notifications from alertService
        // When a new alert is received, update the 'alert' state with the new value
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // Unsubscribe from the alert service when the component unmounts to prevent memory leaks
        return () => subscription.unsubscribe();
    }, []);

    // UseEffect hook with the 'router' variable in the dependency array to trigger the effect on location change
    useEffect(() => {
        // Clear the current alert when the location (route) changes
        alertService.clear();
    }, [router]);

    // If there is no alert, return null to render nothing
    if (!alert) return null;

    // If there is an alert, render the alert component
    // The component displays a dismissible alert with a message and a close button
    return (
        <div className="container">
            <div className="m-3">
               /* <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => alertService.clear()}></button>
                </div>*/
            </div>
        </div>
    );
}
