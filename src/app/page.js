'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'

import { paperService } from "../../services/paper.service";

export default function Home() {
    const [papers, setPapers] = useState({ documents: [] });

    useEffect(() => {
        paperService.getAll()
            .then(data => {
                setPapers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log(papers);

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1>Papers Please!</h1>
      </div>
        <div className={styles.grid}>
            {papers.documents.map(paper => (
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

