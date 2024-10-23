import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);


    function handleLogin() {
        const passwordHashed = CryptoJS.SHA256(password).toString();

        fetch(`http://localhost:5147/api/Login?userName=${username}&passwordHash=${passwordHashed}`, {
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
    }
    function onSubmit(e) {
        e.preventDefault();
        handleLogin();
    }

    return (
        <div className="login">
            <h3>Log in</h3>
            <form className="loginForm" method="get" onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName" name="userName" className="form-control" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <label htmlFor="Password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
                <p className="mt-3">Don't have Account? </p>
                <Link to="/Register.js" type="submit" class="btn btn-success register-link">Register</Link>
        </div>
    );
}

export default Login;