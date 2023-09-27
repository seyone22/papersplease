'use client'
import {signIn} from 'next-auth/react';

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        const result = await signIn('credentials', {...credentials, redirect: false});
        if (result?.error) {
            console.log(result);
        } else {
            // Redirect the user to the desired page
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" required/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" required/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}