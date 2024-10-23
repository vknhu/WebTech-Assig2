import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);


    function handleLogin() {
        const passwordHashed = CryptoJS.SHA256(password).toString();

        fetch(`http://localhost:5137/api/Login?userName=${username}&passwordHash=${passwordHashed}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', }
        }).then(response => response.json())
            .then(data => {
                setLoginStatus(data ? 'Login Successful' : 'Login Failed');
            })
            .catch(err => {
                console.log(err);
                setLoginStatus('An error occurred while logging in');
            });

        return (
            <div className="login">
                <h3>Sign in</h3>
                <form className="loginForm">
                    <div className="inputGroup">
                        <label htmlFor="userName">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            autoComplete="off"
                            placeholder="Enter your username"
                        />
                        <label htmlFor="Password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Enter your Password"
                        />
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
                <div className="login">
                    <p>Don't have Account? </p>
                    <Link to="/" type="submit" class="btn btn-success">
                        Register
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;