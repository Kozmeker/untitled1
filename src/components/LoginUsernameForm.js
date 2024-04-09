import React from 'react';
import '../assets/styles/LoginUsernameForm.css';

const LoginUsernameForm = ({ value, setValue }) => {
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue); // Odešle novou hodnotu zpět
    };

    return (
        <div className="input-container">
            <label htmlFor="username">Uživatelské jméno:</label>
            <input
                type="text"
                id="username"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default LoginUsernameForm;
