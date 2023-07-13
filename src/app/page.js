import styles from './page.module.css'

import { fetchPapers } from "../../utils/database";

export default async function Home() {
    let paperList = await getData();

    console.log(paperList);

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1>Papers Please!</h1>
      </div>
        <div className={styles.grid}>
            {paperList.map(paper => (
                <div key={paper.id}>
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