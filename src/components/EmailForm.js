// EmailForm.js
import React, { useState } from 'react';
import '../assets/styles/EmailForm.css';

const EmailForm = ({ value, setValue, setConfirmPasswordError }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setValue(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setErrorMessage('Zadejte platnou e-mailovou adresu');
            setConfirmPasswordError('Zadejte platnou e-mailovou adresu');
        } else {
            setErrorMessage('');
            setConfirmPasswordError('');
        }
    };

    return (
        <div className="email-form-container">
            <label htmlFor="email">E-mailová adresa:</label>
            <br />
            <input
                type="email"
                id="email"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte svou e-mailovou adresu"
                className="email-input"
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default EmailForm;
