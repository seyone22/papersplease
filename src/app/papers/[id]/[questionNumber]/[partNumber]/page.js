import styles from './page.module.css'
import TopNav from "../../../../../../components/TopNav";
import { fetchPaperById } from "../../../../../../utils/database";

export default async function QuestionDetail({ params }) {
    //based on the params (id question number and part number), we can generate the page. Here, we will have to create the answers and discussion databases as well.
    let currentPaper = await fetchPaperById(params.id);
    console.log(params.partNumber)
    return (
        <main className={styles.main}>
            <TopNav />
            {JSON.stringify(currentPaper.questions[params.questionNumber].parts[0].questionBody)}
        </main>
    )
}