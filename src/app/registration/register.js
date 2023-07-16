import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './register.module.css'; // Import the styles from register.module.css

function FormPage() {
  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormPage;
