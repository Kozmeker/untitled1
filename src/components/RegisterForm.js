import React, { useState } from 'react';
import UsernameForm from './UsernameForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationErrors, setRegistrationErrors] = useState([]);

    const handleRegistration = () => {
        const errors = [];
        if (username === '') {
            errors.push('Uživatelské jméno je povinné');
        }
        if (email === '') {
            errors.push('Email je povinný');
        }
        if (password === '') {
            errors.push('Heslo je povinné');
        }
        if (confirmPassword === '') {
            errors.push('Potvrzení hesla je povinné');
        }
        if (password !== confirmPassword) {
            errors.push('Hesla se neshodují');
        }
        if (errors.length === 0) {
            // Vytvoření JSON objektu uživatele a odeslání
            const user = {
                username: username,
                email: email,
                password: password
            };
            console.log('Registrace:', user);
            // Resetování stavu formuláře
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRegistrationErrors([]);
        } else {
            // Zobrazení chybového popupu
            alert(errors.join('\n'));
            setRegistrationErrors(errors);
        }
    };

    return (
        <div>
            <h2>Registrace</h2>
            <UsernameForm
                value={username}
                setValue={setUsername}
            />
            <EmailForm
                value={email}
                setValue={setEmail}
            />
            <PasswordForm
                value={password}
                setValue={setPassword}
                confirmValue={confirmPassword}
                setConfirmValue={setConfirmPassword}
                setPasswordErrorProp={setRegistrationErrors} // Předejte funkci pro nastavení chybového stavu
                setConfirmPasswordErrorProp={setRegistrationErrors} // Předejte funkci pro nastavení chybového stavu
            />
            <button onClick={handleRegistration}>Zaregistrovat se</button>
        </div>
    );
};

export default RegisterForm;
