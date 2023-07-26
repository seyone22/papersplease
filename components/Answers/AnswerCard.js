import styles from './AnswerCard.module.css'

const AnswerCard = ({answer}) => {
    console.log(answer);
    return (
        <div className={styles.card}>
            <li key={answer._id} className={styles.answerList}>
                <p>{answer.answerText}</p>
                <p>Votes: {answer.votePositive}</p>
                {/* Displaying 'Superuser Upvoted' if the answer was upvoted by a superuser */}
                {answer.superVotesPositive && <p>Superuser Upvoted</p>}
            </li>
        </div>
    );
};

export default AnswerCard;
