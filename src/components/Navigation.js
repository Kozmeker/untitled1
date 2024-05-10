// Navigation.js
import '../assets/styles/Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ loggedInUser, onLogout }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Domů</Link></li>
                <li><Link to="/exercises">Cvičení</Link></li>
                <li><Link to="/trainers">Osobní Trenéři</Link></li>
                {loggedInUser ? (
                    <>
                        <li><Link to="/personalConsultations">Osobní Konzultace</Link></li>
                        <li>Přihlášený uživatel: {loggedInUser.username}</li>
                            <button onClick={onLogout}>Odhlásit se</button>
                    </>
                ) : (
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
