import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');

    function handleRegister() {
        const passwordHashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        fetch(`http://localhost:5147/api/Register?userName=${username}&passwordHash=${passwordHashed}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                setRegisterStatus(data ? 'Registration Successful' : 'Registration Failed');
            })
            .catch(err => {
                console.log(err);
                setRegisterStatus('An error occurred during registration');
            });
    }

    function onSubmit(e) {
        e.preventDefault();
        handleRegister();
    }

    return (
        <div className="register">
            <h3>Register</h3>
            <form className="registerForm" onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName" name="userName" className="form-control" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            <div className="register">
                <p className="inline-text">Already have an account? </p>
                <Link to="/Login" className="btn btn-success login-link">Login</Link>
            </div>
            {registerStatus && <div className="alert alert-info">{registerStatus}</div>}
        </div>
    );
}

export default Register;
