import styles from './page.module.css'

import {fetchExams} from "../../utils/database/examUtil";
import TopNav from "../../components/TopNav";
import SearchBox from "../../components/SearchBox";
import {headers} from "next/headers";
import {getSession} from "next-auth/react";

async function currentSession(cookie) {
    const session = getSession()
    return Object.keys(session).length > 0 ? session : null;
}

export default async function Home() {
    // Contains logged in user data.
    const session = await currentSession(headers().get('cookie') ?? '');

    let examList = await getData();

    return (
        <div>
            <TopNav/>
            <main>
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
        </div>
    );
}

async function getData() {
    return await fetchExams();
}