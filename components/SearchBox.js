'use client'

import styles from './SearchBox.module.css'
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
    const router = useRouter();

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Access form data
        const query = formData.get('query'); // Get the value of the 'query' input field
        router.push(`/search?query=${encodeURIComponent(query)}`); // Navigate to the '/search' route with the query parameter
    };

    return (
        <div className={styles.searchBox}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <button className={styles.searchButton} type={"submit"}>
                    <FontAwesomeIcon icon={faSearch} width={20} className={styles.searchIcon}/>
                </button>
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