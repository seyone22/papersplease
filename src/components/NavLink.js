//functional component that creates a navigation link with active styling

// Import necessary modules from Next.js
import {useRouter} from 'next/router';
import Link from 'next/link';

// Import PropTypes for type checking (assuming it's installed)
import PropTypes from 'prop-types';

// Export the NavLink component as a named export
export {NavLink};

// The NavLink component is a functional component that creates a navigation link with active styling
function NavLink({children, href, exact, ...props}) {
    // Access the Next.js router using the useRouter() hook
    const {pathname} = useRouter();

    // Determine if the current link is active based on the 'exact' prop
    // If 'exact' is true, check if the current pathname matches the 'href' exactly
    // If 'exact' is false, check if the current pathname starts with the 'href'
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    // If the link is active, add the 'active' class to the link's className
    if (isActive) {
        props.className += ' active';
    }

    // Render a Link component from Next.js with the provided 'href' and 'props'
    // 'children' are the content to be displayed inside the link
    return <Link href={href} {...props}>{children}</Link>;
}

// PropTypes are used for type checking and documentation
// Define the expected prop types for the NavLink component
NavLink.propTypes = {
    href: PropTypes.string.isRequired, // The 'href' prop is required and should be a string
    exact: PropTypes.bool // The 'exact' prop is optional and should be a boolean
};

// Default props are used to provide default values for optional props
// Set the default value for 'exact' to false if not provided
NavLink.defaultProps = {
    exact: false
};
