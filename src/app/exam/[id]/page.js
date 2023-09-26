import styles from './page.module.css'

import {fetchExamById} from '../../../../utils/database/examUtil'
import TopNav from 'components/TopNav'
import DownloadButton from "../../../../components/DownloadButton";
import {findQuestionsFromPaper} from "../../../../utils/database/questionUtil";

export default async function ExamDetail({params}) {
    let currentExam = await getExam(params.id);
    let currentQuestions = await getQuestions(params.id);
    return (
        <main className={styles.main}>
            <TopNav/>
            <div className={styles.center}>
                <h2>{currentExam.paperYear}</h2>
                <h1>{currentExam.paperName}</h1>
            </div>

            <DownloadButton/>

            <div className={styles.grid}>
                <div>
                    {
                        currentQuestions.map((cq, currentQuestionsIndex) => (
                            <a key={currentQuestionsIndex} href={`/exam/${currentExam.id}/${cq.id}`}>
                                <div className={styles.card}>
                                    <p>{cq.questionBody}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </main>
    );
}

async function getExam(id) {
    return await fetchExamById(id);
}

async function getQuestions(id) {
    return await findQuestionsFromPaper(id);
}
