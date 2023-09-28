'use client'
import styles from './DiscussionInputBox.module.css'
import {useState} from "react";

const DiscussionInputBox = (questionId) => {
    const [answerBody, setAnswerBody] = useState(''); // Initialize the state with an empty string
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        console.log(Object.fromEntries(formData));

        try {
            const response = await fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to a plain object
            });

            if (response.ok) {
                // Handle successful response here, if needed
                console.log('Answer posted successfully');
                setAnswerBody('');
                // Reload the page
                window.location.reload();
            } else {
                throw new Error('Failed to post answer');
            }
        } catch (error) {
            console.error('Error posting answer:', error);
        }
    }

    return (
        <div className={styles.FormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.InputContainer}>
                    <input type="hidden" name="author" value={questionId}/>
                    <input type="hidden" name="questionId" value={`{ "$oid": "${questionId}" }`}/>
                    <textarea name="answerBody" className={styles.TextInput}></textarea>
                    <button type="submit" className={styles.PostButton}>Post Answer</button>
                </div>
            </form>
        </div>
    );
};

export default DiscussionInputBox;
