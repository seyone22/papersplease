import styles from '/src/app/page.module.css'

import { fetchPaperById } from 'utils/database'

export default async function PaperDetail({params}) {

let currentPaper = await getData(params.id);

    return (
        <main className={styles.main}>

            <div className={styles.center}>
                <h2>{currentPaper.paperYear}</h2>
                <h1>{currentPaper.paperName}</h1>

                <p>
                    {currentPaper.questions[1].questionBody}
                </p>

            </div>

        </main>
    )
}

async function getData(id) {
    let paper = await fetchPaperById(id);
    return paper;
}

