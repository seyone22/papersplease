'use client'
import styles from './DiscussionInputBox.module.css'
import {useState} from "react";
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from "rehype-sanitize";

const DiscussionInputBox = (params) => {
    const [answerBody, setAnswerBody] = useState(''); // Initialize the state with an empty string

    const data = {
        answerBody: answerBody,
        author: "651312489b1c6b9a5faba021",
        questionId: params.questionId
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convert FormData to a plain object
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
                    <MDEditor
                        className={styles.MDEditor}
                        value={answerBody}
                        onChange={setAnswerBody}
                        preview={"live"}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}

                    />
                    <button type="submit" className={styles.PostButton}>Post Answer</button>
                </div>
            </form>
        </div>
    );
};

export default DiscussionInputBox;
