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
            headers: {'Content-Type': 'application/json',}
        }).then(response => response.json())
            .then(data => {
                setLoginStatus(data? 'Login Successful' : 'Login Failed');
            })
            .catch(err => {
                console.log(err);
                setLoginStatus('An error occurred while logging in');
            });

        return ();
    }

    export default Login