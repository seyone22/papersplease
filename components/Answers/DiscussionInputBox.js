'use client'
import styles from './DiscussionInputBox.module.css'
import {useState} from "react";

const DiscussionInputBox = (params) => {
    const [answerBody, setAnswerBody] = useState(''); // Initialize the state with an empty string
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formDataObject = Object.fromEntries(new FormData(e.target));
        formDataObject.questionId = params.questionId;

        try {
            const response = await fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject), // Convert FormData to a plain object
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
                    <input type="hidden" name="author" value="651312489b1c6b9a5faba021"/>
                    <textarea name="answerBody" className={styles.TextInput}></textarea>
                    <button type="submit" className={styles.PostButton}>Post Answer</button>
                </div>
            </form>
        </div>
    );
};

export default DiscussionInputBox;
