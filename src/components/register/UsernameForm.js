// UsernameForm.js
import React, { useState } from 'react';
import '../../assets/styles/register/UsernameForm.css';

const UsernameForm = ({ value, setValue, setConfirmPasswordError }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setValue(value);
        if (value.length < 4) {
            setErrorMessage('Uživatelské jméno musí být alespoň 4 znaky dlouhé');
            setConfirmPasswordError('Uživatelské jméno musí být alespoň 4 znaky dlouhé');
        } else if (value.length > 15) {
            setErrorMessage('Uživatelské jméno nemůže být delší než 16 znaků');
        } else {
            setErrorMessage('');
            setConfirmPasswordError('');
        }
    };

    return (
        <div className="username-form-container">
            <label htmlFor="username">Uživatelské jméno:</label>
            <br />
            <input
                type="text"
                id="username"
                value={value}
                onChange={handleChange}
                placeholder="Zadejte své uživatelské jméno"
                maxLength={16}
                className="username-input"
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default UsernameForm;
