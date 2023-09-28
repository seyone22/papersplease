import styles from './page.module.css'

import {fetchExams} from "../../utils/database/examUtil";
import TopNav from "../../components/TopNav";
import SearchBox from "../../components/SearchBox";

export default async function Home() {
    let examList = await getData();

    return (
        <main className={styles.main}>
            <TopNav/>
            <div className={styles.center}>
                <h1 className={styles.onTop}>Papers Please!</h1>
                <h4 className={styles.onTop}>Abandon all hope, All ye who enter.</h4>
            </div>

            <h2 className={styles.centered}>Browse Examination Exams</h2>
            <div className={styles.searchBox}>
                <SearchBox/>
            </div>
            <h2 className={styles.centered}>All Exams</h2>
            <div className={styles.grid}>
                {examList.map(exam => (
                    <div key={exam.id} className={styles.card}>
                        <a href={`/exam/${exam.id}`}>
                            <p>{exam.paperCourseId}</p>
                            <p>{exam.paperName}</p>
                            <p>{exam.paperYear}</p>
                        </a>
                    </div>
                ))}
            </div>

        </main>
    );
}

async function getData() {
    return await fetchExams();
}

//test