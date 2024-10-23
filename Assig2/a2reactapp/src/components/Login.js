import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
function Login() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(false);
    const [triggerFetch, setTriggerFetch] = useState(false);

    React.useEffect(() => {
        const passwordHash = CryptoJS.SHA256(password).toString();

        fetch(`http://localhost:5137/api/Login?userName=${username}&passwordHash=${passwordHash}`)
            .then(response => response.json)
            .then(data => setState(data))
            .catch(err => { console.log(err); })
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setTriggerFetch(true);
    }

    return ()
}

export default Login