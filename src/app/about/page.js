import styles from './page.module.css'
import TopNav from 'components/TopNav'

export default async function PaperDetail({ params }) {
    const creators = [
        { name: 'S.G.Seyone', email: 's.g.seyone@live.com' },
        { name: 'M.G.Sonali.K.Jayarathne', email: 'sonalikalpani@outlook.com' },
    ];

    return (
        <main className={styles.main}>
            <TopNav />

            <div>
                <h1>University of Vavuniya Exam Hub</h1>
                <h2>About</h2>
                <p>
                    The University of Vavuniya Exam Hub is a platform dedicated to storing, retrieving, viewing, and updating past paper questions and answers. It is designed and developed by 2nd-year ICT students, S.G.Seyone (2019/ICT/46) and M.G.Sonali.K.Jayarathne (2019/ICT/108).
                </p>
                <h2>Creators</h2>
                <ul>
                    {creators.map((creator) => (
                        <li key={creator.name}>
                            {creator.name}: <a href={`mailto:${creator.email}`}>{creator.email}</a>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
}

async function getData(id) {
    let paper = await fetchPaperById(id);
    return paper;
}