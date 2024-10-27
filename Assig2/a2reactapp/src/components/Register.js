import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        const passwordHashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        fetch(`http://localhost:5147/api/Register?userName=${username}&passwordHash=${passwordHashed}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setRegisterStatus("Registration Successful");
                    navigate("/Login");
                } else {
                    setRegisterStatus("Username already exists");
                }
            })
            .catch(err => {
                console.log(err);
                setRegisterStatus("An error occurred during registration");
            });
    }

    function onSubmit(e) {
        e.preventDefault();
        handleRegister();
    }

    return (
        <div className="register">
            <h3>Create a new account</h3>
            <form className="registerForm" method="get" onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName" name="userName" className="form-control" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="Password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-success">Register</button>
                </div>
            </form>
            {registerStatus && <p className="text-warning">{registerStatus}</p>}
            <p className="mt-3">Already have an Account?</p>
            <Link to="/Login" className="login-link btn btn-success">Login</Link>
        </div>
    );
}

export default Register;
