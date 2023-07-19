import styles from './page.module.css'

import { fetchPapers } from "../../utils/database";
import TopNav from "../../components/TopNav";

export default async function Home() {
    let paperList = await getData();

  return (
    <main className={styles.main}>
        <TopNav />
      <div className={styles.center}>
        <h1>Papers Please!</h1>
          <h4>Abandon all hope, All ye who enter.</h4>
      </div>
        <div>
            <h3>Browse Examination Papers</h3>
        </div>
        <div className={styles.grid}>
            {paperList.map(paper => (
                <div key={paper.id} className={styles.card}>
                    <a href={`/papers/${paper._id}`}>
                        <p>{paper.paperCourseId}</p>
                        <p>{paper.paperName}</p>
                        <p>{paper.paperYear}</p>
                    </a>

                </div>
            ))}
        </div>

    </main>
  )
}

async function getData() {
    let papers = await fetchPapers();
    return papers;
}