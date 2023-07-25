import styles from './page.module.css'

import {fetchPaperById} from '../../../../utils/database/paperUtil'

import TopNav from 'components/TopNav'
import DownloadButton from "../../../../components/DownloadButton";

export default async function PaperDetail({ params }) {
    let currentPaper = await getData(params.id);

    return (
        <main className={styles.main}>
            <TopNav />
            <div className={styles.center}>
                <h2>{currentPaper.paperYear}</h2>
                <h1>{currentPaper.paperName}</h1>
            </div>

            <DownloadButton />

            <div className={styles.grid}>
                {currentPaper.questions.map((question, questionIndex) => (
                    <div className={styles.card} key={questionIndex}>
                        <span className={styles.partNumber}>{question.questionNumber}. </span>

                        {question.parts.map((part, partIndex) => (
                            <div className={styles.card} key={partIndex}>
                                <a href={`/papers/${currentPaper._id}/${question.questionNumber}/${part.partNumber}`}>
                                    {part.partNumber}. {part.questionBody}
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}

async function getData(id) {
    let paper = await fetchPaperById(id);
    return paper;
}

