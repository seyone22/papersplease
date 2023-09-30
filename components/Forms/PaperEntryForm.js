import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';

import styles from './PaperEntryForm.module.css'

function PaperEntryForm() {
    const {handleSubmit, control, register, setValue, getValues, watch} = useForm();
    const {fields, append, remove} = useFieldArray({control, name: 'questions'});

    const onSubmit = async (data) => {
        try {
            data.courseYear = data.paperCourseId[data.paperCourseId.length - 3];
            data.pdfLocation = '/pdfs/' + data.paperCourseId;

            const response = await fetch('/api/exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful response here, if needed
                console.log('Answer posted successfully');
                //setAnswerBody('');
                // Reload the page
                window.location.reload();
            } else {
                throw new Error('Failed to post answer');
            }
        } catch (error) {
            console.error('Error posting answer:', error);
        }
    };

    return (
        <form className={styles.entryForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.examBlock}>
                <div className={styles.formSection}>
                    <label>Entity:</label>
                    <input type="text" {...register('entity')} />
                </div>

                <div className={styles.formSection}>
                    <label>Examination Name:</label>
                    <input type="text" {...register('examination')} />
                </div>

                <div className={styles.formSection}>
                    <label>Year:</label>
                    <input type="number" {...register('paperYear')} />
                </div>

                <div className={styles.formSection}>
                    <label>Paper Name:</label>
                    <input type="text" {...register('paperName')} />
                </div>

                <div className={styles.formSection}>
                    <label>Course ID:</label>
                    <input type="text" {...register('paperCourseId')} />
                </div>

                <div className={styles.formSection}>
                    <label>Time Given:</label>
                    <input type="number" {...register('time')} />
                </div>

                <div className={styles.formSection}>
                    <label>Instructions:</label>
                    <input type="text" {...register('instructions')} />
                </div>

                <div className={styles.formSection}>
                    <label>PDF File (Upload):</label>
                    <input type="file" {...register('pdfFile')} />
                </div>

            </div>

            {fields.map((question, index) => (<div class={styles.questionBlock} key={question.id}>
                <div className={styles.formSection}>
                    <h3>Question {index + 1}</h3>
                </div>

                <div className={styles.formSection}>
                    <label>Question Number:</label>
                    <input type="number" {...register(`questions.${index}.questionNumber`)} />
                </div>

                <div className={styles.formSection}>
                    <label>Part Number:</label>
                    <input type="number" {...register(`questions.${index}.partNumber`)} />
                </div>

                <div className={styles.formSection}>
                    <label>Subpart Number (Optional):</label>
                    <input type="number" {...register(`questions.${index}.subpartNumber`)} />
                </div>
                {/*Integrate React-form-hook and MDEditor*/}
                <div className={styles.formSection}>
                    <label>Question Body:</label>
                    <textarea {...register(`questions.${index}.questionBody`)} />
                </div>

                <div className={styles.formSection}>
                    <label>Marks:</label>
                    <input type="number" {...register(`questions.${index}.marks`)} />
                </div>

                <button className={styles.delete} type="button" onClick={() => remove(index)}>
                    Delete
                </button>
            </div>))}

            <button
                type="button"
                className={styles.formButton}
                onClick={() => {
                    append({});
                }}
            >
                Add Question
            </button>

            <button className={styles.formButton} type="reset">Clear</button>
            <button className={styles.action} type="submit">Submit</button>
        </form>
    );
}

export default PaperEntryForm;