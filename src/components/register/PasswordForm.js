import React, {useEffect, useState} from 'react';
import '../../assets/styles/register/PasswordForm.css';

const PasswordForm = ({ value, setValue, confirmValue, setConfirmValue,setPasswordError,setConfirmPasswordError }) => {
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');

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
            setPassError('Heslo musí být dlouhé 4-16 znaků a obsahovat alespoň jedno velké písmeno a alespoň jedno číslo');
        } else {
            setPasswordError('');
            setPassError('');
        }
    };

    const handleChangeConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmValue(value);
        if (value !== password) {
            setConfirmPasswordError('Hesla se neshodují');
            setConfirmPassError('Hesla se neshodují');
        } else {
            setConfirmPasswordError('');
            setConfirmPassError('');
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
                {passError && <div className="error-message">{passError}</div>}
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
                {confirmPassError && <div className="error-message">{confirmPassError}</div>}
            </div>
        </div>
    );
};

export default PasswordForm;