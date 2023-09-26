'use client'
//DOES NOT WORK IN FIREFOX
import {ErrorMessage, Field, Form, Formik} from 'formik';

function FormPage() {
    return (
        <div>
            <h1>Add new exam paper</h1>
            <h2>General details</h2>
            <Formik
                initialValues={{ year: '', name: '', courseId: '', courseYear: '', questions: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        //Code here does something with the submitted data.
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="year">Year</label>
                        <Field type="number" name="year" />
                        <ErrorMessage name="year" component="div" />
                        <label htmlFor="name">Paper Name</label>
                        <Field type="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormPage;
