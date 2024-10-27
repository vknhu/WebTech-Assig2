import React, { useState } from "react";
import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();


    function handleLogin() {
        const passwordHashed = CryptoJS.SHA256(password).toString();

        fetch(`http://localhost:5147/api/Login?userName=${username}&passwordHash=${passwordHashed}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", }
        }).then(response => response.json())
            .then(data => {
                if (data == true) {
                    // Store login status in localStorage
                    localStorage.setItem("isAuthenticated", "true");
                    setLoginStatus(true);
                    // If login is successful, redirect to Dashboard
                    navigate("/Dashboard");
                } else {
                    setLoginStatus("Username or Password is incorrect");
                }
            })
            .catch(err => {
                console.log(err);
                setLoginStatus("An error occurred while logging in");
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
                        value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="Password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-success">Login</button>
                </div>
            </form>
            {loginStatus && <p className="text-danger">{loginStatus}</p>}
            <p className="mt-3">Don"t have an Account?</p>
            <Link to="/Register" className="register-link btn btn-success">Register</Link>
        </div>
    );
}

export default Login;