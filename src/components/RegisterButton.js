// RegisterButton.jsx
import React from 'react';
import '../assets/styles/LessonButtons.css';

const RegisterButton = () => {
    const handleRegister = () => {
        // Implementovat přihlášení na lekci
    };

    return (
        <button className="register-button" onClick={handleRegister}>Přihlásit se</button>
    );
};

export default RegisterButton;
