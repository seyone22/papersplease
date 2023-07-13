'use client'
import styles from './QuestionExpander.module.css';
import {useState} from "react";

const QuestionExpander = ({ question }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
        {
                <div
                    className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
                    onClick={handleCardClick}
                >
                    <span className={styles.partNumber}> {question.partNumber}. </span>
                    <span className={styles.questionBody}>{question.questionBody}</span>
                    <span className={styles.marks}>[{question.marks}%]</span>
                </div>
        }
        </div>
    );
};

export default QuestionExpander;