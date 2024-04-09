// UnregisterButton.jsx
import React from 'react';
import '../assets/styles/LessonButtons.css';

const UnregisterButton = () => {
    const handleUnregister = () => {
        // Implementovat odhlášení z lekce
    };

    return (
        <button className="unregister-button" onClick={handleUnregister}>Odhlásit se</button>
    );
};

export default UnregisterButton;
