// Export the Layout component as a named export
export { Layout };

// The Layout component is a functional component that receives 'children' as a prop
function Layout({ children }) {
    // The 'children' prop contains the content to be rendered inside this layout

    // The return statement defines the layout structure for the wrapped components
    // The layout includes a padding around the content and centers it within a container
    return (
        <div className="p-4">
            <div className="container">
                {children}
            </div>
        </div>
    );
}
