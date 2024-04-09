import React, {useState} from 'react';
import Navigation from "../components/Navigation";
import UsernameForm from "../components/UsernameForm";
import EmailForm from "../components/EmailForm";
import PasswordForm from "../components/PasswordForm";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import LessonDetail from "../components/LessonDetail";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <div>
            <h1>Domů</h1>
            {/* Obsah domovské stránky */}
            <LessonDetail></LessonDetail>
        </div>
    );
}

export default Home;
