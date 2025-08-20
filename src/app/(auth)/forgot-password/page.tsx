import React from 'react';

const ForgetPassword = () => {
    return (
        <div>
            <h1>Forgot Password</h1>
            <p>Please enter your email address to reset your password.</p>
            <form>
                <input type="email" placeholder="Email" required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgetPassword;