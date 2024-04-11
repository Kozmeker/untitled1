import React, { useState } from 'react';
import LoginUsernameForm from './LoginUsernameForm';
import LoginPasswordForm from './LoginPasswordForm';
import '../../assets/styles/login/LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState([]);

    const handleLogin = () => {
        // Implementace logiky pro přihlášení
        const credentials = { username, password }; // Zde jsou získané hodnoty uživatelského jména a hesla
        console.log('Přihlašovací údaje:', credentials); // Vypíše přihlašovací údaje do konzole
    };

    return (
        <div className="login-form-container">
            <h2>Přihlášení</h2>
            <LoginUsernameForm
                value={username}
                setValue={setUsername}
            />
            <LoginPasswordForm
                value={password}
                setValue={setPassword}
            />
            <button onClick={handleLogin}>Přihlásit se</button>
        </div>
    );
};

export default LoginForm;
