import React from 'react';

const Reset = () => {
    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default Reset;