import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
function Login() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        const passwordHash = CryptoJS.SHA256(password).toString();
        try {
            const response = await fetch(`http://localhost:5137/api/Login?userName=${username}&passwordHash=${passwordHash}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, passwordHash }),
            });
        } catch (error) {
            console.error('Error during login:', error);
            setLoginStatus('An error occurred during the login process.');
        }

    }

    return ();
}

export default Login