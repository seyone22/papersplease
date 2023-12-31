'use client'
import styles from './AnswerCard.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";

function timeAgo(timestamp) {
    const now = new Date();
    const timeDiff = now - new Date(timestamp);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (weeks > 0) {
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return 'just now';
    }
}

const AnswerCard = ({answer}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);
        try {
            let toDelete = formData.get('_id');
            console.log(toDelete);
            const response = await fetch(`/api/answer?_id=${encodeURIComponent(toDelete)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to a plain object
            });

            if (response.ok) {
                // Handle successful response here, if needed
                console.log('Answer Deleted successfully');
                // Reload the page
                window.location.reload();
            } else {
                throw new Error('Failed to delete answer');
            }
        } catch (error) {
            console.error('Error deleting answer:', error);
        }
    }
    //WARN: POTENTIAL SECURITY RISK
    return (
        <div key={answer._id} className={styles.card}>
                <div className={styles.cardHeader}>
                    <h4>{answer.author.name}</h4>
                    <span className={styles.updatedAt}>{timeAgo(answer.updatedAt)}</span>
                </div>


                <div className={styles.cardBody} dangerouslySetInnerHTML={{__html: answer.answerBody}}></div>

                <div className={styles.actionBar}>
                    <div>
                        <FontAwesomeIcon className={styles.voteIcon} icon={faArrowUp}/>
                        <span>{answer.votePositive ? answer.votePositive : 1}</span>
                        <FontAwesomeIcon className={styles.voteIcon} icon={faArrowDown}/>
                    </div>

                    {/* Displaying 'Superuser Upvoted' if the answer was upvoted by a superuser */}
                    {answer.superVotesPositive && <p>Superuser Upvoted</p>}
                    <form onSubmit={handleSubmit}>
                        <input type={"hidden"} name={"_id"} value={answer._id}/>
                        <button className={styles.actionBarButton} type={"submit"}><FontAwesomeIcon
                            icon={faTrashCan}/> Delete
                        </button>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <input type={"hidden"} name={"_id"} value={answer._id}/>
                        <button className={styles.actionBarButton} type={"submit"}><FontAwesomeIcon icon={faEdit}/> Edit
                        </button>
                    </form>
                </div>
        </div>
    );
};
//TODO: Implement editing :)

export default AnswerCard;
