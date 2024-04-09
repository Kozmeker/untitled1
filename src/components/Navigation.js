import '../assets/styles/Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Domů</Link></li>
                <li><Link to="/exercises">Cvičení</Link></li>
                <li><Link to="/aboutus">O nás</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                {isLoggedIn ? null : (
                    <>
                        <li><Link to="/login">Přihlášení</Link></li>
                        <li><Link to="/register">Registrace</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}


export default Navigation;
