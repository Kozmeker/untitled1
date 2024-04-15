// LoginForm.js
import React, { useState } from 'react';
import LoginUsernameForm from './LoginUsernameForm';
import LoginPasswordForm from './LoginPasswordForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/login/LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        const credentials = { username, password: password };
        console.log('Přihlašovací údaje:', credentials);

        axios.post('http://localhost:8080/api/login', credentials)
            .then(response => {
                console.log('Odpověď z backendu:', response.data);
                onLoginSuccess(response.data); // Zavolání funkce onLoginSuccess s odpovědí z backendu
                navigate('/'); // Přesměrování na domovskou stránku
            })
            .catch(error => {
                console.error('Chyba při přihlašování:', error);
            });
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
            {/* Zde můžete zobrazit další obsah nebo přesměrování na základě stavu loggedInUser */}
            {loggedInUser && (
                <div>
                    <p>Přihlášení proběhlo úspěšně!</p>
                    <p>Přihlášený uživatel: {loggedInUser.username}</p>
                    {/* Zde můžete zobrazit další informace o přihlášeném uživateli */}
                </div>
            )}
        </div>
    );
};

export default LoginForm;
