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
                        Papers please is where you can find a listing of all examination papers from the University of
                        Vavuniya. You can also find their answers :).
                        This was made as a part of our second year IT2244 coursework. It&aposs a miracle it works!
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