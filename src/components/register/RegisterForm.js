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
    const [registrationErrors, setRegistrationErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegistration = async () => {

        if (username === '') {
            registrationErrors.username =('Uživatelské jméno neodpovídá danému formátu');
        }
        if (email === '') {
            registrationErrors.email =('Email je povinný v daném formátu');
        }
        if (password === '') {
            registrationErrors.password =('Heslo je povinné v daném formátu');
        }
        if (password !== confirmPassword) {
            console.log(password)
            console.log(confirmPassword)
            registrationErrors.confirmPassword =('Hesla se neshodují');
        }
        if (confirmPassword === '') {
            registrationErrors.confirmPassword =('Potvrzení hesla je povinné');
        }
        if (registrationErrors.length === 0) {
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
            const registrationErrorsToString = (errors) => {
                return Object.values(errors)
                    .filter(val => val) // Filtrujeme pouze neprázdné hodnoty (chyby)
                    .join('\n'); // Spojujeme chyby do jednoho řetězce s novým řádkem mezi nimi
            };

            alert(registrationErrorsToString(registrationErrors));
        }
    };

    return (
        <div className="register-form-container"> {/* Přidáváme třídu pro stylování */}
            <h2>Registrace</h2>
            <UsernameForm
                value={username}
                setValue={setUsername}
                setConfirmPasswordError={(error) => registrationErrors.username = error}
            />
            <EmailForm
                value={email}
                setValue={setEmail}
                setConfirmPasswordError={(error) => registrationErrors.email = error}
            />
            <PasswordForm
                value={password}
                setValue={setPassword}
                confirmValue={confirmPassword}
                setConfirmValue={setConfirmPassword}
                setPasswordError={(error) => registrationErrors.password = error}
                setConfirmPasswordError={(error) => registrationErrors.confirmPassword = error}
            />
            <button onClick={handleRegistration}>Zaregistrovat se</button>
        </div>
    );
};

export default RegisterForm;
