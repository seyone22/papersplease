import styles from './page.module.css'
import TopNav from "../../../components/TopNav";
import {searchPaper} from "../../../utils/database/paperUtil";
import SearchBox from "../../../components/SearchBox";

export default async function Home(req) {
    let searchResult = await searchPaper(req.searchParams.query);
    console.log(searchResult);
    return (
        <main className={styles.main}>
            <TopNav/>
            <SearchBox/>
            <h1>Search Results</h1>
            {
                searchResult
            }asfds
        </main>
    );
}