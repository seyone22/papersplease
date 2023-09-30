import styles from './page.module.css'
import TopNav from "../../../../../components/TopNav";
import DiscussionInputBox from "../../../../../components/Answers/DiscussionInputBox";
import AnswerCard from "../../../../../components/Answers/AnswerCard";
import {fetchAnswersforQuestionbyId} from "../../../../../utils/database/answerUtil";
import {fetchQuestionById} from "../../../../../utils/database/questionUtil";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export default async function QuestionDetail({params}) {
    let currentQuestion = await fetchQuestionById(params.questionId);
    let tmp = await fetchAnswersforQuestionbyId(params.questionId);

    for (const answer of tmp) {
        answer.answerBody = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(answer.answerBody)
        answer.answerBody = answer.answerBody.value;
    }

    return (
        <div>
            <TopNav/>
            <main>
                <div className={styles.questionArea}>
                    <div className={styles.questionDescription}>
                        Question {JSON.stringify(currentQuestion.questionNumber)}, part {currentQuestion.partNumber}
                    </div>
                    <div className={styles.questionHeader}>
                        {JSON.stringify(currentQuestion.questionBody)}
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <DiscussionInputBox questionId={params.questionId}/>
                </div>
                <div>
                    {
                        tmp.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                                <AnswerCard answer={answer}/>
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}