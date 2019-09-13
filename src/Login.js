import React from "react";
export const Login = () => {
    const googleOAuth = () => {
        window.location.href = 'http://localhost:3001/auth/google';
    }

    return (
        <div className="login-container">
            <button onClick={googleOAuth}>
                "Login Button"
            </button>
        </div>
    );
};
export default Login;