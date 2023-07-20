import styles from './page.module.css'
import TopNav from "../../../../../../components/TopNav";

export default async function QuestionDetail({ params }) {
    //based on the params (id question number and part number), we can generate the page. Here, we will have to create the answers and discussion databases as well.

    return (
        <main className={styles.main}>
            <TopNav />
            {JSON.stringify(params)}
        </main>
    )
}