import TopNav from "../../../components/TopNav";
import styles from './page.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const About = () => {
    const creators = [
        {name: 'Seyone Gunasingham', email: 's.g.seyone@live.com', github: 'www.github.com/seyone22'},
        {name: 'Sonali Jayarathne', email: 'sonalikalpani@outlook.com', github: 'www.github.com/MGSK-J'},
        {name: 'Menakan Vijayanathan', email: 'kingshipmena@gmail.com', github: 'www.github.com/Menakan-Vijeyanathan'}
    ];

    return (
        <div>
            <TopNav/>
            <main>
                <div className={styles.textBody}>
                    <h1>About Papers, Please!</h1>
                    <p>
                        The University of Vavuniya Exam Hub is a platform dedicated to storing, retrieving, viewing, and
                        updating past paper questions and answers. It is designed and developed by 2nd-year IT students.
                    </p>
                    <h2>Creators</h2>
                    <div className={styles.cardContainer}>
                        {creators.map((creator) => (
                            <div className={styles.card} key={creator.name}>
                                <h2>{creator.name}</h2>
                                <div className={styles.iconAndText}>
                                    <FontAwesomeIcon className={styles.icon} icon={faEnvelope} width={18}/>
                                    <a className={styles.subHeading}
                                       href={`mailto:${creator.email}`}>{creator.email}</a>
                                </div>
                                <div className={styles.iconAndText}>
                                    <FontAwesomeIcon className={styles.icon} icon={faGithub} width={18}/>
                                    <a className={styles.subHeading} href={creator.github}>{creator.github}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;