import styles from './page.module.css'
import TopNav from "../../../../../components/TopNav";
import DiscussionInputBox from "../../../../../components/Answers/DiscussionInputBox";
import AnswerCard from "../../../../../components/Answers/AnswerCard";
import {fetchAnswersforQuestionbyId} from "../../../../../utils/database/answerUtil";
import {fetchQuestionById} from "../../../../../utils/database/questionUtil";

export default async function QuestionDetail({params}) {
    let currentQuestion = await fetchQuestionById(params.questionId);
    let tmp = await fetchAnswersforQuestionbyId(params.questionId);

    console.log(tmp);

    return (
        <main className={styles.main}>
            <TopNav/>
            <div>
                {JSON.stringify(currentQuestion.questionBody)}
            </div>
            <DiscussionInputBox questionId={params.questionId}/>
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