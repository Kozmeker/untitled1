import React from 'react';
import '../../assets/styles/login/LoginPasswordForm.css';

const LoginPasswordForm = ({ value, setValue }) => {
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue); // Odešle novou hodnotu zpět
    };

    return (
        <div className="input-container">
            <label htmlFor="password">Heslo:</label>
            <input
                type="password"
                id="password"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default LoginPasswordForm;
