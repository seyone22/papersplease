import styles from './page.module.css'

import {fetchExamById} from '../../../../utils/database/examUtil'
import TopNav from 'components/TopNav'
import DownloadButton from "../../../../components/DownloadButton";
import {fetchQuestionsbyPaperId} from "../../../../utils/database/questionUtil";

export default async function ExamDetail({params}) {
    let currentExam = await getExam(params.id);
    const currentQuestions = await getQuestions(params.id); // Assuming currentQuestions is an array of objects with a 'questionNumber' property

    // Create an object to store grouped questions
    const groupedQuestions = [];

    // Loop through the currentQuestions array and group by 'questionNumber'
    currentQuestions.forEach(question => {
        const {questionNumber} = question;

        if (!groupedQuestions[questionNumber]) {
            // If the key doesn't exist in the groupedQuestions object, create it and initialize it with an array
            groupedQuestions[questionNumber] = [];
        }

        // Push the question into the corresponding array based on 'questionNumber'
        groupedQuestions[questionNumber].push(question);
    });

    // Now, 'groupedQuestions' contains the values grouped by 'questionNumber'
    console.log(groupedQuestions);

    return (
        <main>
            <TopNav/>
            <div className={styles.center}>
                <h2>{currentExam.paperYear}</h2>
                <h1>{currentExam.paperName}</h1>
            </div>

            <DownloadButton location={currentExam.pdfLocation}/>

            <div className={styles.questionList}>
                {
                    /*                    currentQuestions.map((cq, currentQuestionsIndex) => (
                                            <a className={styles.questionListItem} key={currentQuestionsIndex}
                                               href={`/exam/${currentExam.id}/${cq.id}`}>
                                                <div className={styles.card}>
                                                    <p>{cq.questionBody}</p>
                                                </div>
                                            </a>
                                        ))*/

                    groupedQuestions.map((questionGroup, questionGroupNumber) => (
                        <div key={questionGroupNumber}>
                            {questionGroupNumber}
                            {
                                questionGroup.map((qn, qnId) => (
                                    <a href={`/exam/${currentExam.id}/${qn.id}`} key={qn} className={styles.card}>
                                        <p> {qn.questionBody} </p>
                                    </a>
                                ))
                            }
                        </div>
                    ))

                }
            </div>
        </main>
    );
}

async function getExam(id) {
    return await fetchExamById(id);
}

async function getQuestions(id) {
    return await fetchQuestionsbyPaperId(id);
}
