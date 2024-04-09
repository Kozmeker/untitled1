import React, { useState } from 'react';
import '../assets/styles/PasswordForm.css';

const PasswordForm = ({ setPassword, setConfirmPassword, setPasswordErrorProp, setConfirmPasswordErrorProp }) => {
    const [password, setPasswordState] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,16}$/;

    const handleChangePassword = (event) => {
        const value = event.target.value;
        setPasswordState(value);
        if (!passwordRegex.test(value)) {
            setPasswordErrorProp('Heslo musí být dlouhé 4-16 znaků a obsahovat alespoň jedno velké písmeno a alespoň jedno číslo');
        } else {
            setPasswordErrorProp('');
        }
        setPassword(value); // Update parent component state
    };

    const handleChangeConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError('Hesla se neshodují');
            setConfirmPasswordErrorProp('Hesla se neshodují');
        } else {
            setConfirmPasswordError('');
            setConfirmPasswordErrorProp('');
        }
    };

    return (
        <div className="password-form-container">
            <div>
                <label htmlFor="password">Heslo:</label>
                <br/>
                <input
                    type="password"
                    id="password"
                    onChange={handleChangePassword}
                    className="password-input"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Potvrzení hesla:</label>
                <br/>
                <input
                    type="password"
                    id="confirmPassword"
                    onChange={handleChangeConfirmPassword}
                    className="password-input"
                />
                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
            </div>
        </div>
    );
};

export default PasswordForm;
