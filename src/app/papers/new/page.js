'use client'
import { useState } from 'react';

import { Formik } from 'formik';

function FormPage() {

    return (
        <div>
            <h1>Form Page</h1>

            <Formik initialValues={ { email: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}>

            </Formik>
    );
}

export default FormPage;
