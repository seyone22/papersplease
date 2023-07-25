import styles from './page.module.css'
import TopNav from "../../../../../../components/TopNav";
import {fetchPaperById} from "../../../../../../utils/database/paperUtil";
import {fetchAnswersforQuestionbyId} from "../../../../../../utils/database/answerUtil";
import AnswerCard from "../../../../../../components/Answers/AnswerCard";

export default async function QuestionDetail({params}) {
    //based on the params (id question number and part number), we can generate the page. Here, we will have to create the Answers and discussion databases as well.
    let currentPaper = await fetchPaperById(params.id);

    let tmp = await fetchAnswersforQuestionbyId(currentPaper._id, params.questionNumber, params.partNumber);
    console.log(JSON.stringify(tmp));

    return (
        <main className={styles.main}>
            <TopNav/>
            <div>
                {JSON.stringify(currentPaper.questions[params.questionNumber - 1].parts[params.partNumber.charCodeAt(0) - 97].questionBody)}
            </div>
            <div>
                {
                    tmp.map((answer, answerIndex) => (
                        <div key={answerIndex} className={styles.grid}>
                            <AnswerCard answer={answer}/>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}