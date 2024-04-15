import React, { useState } from 'react';
import UsernameForm from './UsernameForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import '../../assets/styles/register/RegisterForm.css'; // Importujeme styly pro RegisterForm

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationErrors, setRegistrationErrors] = useState([]);

    const errors = [];
    const handleRegistration = async () => {

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
            const saltRounds = 10; // Počet iterací, které se mají použít pro generování soli (úrovně zabezpečení)
            const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashování hesla
            const userData = {
                username: username,
                email: email,
                password: hashedPassword, // Odesílání zahashovaného hesla
            };
            console.log('Registrace:', userData);
// Odeslání dat na backend pomocí POST požadavku
            axios.post('http://localhost:8080/api/register', userData)
                .then(response => {
                    // Zpracování odpovědi z backendu, např. zobrazení potvrzovacího popupu
                    console.log('Registrace úspěšná', response.data);
                })
                .catch(error => {
                    // Zpracování chyby, např. zobrazení chybového popupu
                    console.error('Chyba při registraci', error);
                });

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
        <div className="register-form-container"> {/* Přidáváme třídu pro stylování */}
            <h2>Registrace</h2>
            <UsernameForm
                value={username}
                setValue={setUsername}
                setConfirmPasswordError={(error) => setRegistrationErrors((prevErrors) => [...prevErrors, error])}
            />
            <EmailForm
                value={email}
                setValue={setEmail}
                setConfirmPasswordError={(error) => setRegistrationErrors((prevErrors) => [...prevErrors, error])}
            />
            <PasswordForm
                value={password}
                setValue={setPassword}
                confirmValue={confirmPassword}
                setConfirmValue={setConfirmPassword}
                setPasswordError={(error) => setRegistrationErrors((prevErrors) => [...prevErrors, error])}
                setConfirmPasswordError={(error) => setRegistrationErrors((prevErrors) => [...prevErrors, error])}
            />
            <button onClick={handleRegistration}>Zaregistrovat se</button>
        </div>
    );
};

export default RegisterForm;
