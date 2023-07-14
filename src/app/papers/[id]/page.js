import styles from './page.module.css'

import { fetchPaperById } from 'utils/database'

import TopNav from 'components/TopNav'
import QuestionExpander from "../../../../components/QuestionExpander";
export default async function PaperDetail({ params }) {
    let currentPaper = await getData(params.id);

    return (
        <main className={styles.main}>
            <TopNav />

            <div className={styles.center}>
                <h2>{currentPaper.paperYear}</h2>
                <h1>{currentPaper.paperName}</h1>
            </div>

            <div className={styles.grid}>
                {currentPaper.questions.map((question, questionIndex) => (
                    <div className={styles.card} key={questionIndex}>
                        <span className={styles.partNumber}>{question.questionNumber}. </span>

                        {question.parts.map((part, partIndex) => (
                            <div className={styles.card} key={partIndex}>
                                {part.partNumber}. {part.questionBody}
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

