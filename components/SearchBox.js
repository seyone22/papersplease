'use client'

import styles from './SearchBox.module.css'
import {router} from "next/client";
import {useRouter} from "next/navigation";

const SearchBox=() => {
    const router = useRouter();

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Access form data
        const query = formData.get('query'); // Get the value of the 'query' input field
        router.push(`/search?query=${encodeURIComponent(query)}`); // Navigate to the '/search' route with the query parameter
    };

    return(
        <div className={styles.searchBox}>
            <form onSubmit={handleSearch}>
                <div className={styles.searchIcon}>
                    <button className={styles.searchButton} type={"submit"}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_15_152)">
                            <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round"/>
                            <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_15_152">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    </button>
                </div>
                <input
                    name="query"
                    className={styles.primarySearch}
                    type="text"
                    placeholder="Search for a course..."
                />
            </form>
        </div>
    )
}
export default SearchBox;