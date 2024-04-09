import React, {useState} from 'react';
import Navigation from "../components/Navigation";
import UsernameForm from "../components/UsernameForm";
import EmailForm from "../components/EmailForm";
import PasswordForm from "../components/PasswordForm";
import RegisterForm from "../components/RegisterForm";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <div>
            <h1>Domů</h1>
            {/* Obsah domovské stránky */}
            <RegisterForm></RegisterForm>
        </div>
    );
}

export default Home;
