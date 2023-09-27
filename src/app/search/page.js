import styles from './page.module.css'
import TopNav from "../../../components/TopNav";
import SearchBox from "../../../components/SearchBox";
import {searchQuestions} from "../../../utils/database/questionUtil";

export default async function Home(req) {
    let searchResult = await searchQuestions(req);
    return (
        <main className={styles.main}>
            <TopNav/>
            <SearchBox/>
            <h1>Search Results</h1>
            {
                <div>
                    {
                        searchResult.map((sr, searchResultIndex) => (
                            <a key={searchResultIndex} href={`/exam/${sr.paperId}/${sr.id}`}>
                                <div className={styles.card}>
                                    <p></p>
                                    <p>{sr.questionBody}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
            }
        </main>
    );
}