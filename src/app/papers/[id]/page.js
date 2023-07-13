import styles from '/src/app/page.module.css'

import { paperService } from "/services/paper.service";

export default function PaperDetail({params}) {

    return (
        <main className={styles.main}>

            <div className={styles.center}>
                <h1>{params.id}</h1>
            </div>

        </main>
    )
}

