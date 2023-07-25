import styles from './page.module.css'

import {fetchPaperById} from '../../../../utils/database/paperUtil'

import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import TopNav from 'components/TopNav'
import DownloadButton from "../../../../components/DownloadButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                            <a key={partIndex}
                               href={`/papers/${currentPaper._id}/${question.questionNumber}/${part.partNumber}`}>
                                <div className={styles.rowCard}>
                                    <div>
                                        {part.partNumber}. {part.questionBody}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faChevronRight} className={styles.faChevronRight}/>
                                    </div>
                                </div>
                            </a>
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

