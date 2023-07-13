'use client'
import { useState } from 'react';

function FormPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form submission logic here
        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Form submission successful
                console.log('Form submitted successfully');
            } else {
                // Form submission failed
                console.log('Form submission failed');
            }
        } catch (error) {
            console.error('An error occurred during form submission:', error);
        }
    };

    return (
        <div>
            <h1>Form Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormPage;
