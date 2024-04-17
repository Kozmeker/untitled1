import React, {useEffect, useState} from 'react';
import '../../assets/styles/register/PasswordForm.css';

const PasswordForm = ({ value, setValue, confirmValue, setConfirmValue,setPasswordError,setConfirmPasswordError }) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,16}$/;


    useEffect(() => {
        if (value !== password && value !== '' && password !== '') {
            setConfirmPasswordError('Hesla se neshodují');
        } else {
            setConfirmPasswordError('');
        }
    }, [value, password]);

    const handleChangePassword = (event) => {
        const value = event.target.value;
        setValue(value);
        setPassword(value);
        if (!passwordRegex.test(value) && value !== '') {
            setPasswordError('Heslo musí být dlouhé 4-16 znaků a obsahovat alespoň jedno velké písmeno a alespoň jedno číslo');
        } else {
            setPasswordError('');
        }
    };

    const handleChangeConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmValue(value);
        if (value !== password) {
            setConfirmPasswordError('Hesla se neshodují');
        } else {
            setConfirmPasswordError('');
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
                    value={value}
                    onChange={handleChangePassword}
                    className="password-input"
                />
                {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Potvrzení hesla:</label>
                <br/>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmValue}
                    onChange={handleChangeConfirmPassword}
                    className="password-input"
                />
                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
            </div>
        </div>
    );
};

export default PasswordForm;